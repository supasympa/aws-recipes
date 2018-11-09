import { resolve } from 'path';
import { encryptFile } from './kms';

encryptFile(resolve(__dirname, '../.env.json'), resolve(__dirname, '../.env.enc-json.txt'));
encryptFile(resolve(__dirname, '../PRIVATE.md'), resolve(__dirname, '../.PRIVATE.enc-md.txt'));
encryptFile(resolve(__dirname, '../lambda.config.json'), resolve(__dirname, '../.lambda.config.enc-json.txt'));
