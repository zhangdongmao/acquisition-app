/**
 * @desc 获取dw建表页面的筛选列表
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/hiveCreateTable/getDWSystemAndSchemaFilterList',
    params,
    method: 'get',
  });
}
