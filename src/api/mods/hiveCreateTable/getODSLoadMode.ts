/**
 * @desc 判断ODS抽取策略和分区字段
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/hiveCreateTable/getODSLoadMode',
    params: bodyParams,
    method: 'post',
  });
}
