/**
 * @desc getFilterList
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {
  /** flag */
  flag: string;
}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/exportScript/getFilterList',
    params,
    method: 'get',
  });
}
