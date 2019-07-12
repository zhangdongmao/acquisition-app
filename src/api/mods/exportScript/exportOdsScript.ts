/**
 * @desc 导出ODS脚本
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = undefined;

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/exportScript/exportOdsScript',
    params: bodyParams,
    method: 'post',
  });
}
