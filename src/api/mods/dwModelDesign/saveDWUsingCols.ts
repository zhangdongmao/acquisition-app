/**
 * @desc dw在用区字段保存接口
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/dwModelDesign/saveDWUsingCols',
    params: bodyParams,
    method: 'post',
  });
}
