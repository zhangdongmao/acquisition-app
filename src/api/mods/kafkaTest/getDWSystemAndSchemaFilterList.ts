/**
 * @desc getDWSystemAndSchemaFilterList
 */

import * as defs from '../../baseClass';
import pontFetch from 'src/utils/pontFetch';

export class Params {}

export const init = undefined;

export async function request(params) {
  return pontFetch({
    url: '/kafka/sender',
    params,
    method: 'get',
  });
}
