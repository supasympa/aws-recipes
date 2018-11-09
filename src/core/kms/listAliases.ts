import { KMS } from 'aws-sdk';

const kms = new KMS();
const params = {};

kms.listAliases(params, function(err, data) {
    if (err) { console.log(err, err.stack); } // an error occurred
    else { console.log(data); }
});
