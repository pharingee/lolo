import { dirname, join } from 'path';
import { readFileSync } from 'fs';

import { Config, Image } from '../types';
import { validateConfig } from '../validators';

export const getConfigPath = (config?: string): string => {
  const projectRoot = join(process.cwd(), 'config.json');
  return config || projectRoot;
};

export const getConfig = (config?: string): Config => {
  const configPath = getConfigPath(config);
  const data = readFileSync(configPath, 'utf8');
  return validateConfig(JSON.parse(data));
};

export const getImageNames = (config?: string) => {
  return getConfig(config).images.map(image => image.name);
};

export const getImage = (
  imageName: string,
  config?: string,
): Image | undefined => {
  return getConfig(config).images.find(image => image.name === imageName);
};

export const getImageRootPath = (
  imageName: string,
  config?: string,
): string => {
  const configRoot = dirname(getConfigPath(config));
  const image = getImage(imageName, config);
  return join(configRoot, image.directory);
};

export const getImageFilePath = (
  imageName: string,
  relativePath: string,
  config?: string,
): string => {
  const imageRoot = getImageRootPath(imageName, config);
  return join(imageRoot, relativePath);
};
