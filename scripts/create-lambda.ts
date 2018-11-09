import { Lambda } from 'aws-sdk';
import { CreateFunctionRequest } from 'aws-sdk/clients/lambda';
import { readFileSync } from 'fs';
import * as path from 'path';
import { cli } from './cli';
import { lambdaConfig } from './lambda-config';

try {
    const lambdaSdk = new Lambda();
// @ts-ignore
    const zipPath = path.resolve(
        __dirname,
        `../${lambdaConfig.zipPath}`,
    );
    const req: CreateFunctionRequest = {
        Code: {
            ZipFile: readFileSync(zipPath),
        },
        FunctionName: lambdaConfig.functionName,
        Handler: lambdaConfig.handler,
        MemorySize: lambdaConfig.memorySize,
        Publish: true,
        Role: lambdaConfig.role,
        Runtime: lambdaConfig.runTime,
    };

    lambdaSdk.createFunction(req, (err, data) => {
        if (err) {
            cli.failed(err, '\n----\n', err.stack);
            process.exit(1);
        } else {
            cli.success(data);
            process.exit(0);
        }
    });
} catch (err) {
    cli.failed(err, '\n----\n', err.stack);
    process.exit(1);
}
