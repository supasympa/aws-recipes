export interface S3WebsiteConfiguration {
    bucketName: string;
    domain: string;
    filePath: string;
}

export class S3Website {
    constructor(
        private s3Upload: any,
    ) {

    }

    public create(config: S3WebsiteConfiguration) {
        this.s3Upload(
            config.filePath,
            config.bucketName);
    }
}
