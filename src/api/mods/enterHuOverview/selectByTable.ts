/**
 * @desc 根据表名获取表的详细信息
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/enterHuOverview/getByTableInfo',
    params: bodyParams,
    method: 'get',
  });
}
