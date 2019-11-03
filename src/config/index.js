import { dirname } from 'path';
import { readFileSync } from 'fs';

const getConfig = () => {
  const root = process.cwd();
  const data = readFileSync(dirname(root), 'config.json', 'utf8');
  return JSON.parse(data);
};
