/**
 * @desc 按ODS表名查表
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {
  /** odsDataTable */
  odsDataTable: string;
}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/dwModelDesign/getOdsTabInfoByName',
    params,
    method: 'get',
  });
}
