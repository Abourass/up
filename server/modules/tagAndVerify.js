const tagController = require('../controllers/tagController');
const addressController = require('../controllers/addressController');
const {asyncForEach} = require('../modules/asyncForEach.js');
const tagEngine = new tagController();
const verificationEngine = new addressController();

const tagAndVerify = async(arrayOfOrders, client) => {
  const duplicateCheck = async(orderArray, depth = null) => {
    const taggedOrderArray = [], duplicateArray = [];
    await asyncForEach(orderArray, async(order, i) => {
      const duplicateStatus = await tagEngine.duplicateCheck(order, client, depth);
      if (duplicateStatus.tag === 'duplicate'){
        if(!order.tags){order.tags = [];}
        order.tags.unshift(duplicateStatus);
        duplicateArray.push(order)
      } else {
      taggedOrderArray.push(order);
      }
    });
    return {taggedOrderArray, duplicateArray};
  };

  const addressVerification = async(orderArray) => {
    const verifiedOrders = [];
    await asyncForEach(orderArray, async(order, i) => {
      const {verificationResult, suggestions} = await verificationEngine.verify({street: order.address, city: order.city, zip: order.zip, state: order.state});
      order.verifiedAddress = verificationResult;
      if (suggestions !== null){
        if (!order.tags){order.tags = []}
        Object.keys(suggestions).forEach((key) => {
          order.tags.unshift({status: suggestions[key], tag: `${key} changed`})
        })
      }
      verifiedOrders.push(order)
    });
    return verifiedOrders;
  };

  const partialCheck = async(orderArray) => {
    const taggedOrderArray = [];
    await asyncForEach(orderArray, async order => {
      const partialStatus = await tagEngine.partialTag(order);
      if (partialStatus.tag === 'partial'){
        if(!order.tags){order.tags = [];}
        order.tags.unshift(partialStatus)
      }
      taggedOrderArray.push(order);
    });
    return taggedOrderArray;
  };

  const doubleCheck = async(orderArray) => {
    const taggedOrderArray = [];
    await asyncForEach(orderArray, async order => {
      const doubleStatus = await tagEngine.doubleTag(order);
      if (doubleStatus.tag === 'double'){
        if(!order.tags){order.tags = [];}
        order.tags.unshift(doubleStatus)
      }
      taggedOrderArray.push(order);
    });
    return taggedOrderArray
  };
  const {taggedOrderArray: shallowDuplicateCheckResults, duplicateArray: duplicateOrders} = await duplicateCheck(arrayOfOrders);
  const doubleCheckResults = await doubleCheck(shallowDuplicateCheckResults);
  const partialCheckResults = await partialCheck(doubleCheckResults);
  const addressVerificationResults = await addressVerification(partialCheckResults);
  const {taggedOrderArray: taggedAndVerifiedResults, duplicateArray: deepDuplicateOrders} = await duplicateCheck(addressVerificationResults, 'deep');
  deepDuplicateOrders.forEach((order) => { duplicateOrders.push(order) });
  duplicateOrders.forEach((order) => { taggedAndVerifiedResults.push(order) });
  return taggedAndVerifiedResults
};
module.exports = tagAndVerify;
