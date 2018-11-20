import { KMS } from 'aws-sdk';
const kms = new KMS();
const params = {};

export const kmsAliases = {
    list(): any {
        return kms.listAliases(params).promise()
            .catch(console.error);
    },

    /**
     * find an alias by name
     * @param name
     */
    findByName(name: string): Promise<any> {
        return this.list().then((aliases: any) => aliases.Aliases.find((a: any) => a.AliasName === `alias/${name}`));
    },
};
