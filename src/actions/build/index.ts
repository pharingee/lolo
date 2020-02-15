import { exec } from 'shelljs';

import { getImage, getImageFilePath, getImageRootPath } from '../../config';
import { getEnvironmentVariables } from '../../utils';

export const buildImage = (imageName: string, config?: string) => {
  const image = getImage(imageName, config);
  const cwd = getImageRootPath(imageName);
  image.builds.forEach(build => {
    const buildArgs = build.buildArgs
      ? `--build-args ${getEnvironmentVariables(build.buildArgs)}`
      : '';
    const command = `docker build ${buildArgs} -t ${imageName} .`;
    exec(command, { cwd });
  });
};
