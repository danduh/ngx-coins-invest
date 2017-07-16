import { allConfig } from './env.config';

export const environment = Object.assign({}, {production: false}, allConfig.mock);
