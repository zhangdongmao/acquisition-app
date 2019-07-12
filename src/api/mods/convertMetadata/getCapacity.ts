/**
     * @desc 获取容量
List<EtuInfo> 
     */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/convertMetadata/getCapacity',
    params: bodyParams,
    method: 'post',
  });
}
