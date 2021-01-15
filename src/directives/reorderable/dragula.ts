// WORKAROUND: ng-packagr issue - https://github.com/dherges/ng-packagr/issues/163
// @ts-ignore
import * as dragulaExpt from 'dragula';
import { Drake } from 'dragula';

export const dragula: (containers?: any, options?: any) => Drake = (dragulaExpt as any || {}).default || dragulaExpt;
