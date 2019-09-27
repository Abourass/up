const {asyncForEach} = require('./asyncForEach.js');
const projectController = require('../controllers/projectController');
const insertMany = require('./insertManyToDB');

const addProjectID = async({arrayOfOrders, clientID, clientName} = {}) => {
  const correctedArray = [];
  const projectID = await projectController.add(clientID, clientName);
  await asyncForEach(arrayOfOrders, async(order) => {
    order.project = projectID;
    correctedArray.unshift(order);
  }).finally(async() =>{
    await insertMany(correctedArray);
  });
};
module.exports = {addProjectID};
