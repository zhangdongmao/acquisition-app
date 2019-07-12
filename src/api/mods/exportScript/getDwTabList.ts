/**
 * @desc 获取DW脚本导出清单
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {
  /** schema */
  schema: string;
}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/exportScript/getDwTabList',
    params,
    method: 'get',
  });
}
