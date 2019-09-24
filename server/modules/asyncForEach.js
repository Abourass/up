const asyncForEach = async(array, callback) => { // eslint-disable-next-line no-await-in-loop
  for (let index = 0; index < array.length; index++) { await callback(array[index], index, array); }
};
module.exports = {asyncForEach};
