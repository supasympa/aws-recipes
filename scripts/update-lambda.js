/*

 aws lambda update-function-code \
    --function-name helloWorld \
    --zip-file fileb://./lambdas/hello-world/target/helloWorld.lambda.zip

 */
const {Lambda} = require('aws-sdk');
const path = require('path');
const zipPath = path.resolve(__dirname, '../lambdas/hello-world/target/helloWorld.lambda.zip');
const {readFileSync} = require('fs');
const lambdaSdk = new Lambda();

lambdaSdk.updateFunctionCode({
    FunctionName: 'helloWorld',
    ZipFile: readFileSync(zipPath)
}, (err, data) => {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});
