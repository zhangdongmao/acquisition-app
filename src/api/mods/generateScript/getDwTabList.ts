/**
 * @desc 获取dw脚本生成页面表清单
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {
  /** query */
  query?: Array<string>;
  /** pagenum */
  pagenum?: number;
  /** pagesize */
  pagesize?: number;
}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/generateScript/getDwTabList',
    params,
    method: 'get',
  });
}
