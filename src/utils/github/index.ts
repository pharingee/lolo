import Github from 'github-api';

import { getConfig } from '../../config';

export const getRepo = (configPath?: string) => {
  const token = process.env.GITHUB_TOKEN;
  const config = getConfig(configPath);
  const ghInfo = config.github;

  if (!ghInfo || !ghInfo.repository || !ghInfo.owner) {
    throw Error('Invalid Github configuration');
  }

  const gh = new Github({ token });
  return gh.getRepo(ghInfo.owner, ghInfo.repository);
};

export const getRemoteFile = async (
  branch: string,
  filename: string,
  config?: string,
): Promise<string> => {
  const repo = getRepo(config);
  const response = await repo.getContents(branch, filename);
  const data = response.data;
  if (!data || !data.content) {
    throw Error(
      `Invalid Github response for remote file ${branch}:${filename}`,
    );
  }
  return Buffer.from(data.content, 'base64').toString('binary');
};

export const getChangedFiles = async (
  prNumber: string,
  config?: string,
): Promise<Array<string>> => {
  const repo = getRepo(config);
  const response = await repo.listPullRequestFiles(prNumber);
  const data = response.data;
  if (!data || !Array.isArray(data)) {
    throw Error(`Invalid Github response for PR${prNumber} files`);
  }
  return data.map((file: any) => file.filename);
};
