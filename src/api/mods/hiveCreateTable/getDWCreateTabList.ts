/**
 * @desc dw建表页面获取表清单接口
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
    url: '/hiveCreateTable/getDWCreateTabList',
    params,
    method: 'get',
  });
}
