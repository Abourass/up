const Lob = require('lob')(process.env.lobLiveSecret.toString());

class addressController {
  async verify (addressToVerify){
    const verificationResponse = await Lob.usVerifications.verify(addressToVerify);
    if (responseObj.primary_line !== originObj.primary_line) {
      if (responseObj.components.street_predirection.length > 0 || responseObj.components.street_postdirection.length > 0) {
        suggestions.street = 'cardinal direction';
      }
    }
    if (responseObj.components.zip_code !== originObj.zip_code) {
      suggestions.zip = 'Zip code changed';
    }
    if (responseObj.components.state !== originObj.state) {
      suggestions.state = 'State changed';
    }
    if (Object.keys(suggestions).length > 0) {
      return console.log(`Changed fields: ${JSON.stringify(suggestions)} Verified Address: ${responseObj.primary_line} ${responseObj.secondary_line} ${responseObj.last_line}`);
    }
    return console.log(`No suggestions to make. Verified Address: ${responseObj.primary_line} ${responseObj.secondary_line} ${responseObj.last_line}`);
  }
}
