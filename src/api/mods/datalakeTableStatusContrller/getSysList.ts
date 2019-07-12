/**
 * @desc getSysList
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/tableStatus/getSysList',
    params,
    method: 'get',
  });
}
