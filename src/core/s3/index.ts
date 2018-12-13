import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

export const uploadDirectoryToS3 = (filePath: string, bucketName: string) => {

    const s3 = new AWS.S3();

    return s3.createBucket({
        Bucket: bucketName,
    }).promise()
        .then(() => {

            function syncFilesToS3Recursively(currentDirPath: string, callback: (filePath: string, stat: any) => void) {
                fs.readdirSync(currentDirPath).forEach((name) =>  {
                    const fullFilePath = path.join(currentDirPath, name);
                    const stat = fs.statSync(fullFilePath);
                    if (stat.isFile()) {
                        callback(fullFilePath, stat);
                    } else if (stat.isDirectory()) {
                        syncFilesToS3Recursively(fullFilePath, callback);
                    }
                });
            }

            syncFilesToS3Recursively(filePath, (filePathToWalk) => {
                const bucketPath = filePathToWalk.substring(filePathToWalk.length + 1);
                const params = {
                    Body: fs.readFileSync(filePathToWalk),
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

/*
    example:

    uploadDir(path.resolve(__dirname, '../../../scripts'), 'supasympa-foobarbaz');
 */
