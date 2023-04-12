import * as fs from 'fs';
import util from 'util';

import { flatMap, uniq, chunk } from 'lodash';

import fromyaml from './fromyml';

export const updateToAdminRole = async (prisma) => {
  console.log('*** updating updateToAdminRole users to admin role ***');
  const rsp = await prisma.user.updateMany({
    where: {
      id: {
        in: [
          'c75176ef-fdaf-4b54-a8bb-3e7661451985',
          '0729ba8f-9e8c-4d23-9be4-f6caac0bedad',
        ],
      },
    },
    data: {
      userRole: 'ADMIN',
    },
  });
  console.log(`*** updated ${rsp.count} users to admin role ***`);
  return rsp;
};

export const seedTable = async (
  prisma,
  modelName: string,
  recordTransformer /*: (record: Object) => Object*/ = (record) => record,
  excludeFields: string[] = [],
  ignoreRecordFunc?: any,
  onConflictFields?: any,
) => {
  const [path] = getPath(modelName);

  if (!path) {
    console.log(`*** no seed file for ${path} ***`);
    return;
  }

  const records = fromyaml(path);
  console.log(`*** seeding ${records.length} to ${modelName} table ***`);

  const recordChunkList = chunk(records, 20);
  for (let i = 0; i < recordChunkList.length; i++) {
    // const set1 = new Set();
    // recordChunkList[i].forEach((r: {id: string}) => set1.add(r.id));
    // console.log(
    //   'recordChunkList[i]',
    //   recordChunkList[i].length,
    //   set1.size,
    //   recordChunkList[i],
    // );

    await insertRecords(
      prisma,
      recordChunkList[i],
      recordTransformer,
      excludeFields,
      ignoreRecordFunc,
      modelName,
      onConflictFields,
    );
  }
};

export const getPath = (modelName) => {
  const environment = process.env.ENVIRONMENT_NAME || process.env.NODE_ENV;
  let pathDir = `${__dirname}/../data/${environment}`;
  let path = `${pathDir}/${modelName}.yml`;
  console.log('getPath -> path', path);

  if (!fs.existsSync(path)) {
    pathDir = `${__dirname}/../data`;
    path = `${pathDir}/${modelName}.yml`;
    if (!fs.existsSync(path)) {
      console.log(`*** No seed file found for ${modelName} table ***`);
      return [];
    }
  }
  return [path, pathDir];
};

export const insertRecords = async (
  prisma,
  records,
  recordTransformer,
  excludeFields,
  ignoreRecordFunc,
  modelName,
  onConflictFields,
) =>
  Promise.all(
    records.map(async (record) => {
      excludeFields &&
        excludeFields.forEach((field) => {
          delete record[field];
          return;
        });

      if (ignoreRecordFunc && (await ignoreRecordFunc(modelName, record))) {
        console.log(`*** ignored: ${record.id} for table ${modelName}`);
        return {
          ignored: true,
          record,
        };
      }
      return await insertOrUpdate(
        prisma,
        modelName,
        recordTransformer(record),
        onConflictFields,
      );
    }),
  );

const insertOrUpdate = async (
  prisma,
  modelName,
  record,
  onConflictFields = 'id',
) => {
  const where = {};
  where[onConflictFields] = record[onConflictFields];
  await prisma[modelName].upsert({
    where,
    update: record,
    create: record,
  });
};
