import * as chai from 'chai';
import * as sinon from 'sinon';
import { default as sinonChai } from 'sinon-chai';

const { expect } = chai;
chai.use(sinonChai);

import { S3Website } from '../../src/recipes/S3Website';
import { SinonStub } from 'sinon';

describe('An S3Website', () => {
    let s3UploadSpy: SinonStub;
    let s3Website: S3Website;

    beforeEach(() => {
        s3UploadSpy = sinon.stub();
        s3Website = new S3Website(
            s3UploadSpy,
        );
    });

    it('should be testable', () => {
        expect(s3Website).not.to.equal(null);
    });

    describe('creating a new website -> create(config...)', () => {
        describe('with a valid configuration', () => {
            const validConfig = {
                bucketName: '001-supanice-co-uk',
                domain: '001.supanice.co.uk',
                filePath: '/Users/lewis_barclay/code/aws-recipes/spec/support/test-files',
            };

            it('should upload files to the specified S3 bucket', () => {
                s3Website.create(validConfig);
                expect(s3UploadSpy).to.have.been.calledWith(validConfig.filePath, validConfig.bucketName);
            });

            it('should setup a cloudfront distribution', () => {
                expect('cloudfront').to.equal('tested');
            });

            it('should point a domain at the S3 bucket', () => {
                expect('route53').to.equal('tested');
            });
        });
    });
});
