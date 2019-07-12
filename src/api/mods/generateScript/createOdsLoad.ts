/**
     * @desc 创建ods加载脚本
List<EtuInfo>
     */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/generateScript/createOdsLoad',
    params: bodyParams,
    method: 'post',
  });
}
