import { getImageNames } from '../config';
import { BumpType, Config, Service, EnvironmentType } from '../types';
import { stringLiteral } from '@babel/types';

export const validateApp = (appName: string): string => {
  const appNames = getImageNames();
  if (!appNames.includes(appName))
    throw Error(`Invalid app type. Valid app names are ${appNames.join(', ')}`);

  return appName;
};

export const validateBumpType = (bumpType: string): BumpType => {
  const bumpTypes = Object.values(BumpType).map(bp => bp as string);
  if (!bumpTypes.includes(bumpType))
    throw Error(
      `Invalid bump type. Valid bump types are ${bumpTypes.join(', ')}`,
    );
  return bumpType as BumpType;
};

export const validateEnvironmentType = (envType: string): EnvironmentType => {
  const envTypes = Object.values(EnvironmentType).map(bp => bp as string);
  if (!envTypes.includes(envType))
    throw Error(
      `Invalid environment type. Valid environment types are ${envTypes.join(
        ', ',
      )}`,
    );
  return envType as EnvironmentType;
};

export const validateConfig = (config: any): Config => {
  if (!('images' in config))
    throw Error('Invalid config. "images" is a required prop');

  if (!('name' in config.images))
    throw Error('Invalid config. "name" is a required prop in "images');

  if (!('directory' in config.images))
    throw Error('Invalid config. "directory" is a required prop in "images');

  if (!('services' in config.images))
    throw Error('Invalid config. "services" is a required prop in "images');

  return config as Config;
};

export const validateService = (service: any): Service => {
  if (!('name' in service))
    throw Error('Invalid service. "name" is a required prop');

  if (!('command' in service))
    throw Error('Invalid service. "command" is a required prop');

  return service as Service;
};
