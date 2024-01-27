import * as env from 'env-var';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: 'environemnts/api/.env',
});

export const baseEnvTransformer = (key: string, required: boolean = false) => {
  let val = env.get(key);

  if (required) {
    val = val.required();
  }

  return val;
};

export const envAsString = (key: string, required: boolean = false): string => baseEnvTransformer(key, required).asString();

export const envAsNumber = (key: string, required: boolean = false): number => baseEnvTransformer(key, required).asInt();

export const envAsBoolean = (key: string, required: boolean = false): boolean => baseEnvTransformer(key, required).asBool();
