// WORKAROUND: ng-packagr issue - https://github.com/dherges/ng-packagr/issues/163
import { Drake } from 'dragula';
// @ts-ignore
import * as dragulaNamespace from 'dragula/dist/dragula';

export const dragula: (containers?: any, options?: any) => Drake = (dragulaNamespace as any).default || dragulaNamespace;
