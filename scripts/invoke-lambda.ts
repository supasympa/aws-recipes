import { cli } from './cli';
/*
aws lambda invoke \
    --invocation-type RequestResponse \
    --function-name helloWorld \
    --region eu-west-2 \
    --log-type Tail \
    --payload '{}' \
    --profile default \
    outputfile.txt
 */

import { Lambda } from 'aws-sdk';
const lambdaSdk = new Lambda();
import { lambdaConfig } from './lambda-config';

export const invokeLambda = (payload: any) => {
    const params = {
        FunctionName: lambdaConfig.functionName,
        InvocationType: lambdaConfig.invocationType, // ..'RequestResponse',
        LogType: lambdaConfig.logType, // 'Tail',
        Payload: new Buffer(JSON.stringify(payload)),
    };

    return lambdaSdk.invoke(params, (err, data) => {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
    });
};
