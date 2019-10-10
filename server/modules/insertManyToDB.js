const Orders = require('../models/ordersModel');
const colors = require('colors');

async function insertMany({orderArray} = {}) {
  try {
    if(process.env.logging === 'verbose'){ console.log(`${'GO'.random} insertMany ${'f'.trap.random}`); }
    await Orders.insertMany(orderArray);
    console.log(`Inserted ${orderArray.length.toString().magenta} into your collection`);
    if(process.env.logging === 'verbose'){ return `${'END'.random} insertMany ${'f'.trap.random}`; }
  } catch (e) { console.error(e); }
}
module.exports = insertMany;
