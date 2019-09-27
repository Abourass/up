const fs = require('fs-extra');
const Orders = require('../models/ordersModel');
const orderArray = [];

async function insertMany({orderArray, loggingLevel} = {}) {
  try {
    await Orders.insertMany(orderArray);
    return `Inserted ${orderArray.length} into your collection`;
  } catch (e) {
    console.error(e);
  }
}
module.exports = insertMany;
