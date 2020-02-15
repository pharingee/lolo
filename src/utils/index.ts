import { readFileSync } from 'fs';
import { join } from 'path';

import { getImage } from '../config';
import { Image, Command, VariableSet } from '../types';
import { getChangedFiles, getRemoteFile } from './github';

export const getVersion = (imageName: string, config?: string): string => {
  const image = getImage(imageName, config);
  const versionPath = join(image.directory, 'VERSION');
  const contents = readFileSync(versionPath, 'utf8');
  return contents;
};

export const getRemoteVersion = async (
  imageName: string,
  branch: string,
  config?: string,
): Promise<string> => {
  const image = getImage(imageName, config);
  const versionPath = join(image.directory, 'VERSION');
  const contents = await getRemoteFile(branch, versionPath);
  return JSON.parse(contents).version;
};

export const hasImageChanged = async (
  imageName: string,
  prNumber: string,
  config?: string,
): Promise<boolean> => {
  const files = await getChangedFiles(prNumber, config);
  const image = getImage(imageName, config);
  return files.findIndex(filename => filename.includes(image.directory)) >= 0;
};

export const hasImageVersionUpdated = async (
  imageName: string,
  prNumber: string,
  config?: string,
): Promise<boolean> => {
  const files = await getChangedFiles(prNumber, config);
  const image = getImage(imageName, config);
  const remoteVersion = await getRemoteVersion(imageName, 'master');
  if (files.findIndex(filename => filename.includes(image.directory)) >= 0) {
    return getVersion(imageName) !== remoteVersion;
  }
  return true;
};

export const getShellCommand = (command: Command): string => {
  if (Array.isArray(command)) return command.join(' ');
  return command;
};

export const getEnvironmentVariables = (environment: VariableSet): string => {
  let val = '';
  Object.keys(environment).forEach(key => {
    val = `${val} -e ${key}="${environment[key]}"`;
  });
  return val;
};
