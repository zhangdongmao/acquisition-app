/**
 * @desc 获取表信息列表
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

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/enterHuOverview/getSysNameAndSchemaAndTableName',
    params: bodyParams,
    method: 'get',
  });
}
