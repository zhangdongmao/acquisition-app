/**
 * @desc 获取ods建表页面的筛选列表
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/hiveCreateTable/getODSSystemAndSchemaFilterList',
    params,
    method: 'get',
  });
}
