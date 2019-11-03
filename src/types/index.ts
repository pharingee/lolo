type Command = string | Array<string>;

interface Environment {
  [key: string]: string;
}

interface Testing {
  command: Command;
  envFile?: string;
  environment?: Environment;
}

export interface Service {
  name: string;
  command: Command;
  isDeployed?: false;
  envFile?: string;
  environment?: Environment;
}

interface Deployment {
  environments: Environment;
}

export interface Image {
  username?: string;
  name: string;
  directory: string;
  envFile?: string;
  environment?: Environment;
  testing?: Testing;
  services: Array<Service>;
  deployment?: Deployment;
}

export interface Config {
  images: Array<Image>;
}

export enum EnvironmentType {
  Development = 'dev',
  Staging = 'stage',
  Production = 'prod',
}

export enum BumpType {
  Major = 'major',
  Minor = 'minor',
  Patch = 'patch',
}
