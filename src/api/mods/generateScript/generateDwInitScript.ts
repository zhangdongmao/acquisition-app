/**
 * @desc 生成dw初始化脚本
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/generateScript/generateDwInitScript',
    params: bodyParams,
    method: 'post',
  });
}
