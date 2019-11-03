import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { Config } from '../types';

export const getConfig = (): Config => {
  const root = process.cwd();
  const data = readFileSync(join(dirname(root), 'config.json'), 'utf8');
  return JSON.parse(data);
};

export const getImageNames = () => {
  return getConfig().images.map(image => image.name);
};
