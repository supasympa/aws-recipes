import { readFileSync } from 'fs';
import * as path from 'path';

export interface LambdaConfiguration {
    functionName: string;
    handler: string;
    memorySize: number;
    role: string;
    runTime: string;
    zipPath: string;
    distPath: string;
    invocationType: string;
    logType: string;
}

export const lambdaConfig: LambdaConfiguration = JSON.parse(
    readFileSync(
        path.resolve(__dirname, '../lambda.config.json'),
        'utf8',
    ),
);
