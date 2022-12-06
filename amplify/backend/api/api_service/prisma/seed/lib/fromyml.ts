import * as fs from 'fs';

import uuid from 'uuid';
import * as YAML from 'yaml';

const fromyaml = (path) => {
  if (!path) {
    return [];
  }

  const records = YAML.parse(fs.readFileSync(path).toString('utf-8')) || [];
  return records.map((record) => {
    record.id = record.id || uuid();

    return record;
  });
};

export default fromyaml;
