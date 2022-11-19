import * as compose from 'compose-function';

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

export const createForeignKeyListTransformer = (foreignKeyList) => {
  return (record) => {
    const transformerList = foreignKeyList.map(
      ({ foreignKeyName, foreignRecordName }) =>
        createForeignKeyTransformer(foreignKeyName, foreignRecordName),
    );
    // console.log(
    //   'createForeignKeyListTransformer -> transformerList',
    //   transformerList,
    //   compose,
    //   '\n\n\n',
    // );
    return compose(...transformerList)(record);
  };
};
