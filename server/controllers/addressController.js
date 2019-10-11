require('dotenv').config();
const Lob = require('lob')(process.env.lobLiveSecret.toString());

class addressController {
  async verify ({street: primary_line, city: city, state: state, zip: zip} = {}){
    console.log({street: primary_line, city: city, state: state, zip: zip});
    const suggestions = {};
    const avResponse = await Lob.usVerifications.verify({primary_line: primary_line, city: city, state: state, zip_code: zip});
    if (avResponse.primary_line !== primary_line) {
      if (avResponse.components.street_predirection.length > 0 || avResponse.components.street_postdirection.length > 0) {
        suggestions.street = 'cardinal direction';
      }
    }
    if (avResponse.components.zip_code !== zip) { suggestions.zip = 'Zip Code Changed'; }
    if (avResponse.components.state !== state) { suggestions.state = 'State changed'; }
    if (Object.keys(suggestions).length > 0) {
      return {
        verificationResult: avResponse,
        suggestions: suggestions
      }
    }
    return {
      verificationResult: avResponse,
      suggestions: null
    };
  };
}
module.exports = addressController;
