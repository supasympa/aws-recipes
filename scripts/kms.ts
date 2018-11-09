import aws from 'aws-sdk';
import { EncryptRequest } from 'aws-sdk/clients/kms';
import fs from 'fs';
import path from 'path';

const encrypt = (buffer: Buffer) => {
  const kms = new aws.KMS();

  return new Promise((resolve, reject) => {
    const params: EncryptRequest = {
      KeyId: process.env.AWS_KMS_CMK_ARN as string,
      Plaintext: buffer, // The data to encrypt.
    };
    kms.encrypt(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.CiphertextBlob);
      }
    });
  });
};

const decrypt = (buffer: Buffer) => {
  const kms = new aws.KMS();

  return new Promise((resolve, reject) => {
    const params = {
      CiphertextBlob: buffer, // The data to dencrypt.
    };
    kms.decrypt(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Plaintext);
      }
    });
  });
};

const encryptFile = (inputFile: string, outputFile: string) => {
  const input = fs.readFileSync(path.resolve(process.cwd(), inputFile));
  // @ts-ignore
  encrypt(Buffer.from(input, 'UTF-8')).then((encrypted) => {
    fs.writeFileSync(path.resolve(process.cwd(), outputFile), encrypted);
  });
};

const decryptFile = (inputFile: string, outputFile: string) => {
  const input = fs.readFileSync(path.resolve(process.cwd(), inputFile));
  // @ts-ignore
  decrypt(Buffer.from(input, 'UTF-8')).then((decrypted) => {
    fs.writeFileSync(path.resolve(process.cwd(), outputFile), decrypted);
  });
};

export {
    encrypt,
    decrypt,
    encryptFile,
    decryptFile,
};
