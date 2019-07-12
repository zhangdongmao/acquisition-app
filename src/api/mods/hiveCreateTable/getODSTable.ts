/**
 * @desc ods建表页面获取表清单接口
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {
  /** 当前页数 */
  pagenum: number;
  /** 数据 */
  query: object;
  /** 页面大小 */
  pagesize: number;
}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/hiveCreateTable/getODSTableInfo',
    params,
    method: 'get',
  });
}
