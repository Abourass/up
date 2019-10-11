const Order = require('../models/ordersModel');
const Client = require('../models/clientModel');
const Project = require('../models/projectModel');
const dayjs = require('dayjs');

class tagController {
  async duplicateCheck(order, client, checkDepth = null, debug = null){
    let duplicate;
    if (checkDepth == null){
      console.log('Shallow Check -> loanNum:', order.loanKey, 'Zip:', order.zip, 'Client:', client);
      duplicate = await Order.findOne({loanKey: order.loanKey, zip: order.zip});
    } else if (checkDepth === 'deep') {
      console.log('Deep Check');
      duplicate = await Order.findOne({address: order.address, zip: order.zip, state: order.state});
    }
    if (!duplicate){ return {status: 'No duplicates', tag: null}}
    const duplicateProject = await Project.findOne({_id: duplicate.projectStack});
    if (!duplicateProject){return {status: 'Error no project found', tag: null}}
    const duplicateClient = await Client.findOne({_id: duplicateProject.client});
    if (client !== duplicateClient._id.toString()){ return {status: 'Duplicate from different client', tag: null} }
    if (client === duplicateClient._id.toString()){
      const dayDuplicateWasAdded = dayjs(duplicate.added);
      let dontAcceptOrdersAfter;
      if (debug == null){
        dontAcceptOrdersAfter = dayjs().subtract(duplicateClient.duplicateCheckForDays, 'day');
      } else {
        dontAcceptOrdersAfter = dayjs().subtract(debug, 'day');
      }
      if (dayjs(dayDuplicateWasAdded).isAfter(dayjs(dontAcceptOrdersAfter))){
        return {status: 'Duplicate order', tag: 'duplicate'}
      } else {
        return {status: 'Not recent enough to be a duplicate', tag: null}
      }
    }
  }
  doubleTag(order){
    if (!!order.double && order.double.toString().length > 0){ return {status: 'Double requested', tag: 'double'} } return {status: 'No doubles', tag: null}
  }
  partialTag(order){
    if (order.loanKey == null && order.loanNumber == null){ return {status: 'Partial order assumed as loan number is missing', tag: 'partial'}} return {status: 'No partials', tag: null}
  }
}
module.exports = tagController;
