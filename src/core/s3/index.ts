import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

export const uploadDir = (s3Path: string, bucketName: string) => {

    const s3 = new AWS.S3();

    return s3.createBucket({
        Bucket: bucketName,
    }).promise()
        .then(() => {

            function walkSync(currentDirPath: string, callback: (filePath: string, stat: any) => void) {
                fs.readdirSync(currentDirPath).forEach((name) =>  {
                    const filePath = path.join(currentDirPath, name);
                    const stat = fs.statSync(filePath);
                    if (stat.isFile()) {
                        callback(filePath, stat);
                    } else if (stat.isDirectory()) {
                        walkSync(filePath, callback);
                    }
                });
            }

            walkSync(s3Path, (filePath) => {
                const bucketPath = filePath.substring(s3Path.length + 1);
                const params = {
                    Body: fs.readFileSync(filePath),
                    Bucket: bucketName,
                    Key: bucketPath,
                };
                s3.putObject(params, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Successfully uploaded ' + bucketPath + ' to ' + bucketName);
                    }
                });
            });
        });
};

uploadDir(path.resolve(__dirname, '../../../scripts'), 'supasympa-foobarbaz');
