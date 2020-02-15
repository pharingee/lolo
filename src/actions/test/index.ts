import { exec } from 'shelljs';

import { getImage, getImageFilePath } from '../../config';
import { getShellCommand, getEnvironmentVariables } from '../../utils';

export const testImage = (imageName: string, config?: string) => {
  const image = getImage(imageName, config);
  image.testing.forEach(test => {
    const imageCommand = getShellCommand(test.command);
    const envVariables = test.variableSet
      ? getEnvironmentVariables(test.variableSet)
      : '';
    const envFile = test.envFile
      ? `--env-file ${getImageFilePath(imageName, test.envFile)}`
      : '';
    const command = `docker run --rm -e CI=true ${envVariables} ${envFile} ${imageName} ${imageCommand}`;
    exec(command);
  });
};
