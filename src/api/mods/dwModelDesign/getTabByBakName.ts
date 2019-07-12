/**
 * @desc 按备用区表名查表
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {
  /** dwDataTable */
  dwDataTable: string;
}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/dwModelDesign/getTabByBakName',
    params,
    method: 'get',
  });
}
