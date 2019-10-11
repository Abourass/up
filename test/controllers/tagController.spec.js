const assert = require('assert');
const mongoose = require('mongoose');
const tagController = require('../../server/controllers/tagController');
const tagEngine= new tagController();

describe('Testing tagController', () => {
  describe('Testing duplicateCheck', () => {
    it('Should return the duplicate tag and a status stating this was a duplicate', async() => {

      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"235593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052","project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const clientID = '5d892fb053dd7630eb545f24';
      const responseShouldBe = {
        status: 'Duplicate order',
        tag: 'duplicate'
      };
      const response = await tagEngine.duplicateCheck(order, clientID);
      assert.deepStrictEqual(response, responseShouldBe);
    });
    it('Should return that this is not a duplicate', async() => {
      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"23445593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052","project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const clientID = '5d892fb053dd7630eb545f24';
      const responseShouldBe = {
        status: 'No duplicates',
        tag: null
      };
      const response = await tagEngine.duplicateCheck(order, clientID);
      assert.deepStrictEqual(response, responseShouldBe);
    });
    it('Should return that this duplicate was not recent enough to qualify as a duplicate', async() => {
      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"235593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052","project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const clientID = '5d892fb053dd7630eb545f24';
      const responseShouldBe = {
        status: 'Not recent enough to be a duplicate',
        tag: null
      };
      const response = await tagEngine.duplicateCheck(order, clientID, null, 5);
      assert.deepStrictEqual(response, responseShouldBe);
    });
    it('Should return that this is not a duplicate after doing a DEEP check', async() => {
      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"235593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052","project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const clientID = '5d892fb053dd7630eb545f24';
      const responseShouldBe = {
        status: 'Not recent enough to be a duplicate',
        tag: null
      };
      const response = await tagEngine.duplicateCheck(order, clientID, 'deep', 5);
      assert.deepStrictEqual(response, responseShouldBe);
      mongoose.disconnect().catch(err => console.err);
    });
  });

  describe('Testing doubleTag', () => {
    it('Should return a double tag', async() => {

      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"235593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052","double": true, "project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const responseShouldBe = {
        status: 'Double requested',
        tag: 'double'
      };
      const response = await tagEngine.doubleTag(order);
      assert.deepStrictEqual(response, responseShouldBe);
    });
    it('Should return null', async() => {
      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"235593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052", "project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const responseShouldBe = null;
      const response = await tagEngine.doubleTag(order);
      assert.deepStrictEqual(response, responseShouldBe);
      mongoose.disconnect().catch(err => console.err);
    });
  });

  describe('Testing partialTag', () => {
    it('Should return a partial tag', async() => {

      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052","double": true, "project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const responseShouldBe = {
        status: 'Partial order assumed as loan number is missing',
        tag: 'partial'
      };
      const response = await tagEngine.partialTag(order);
      assert.deepStrictEqual(response, responseShouldBe);
    });
    it('Should return null', async() => {
      const order = {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"235593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052", "project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}};
      const responseShouldBe = null;
      const response = await tagEngine.partialTag(order);
      assert.deepStrictEqual(response, responseShouldBe);
      mongoose.disconnect().catch(err => console.err);
    });
  });
});

