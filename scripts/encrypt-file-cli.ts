import { encryptFile } from './kms';

encryptFile(process.argv[2], process.argv[3]);
