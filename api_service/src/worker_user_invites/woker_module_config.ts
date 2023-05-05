function getSqsConsumerList(
  process: NodeJS.Process,
): import('@ssut/nestjs-sqs/dist/sqs.types').SqsConsumerOptions[] {
  return [
    {
      name: 'first-queue',
      queueUrl: 'http://sqs:9324/queue/first-queue',
      region: process.env.AWS_REGION,
    },
    {
      name: 'dead-first-queue',
      queueUrl: 'http://sqs:9324/queue/dead-first-queue',
      region: process.env.AWS_REGION,
    },
    {
      name: process.env.AWS_SQS_QUEUE_NAME_USER_INVITE_IMPORT,
      queueUrl: process.env.AWS_SQS_QUEUE_URL_USER_INVITE_IMPORT,
      region: process.env.AWS_REGION,
    },
    {
      name: process.env.AWS_SQS_QUEUE_NAME_USER_INVITE_IMPORT_FAILED,
      queueUrl: process.env.AWS_SQS_QUEUE_URL_USER_INVITE_IMPORT_FAILED,
      region: process.env.AWS_REGION,
    },
  ];
}

export default {
  getSqsConsumerList,
};
