/**
 * @desc 保存映射关系
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/dwModelDesign/saveMapRel',
    params: bodyParams,
    method: 'post',
  });
}
