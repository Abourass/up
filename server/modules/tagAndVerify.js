const tagController = require('../controllers/tagController');
const {asyncForEach} = require('../modules/asyncForEach.js');
const tagEngine = new tagController();

const tagAndVerify = async(arrayOfOrders, client) => {
  const duplicateCheck = async(orderArray, depth = null) => {
    const taggedOrderArray = [];
    await asyncForEach(orderArray, async order => {
      const duplicateStatus = await tagEngine.duplicateCheck(order, client, depth);
      if (duplicateStatus.tag === 'duplicate'){ order.tags = []; order.tags.unshift(duplicateStatus) }
      taggedOrderArray.push(order);
    });
    return taggedOrderArray;
  };

  const addressVerification = async(orderArray) => {

  };

  const partialCheck = async(orderArray) => {
    const taggedOrderArray = [];
    await asyncForEach(orderArray, async order => {
      const partialStatus = await tagEngine.partialTag(order);
      if (partialStatus.tag === 'partial'){ order.tags = []; order.tags.unshift(partialStatus) }
      taggedOrderArray.push(order);
    });
    return taggedOrderArray;
  };

  const doubleCheck = async(orderArray) => {
    const taggedOrderArray = [];
    await asyncForEach(orderArray, async order => {
      const doubleStatus = await tagEngine.doubleTag(order);
      if (doubleStatus.tag === 'double'){ order.tags = []; order.tags.unshift(doubleStatus) }
      taggedOrderArray.push(order);
    });
    return taggedOrderArray
  };

  const shallowDuplicateCheckResults = await duplicateCheck(arrayOfOrders);
  const doubleCheckResults = await doubleCheck(shallowDuplicateCheckResults);
  const partialCheckResults = await partialCheck(doubleCheckResults);
  console.log(partialCheckResults[0].tags);
  console.log(partialCheckResults[1].tags);
  console.log(partialCheckResults[2].tags);
};
module.exports = tagAndVerify;
