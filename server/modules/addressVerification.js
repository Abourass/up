const
  Koa = require('koa'),
  fs = require('fs-extra'),
  path = require('path'),
  Lob = require('lob')(process.env.lobLiveSecret.toString()),
  app = new Koa();

const
  testAddressA = {
    address: 'deliverable',
  },
  testAddressB = {
    street: 'deliverable',
    secondary_line: '#3',
    zip: '11111',
    state: 'CO',
  },
  liveAddressA = {
    street: '621 2nd Street', // ----<-Input-< |
    zip: '81501', // ---------------------------- |
    state: 'COo', // ---------------------------- |
  }, // ------------------------------->-Output-> | Verified Address: 621 N 2ND ST APT B  Changed fields: {"street":true,"predirection":true}
  liveAddressB = {
    street: '661 HIGHWAY 50', // <-input-< |
    unit: 'TRLR 8',
    zip: '81503', // ---------------------------- |
    state: 'CO', // ----------------------------- |
  }, // ------------------------------->-Output-> | No suggestions to make. Verified Address: 661 HIGHWAY 50 TRLR 8
  testingAddress = liveAddressA;
let primaryLine = '';
if (testingAddress.unit) {
  primaryLine = `${testingAddress.street} ${testingAddress.unit}`;
} else {
  primaryLine = `${testingAddress.street}`;
}
const originObj = {
  primary_line: primaryLine,
  zip_code: testingAddress.zip,
  state: testingAddress.state,
};
app.use(async(ctx) => {
  try {
    const
      responseObj = await Lob.usVerifications.verify(originObj),
      suggestions = {};
    ctx.body = responseObj;
    if (responseObj.primary_line !== originObj.primary_line) {
      if (responseObj.components.street_predirection.length > 0 || responseObj.components.street_postdirection.length > 0) {
        suggestions.street = 'cardinal direction';
      }
    }
    if (responseObj.components.zip_code !== originObj.zip_code) { suggestions.zip = 'Zip code changed'; }
    if (responseObj.components.state !== originObj.state) { suggestions.state = 'State changed'; }
    if (Object.keys(suggestions).length > 0) {
      return console.log(`Changed fields: ${JSON.stringify(suggestions)} Verified Address: ${responseObj.primary_line} ${responseObj.secondary_line} ${responseObj.last_line}`);
    }
    return console.log(`No suggestions to make. Verified Address: ${responseObj.primary_line} ${responseObj.secondary_line} ${responseObj.last_line}`);
  } catch (err) { console.error(err); }
});

function normalizePort(val) { // =======================================<|| Normalize a port into a number, string, or false
  const port = parseInt(val, 10);
  if (typeof port !== 'number') { return val; }
  if (port >= 0) { return port; }
  return false;
}

const port = normalizePort(process.env.PORT || '5000');

app.listen(port);
