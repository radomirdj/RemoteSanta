import * as fs from 'fs';

import { v4 as uuidv4 } from 'uuid';
import * as YAML from 'yaml';

const fromyaml = (path) => {
  if (!path) {
    return [];
  }

  const records = YAML.parse(fs.readFileSync(path).toString('utf-8')) || [];
  return records.map((record) => {
    record.id = record.id || uuidv4();

    return record;
  });
};

export default fromyaml;
