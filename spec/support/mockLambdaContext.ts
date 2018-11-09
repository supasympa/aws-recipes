import { Context as LambdaContext } from 'aws-lambda';

const defaultContext: LambdaContext = {
  awsRequestId: 'string',
  callbackWaitsForEmptyEventLoop: false,
  functionName: 'string',
  functionVersion: 'string',
  getRemainingTimeInMillis: () => 0,
  invokedFunctionArn: 'string',
  logGroupName: 'string',
  logStreamName: 'string',
  memoryLimitInMB: 10000,
  done() { return null; },
  fail() { return null; },
  succeed() { return null; },
};

export default (overrides?: any): LambdaContext => ({...defaultContext, ...overrides});
