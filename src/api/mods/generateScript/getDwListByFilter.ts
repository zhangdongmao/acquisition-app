/**
 * @desc dw脚本生成页面按系统名筛选接口
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/generateScript/getDwListByFilter',
    params: bodyParams,
    method: 'post',
  });
}
