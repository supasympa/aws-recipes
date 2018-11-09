import { exec as utilExec } from 'child_process';
import { resolve } from 'path';
import { promisify } from 'util';
import { cli } from './cli';
import { lambdaConfig } from './lambda-config';

const exec = promisify(utilExec);

const zip = async (lambdaName: string) => {
    const targetPath = resolve(__dirname, '..', lambdaConfig.zipPath);
    const distPath = resolve(__dirname, '..', lambdaConfig.distPath);
    const result = await exec(`zip -r -j ${targetPath} ${distPath}`);
    const { stdout, stderr } = result;

    if (!! stderr) {
        throw new Error (stderr);
    }

    if (!! stdout) {
        cli.success('Lambda packed in target directory:', stdout);
    }
};

zip(lambdaConfig.functionName)
    .then(() => process.exit(0))
    .catch((err) => {
        cli.failed('Error packaging Lambda:', err.stdout);
        process.exit(1);
    });
