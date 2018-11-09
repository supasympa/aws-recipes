import { decryptFile } from './kms';

decryptFile(process.argv[2], process.argv[3]);
