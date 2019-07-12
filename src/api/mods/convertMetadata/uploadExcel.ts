/**
 * @desc  上传excel并转成map数据
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params, bodyParams) {
  return pontFetch({
    url: '/convertMetadata/uploadExcel',
    params: bodyParams,
    method: 'post',
  });
}
