const {asyncForEach} = require('./asyncForEach.js');
const projectController = require('../controllers/projectController');
const insertMany = require('./insertManyToDB');

const addProjectID = async({arrayOfOrders, clientID, clientName} = {}) => {
  const correctedArray = [];
  const projectID = await projectController.add(clientID, clientName);
  console.log('Project ID', projectID);
  await asyncForEach(arrayOfOrders, async(order) => {
    order.project = projectID;
    console.log('order.project: ', order.project);
    correctedArray.unshift(order);
    console.log(correctedArray.length);
  }).finally(async() => {
    await insertMany({orderArray: correctedArray});
  });
};
module.exports = {addProjectID};
