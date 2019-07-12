/**
 * @desc 生成ods初始化脚本
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/generateScript/generateSqoopScript',
    params: bodyParams,
    method: 'post',
  });
}
