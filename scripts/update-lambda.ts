import { Lambda } from 'aws-sdk';
import { readFileSync } from 'fs';
import { lambdaConfig } from './lambda-config';
const lambdaSdk = new Lambda();

lambdaSdk.updateFunctionCode(
    {
        FunctionName: lambdaConfig.functionName,
        ZipFile: readFileSync(lambdaConfig.zipPath),
    },
    (err, data) => {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    },
);
