const {asyncForEach} = require('./asyncForEach.js');
const tagAndVerify = require('./tagAndVerify');
const projectController = require('../controllers/projectController');
const insertMany = require('./insertManyToDB');
const colors = require('colors');

const addProjectID = async({arrayOfOrders, clientID, clientName} = {}) => {
  const correctedArray = [];
  const {projectID, projectStackID} = await projectController.add(clientID, clientName);
  console.log(`\n addProjectID ${'f'.trap.red} => \n   |  Project ID = ${projectID.bold.red}`);
  console.log(`\n addProjectID ${'f'.trap.red} => \n   |  Stack ID = ${projectStackID.bold.red}`);
  const addProjects = async () => {
    console.log(`   |  ${'START'.trap.random} arrayOfOrders ${'forLoop'.cyan}`);
    await asyncForEach(arrayOfOrders, async (order) => {
      console.log(`   |  |____________${'Loop Cycle_'.yellow.underline}${correctedArray.length.toString().yellow.underline}____________`);
      order.project = await projectID;
      order.projectStack = await projectStackID;
      correctedArray.unshift(order);
      console.log(`   |  |  ${'order'.green}.project is now: ${await order['project']} \n   |  |  Adding ${'order'.green} to the correctedArray \n   |  |  correctedArray.length is now ${correctedArray.length.toString().magenta}`);
      console.log(`   |  |_____________________________________`);
    });
    console.log(`   |  ${'END'.trap.random} arrayOfOrders ${'forLoop'.cyan}`);
    console.log(`   |________________________________________ \n`);
  };

  await addProjects();
  const orderArray = await tagAndVerify(correctedArray);
  await insertMany(orderArray);
};
module.exports = {addProjectID};
