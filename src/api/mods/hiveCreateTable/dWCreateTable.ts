/**
 * @desc dw备用区建表接口
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/hiveCreateTable/dWCreateTable',
    params: bodyParams,
    method: 'post',
  });
}
