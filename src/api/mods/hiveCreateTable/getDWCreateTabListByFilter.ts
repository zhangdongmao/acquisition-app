/**
 * @desc dw建表页面按系统名和schema筛选接口
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/hiveCreateTable/getDWCreateTabListByFilter',
    params: bodyParams,
    method: 'post',
  });
}
