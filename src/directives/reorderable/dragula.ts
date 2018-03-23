// WORKAROUND: ng-packagr issue - https://github.com/dherges/ng-packagr/issues/163
import * as dragulaNamespace from 'dragula';
import { Drake } from 'dragula';

export const dragula: (containers?: any, options?: any) => Drake = (dragulaNamespace as any).default || dragulaNamespace;