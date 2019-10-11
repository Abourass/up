const mongoose = require('mongoose');
const tagAndVerify = require('../../server/modules/tagAndVerify');
mongoose.connect('mongodb+srv://Navi:repwed53@veritascluster-j268m.mongodb.net/assetval_beta?retryWrites=true', {useNewUrlParser: true,  useUnifiedTopology: true}).catch(err => console.error); // Create Database Connection

const sampleOrders = [
  {"_id":{"$oid":"5d938f567d9a801a82322630"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"PAMELA NEFF","accessPhone":"6104358109","address":"1282 HAMPSHIRE DR","city":"WHITEHALL","firstName":"PAMELA","lastName":"NEFF","loanKey":"235593","propertyType":"Drive By","rush_order":"No","state":"PA","zip":"18052","project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}},
  {"_id":{"$oid":"5d938f567d9a801a82322631"},"added":{"$date":{"$numberLong":"1569951565609"}},"log":[],"accessName":"VEYSEL CETINER","accessPhone":"2403832678","address":"820 COLLEGE PKWY #9","city":"ROCKVILLE","firstName":"VEYSEL","lastName":"CETINER","loanKey":"213551","propertyType":"Drive By","rush_order":"No","state":"MD","zip":"20850","double": true, "project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}},
  {"_id":{"$oid":"5d938faf9148342c7e738fae"},"added":{"$date":{"$numberLong":"1569951646978"}},"log":[],"propertyType":"Interior","rush_order":"No","BPO_manager":null,"QA_processor":null,"address":"462 REMSEN AVENUE","address_2":null,"city":"NEW BRUNSWICK","state":"NJ","zip":"8901","firstName":"MARIA","lastName":"HERNANDEZ","accessName":"Cristina Lacerda","accessPhone":"732-801-0209","lockBox":null,"project":{"$oid":"5d938f567d9a801a8232262f"},"projectStack":{"$oid":"5d938f567d9a801a8232262e"},"__v":{"$numberInt":"0"}}
];

tagAndVerify(sampleOrders, '5d892fb053dd7630eb545f24').catch(err => console.error(err)).then(() => {
  mongoose.disconnect().catch(err => console.err);
});
