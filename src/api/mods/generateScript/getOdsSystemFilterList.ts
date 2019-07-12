/**
 * @desc ods脚本生成页面获取筛选列表接口
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/generateScript/getOdsSystemFilterList',
    params,
    method: 'get',
  });
}
