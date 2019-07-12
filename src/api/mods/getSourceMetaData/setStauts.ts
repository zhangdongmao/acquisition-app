/**
     * @desc 生成schema数据信息
List<ViewSourceSystemEntity> 复杂对象
     */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/getSourceMetaData/getConnection',
    params: bodyParams,
    method: 'post',
  });
}
