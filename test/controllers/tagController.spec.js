const assert = require('assert');
const mongoose = require('mongoose');
const tagController = require('../../server/controllers/tagController');

describe('Testing duplicateCheck', () => {
  it('Should return the duplicate tag and a status', async() => {
    mongoose.connect('mongodb+srv://Navi:repwed53@veritascluster-j268m.mongodb.net/assetval_beta?retryWrites=true', {useNewUrlParser: true,  useUnifiedTopology: true}).catch(err => console.error); // Create Database Connection
    const tagEngine= new tagController();
    const order = {loanKey: '235593', zip: '18052'};
    const clientID = '5d892fb053dd7630eb545f24';
    const responseShouldBe = {
      status: 'Duplicate order',
      tag: 'duplicate'
    };
    const response = await tagEngine.duplicateCheck(order, clientID);
    assert.deepStrictEqual(response, responseShouldBe);
  })
});
