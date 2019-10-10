const Lob = require('lob')(process.env.lobLiveSecret.toString());

class addressController {
  async verify (addressToVerify){
    const suggestions = {};
    const avResponse = await Lob.usVerifications.verify(addressToVerify);
    if (avResponse.primary_line !== addressToVerify.primary_line) {
      if (avResponse.components.street_predirection.length > 0 || avResponse.components.street_postdirection.length > 0) {
        suggestions.street = 'cardinal direction';
      }
    }
    if (avResponse.components.zip_code !== addressToVerify.zip_code) { suggestions.zip = 'Zip Code Changed'; }
    if (avResponse.components.state !== addressToVerify.state) { suggestions.state = 'State changed'; }
    if (Object.keys(suggestions).length > 0) {
      return console.log(`Changed fields: ${JSON.stringify(suggestions)} Verified Address: ${avResponse.primary_line} ${avResponse.secondary_line} ${avResponse.last_line}`);
    }
    return console.log(`No suggestions to make. Verified Address: ${avResponse.primary_line} ${avResponse.secondary_line} ${avResponse.last_line}`);
  }
}
