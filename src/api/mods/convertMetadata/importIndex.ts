/**
     * @desc 导入索引
List<EtuInfo> 
     */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/convertMetadata/importIndex',
    params: bodyParams,
    method: 'post',
  });
}
