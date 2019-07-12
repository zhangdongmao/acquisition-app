/**
 * @desc 获取表及字段的查询
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/getSourceMetaData/getSchemaByFilter',
    params: bodyParams,
    method: 'post',
  });
}
