/**
 * @desc 获取源系统数据模式
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/getSourceMetaData/getSystemFilterList',
    params,
    method: 'get',
  });
}
