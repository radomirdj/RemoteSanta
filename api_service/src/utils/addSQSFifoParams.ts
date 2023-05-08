import { v4 as uuidv4 } from 'uuid';

const addSQSFifoParams = (
  SQSParams,
  deduplicationId = uuidv4(),
  groupId = uuidv4(), // groupId: uuidv4(), // Don't keep FIFO order, to keep order switch to 'first-queue-group',
) => {
  if (process.env.AWS_SQS_IGNORE_FIFO) {
    return SQSParams;
  }
  return { ...SQSParams, groupId, deduplicationId };
};

export default addSQSFifoParams;
