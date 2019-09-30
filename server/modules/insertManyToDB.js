const Orders = require('../models/ordersModel');
const colors = require('colors');

async function insertMany({orderArray} = {}) {
  try {
    console.log(`${'GO'.trap.random} insertMany ${'f'.trap.random}`);
    await Orders.insertMany(orderArray);
    console.log(`Inserted ${orderArray.length.toString().magenta} into your collection`);
    return `${'END'.trap.random} insertMany ${'f'.trap.random}`;
  } catch (e) { console.error(e); }
}
module.exports = insertMany;
