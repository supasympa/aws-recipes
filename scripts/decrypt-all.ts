import { resolve } from 'path';
import { decryptFile } from './kms';

decryptFile(resolve(__dirname, '../.env.enc-json.txt'), resolve(__dirname, '../.env.json'));
decryptFile(resolve(__dirname, '../.PRIVATE.enc-md.txt'), resolve(__dirname, '../PRIVATE.md'));
decryptFile(resolve(__dirname, '../.lambda.config.enc-json.txt'), resolve(__dirname, '../lambda.config.json'));
