/**
 * @desc getFilterResults
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = new defs.Result();

export async function request(params) {
  return pontFetch({
    url: '/exportScript/getFilterResults',
    params,
    method: 'head',
  });
}
