function getSqsConsumerList(
  process: NodeJS.Process,
): import('@ssut/nestjs-sqs/dist/sqs.types').SqsConsumerOptions[] {
  return [
    {
      name: 'email-send',
      queueUrl: process.env.AWS_SQS_QUEUE_URL_SEND_EMAIL,
      region: process.env.AWS_REGION,
    },
    {
      name: 'email-send-failed',
      queueUrl: process.env.AWS_SQS_QUEUE_URL_SEND_EMAIL_FAILED,
      region: process.env.AWS_REGION,
    },
  ];
}

export default {
  getSqsConsumerList,
};
