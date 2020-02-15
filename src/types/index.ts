export type Command = string | Array<string>;

export interface VariableSet {
  [key: string]: string;
}

interface Test {
  command: Command;
  envFile?: string;
  variableSet?: VariableSet;
}

export interface Service {
  name: string;
  command: Command;
  deployEnvironments: Array<EnvironmentType>;
  envFile?: string;
  variableSet?: VariableSet;
}

interface SingleHostDeployment {
  deployTo: EnvironmentType;
  environment: VariableSet;
}

type Deployment = SingleHostDeployment;

interface Build {
  dockerFile?: string;
  buildArgs?: VariableSet;
}

export interface GithubData {
  owner: string;
  repository: string;
}

export interface Image {
  username?: string;
  name: string;
  directory: string;
  versionCommand: Command;
  builds: Array<Build>;
  testing: Array<Test>;
  services: Array<Service>;
  deployment?: Array<Deployment>;
}

export interface Config {
  images: Array<Image>;
  repository: string;
  isCodeOnGithub?: boolean;
  github?: GithubData;
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
