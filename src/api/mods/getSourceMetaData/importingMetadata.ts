/**
     * @desc 按schema导入元数据
List<CjDataSourceSystemInfo> 复杂对象
     */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/getSourceMetaData/importingMetadata',
    params: bodyParams,
    method: 'post',
  });
}
