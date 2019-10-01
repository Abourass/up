const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const s3Controller = async({bucket: bucket, key: key} = {}) => {
  try{
   await s3.getObject({ Bucket: bucket, Key: key}, async(err, data) => {
      if (err) console.error(err);
      console.log(data.Body);
      return data.Body;
    });
  } catch (err) {console.error(err)}
};
module.exports = s3Controller;
