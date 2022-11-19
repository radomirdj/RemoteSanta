export const foreignKeyTransformer = (
  record,
  foreignKeyName,
  foreignRecordName,
) => {
  const { [foreignKeyName]: foreignKeyId, ...rest } = record;
  const otherRecord = {
    connect: {
      id: foreignKeyId,
    },
  };

  const result = rest;
  result[foreignRecordName] = otherRecord;

  return result;
};

export const createForeignKeyTransformer = (
  foreignKeyName,
  foreignRecordName,
) => {
  return (record) =>
    foreignKeyTransformer(record, foreignKeyName, foreignRecordName);
};
