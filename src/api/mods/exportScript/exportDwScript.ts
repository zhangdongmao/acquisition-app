/**
 * @desc 导出dw脚本
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = undefined;

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/exportScript/exportDwScript',
    params: bodyParams,
    method: 'post',
  });
}
