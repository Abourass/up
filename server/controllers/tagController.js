const Order = require('../models/ordersModel');
const Client = require('../models/clientModel');
const Project = require('../models/projectModel');
const dayjs = require('dayjs');

class tagController {
  async duplicateCheck(order, client, checkDepth = null){
    let duplicate;
    if (checkDepth == null){
      duplicate = await Order.findOne({loanKey: order.loanKey, zip: order.zip});
      console.log(duplicate.projectStack)
    } else {
      duplicate = await Order.findOne({address: order.address, zip: order.zip, state: order.state});
    }
    if (!duplicate){ return {status: 'No duplicates', tag: null}}
    const duplicateProject = await Project.findOne({_id: duplicate.projectStack});
    if (!duplicateProject){return {status: 'Error no project found', tag: null}}
    const duplicateClient = await Client.findOne({_id: duplicateProject.client});
    console.log(client, duplicateClient._id.toString());
    if (client !== duplicateClient._id.toString()){ return {status: 'Duplicate from different client', tag: null} }
    if (client === duplicateClient._id.toString()){
      const dayDuplicateWasAdded = dayjs(duplicate.added);
      const dontAcceptOrdersAfter = dayjs().subtract(duplicateClient.duplicateCheckForDays, 'day');
      if (dayjs(dayDuplicateWasAdded).isAfter(dayjs(dontAcceptOrdersAfter))){
        return {status: 'Duplicate order', tag: 'duplicate'}
      } else {
        return {status: 'Not recent enough to be a duplicate', tag: null}
      }
    }
  }
  doubleTag(order){
    if (order.double.length > 0){ return {status: 'Double requested', tag: 'double'} }
  }
  partialTag(order){
    if (!order.loanNumber || order.loanNumber.length == null){ return {status: 'Partial order assumed as loan number is missing', tag: 'partial'}}
  }
}
module.exports = tagController;
