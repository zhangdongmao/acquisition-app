/**
 * @desc  获取去重的Schema
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/enterHuOverview/getSchema',
    params: bodyParams,
    method: 'get',
  });
}
