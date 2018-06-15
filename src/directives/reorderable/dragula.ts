// WORKAROUND: Angular Cli 6 has removed the globals patch, dragular requires this to we can patch it here
(<any>window).global = (<any>window).global || {};

// WORKAROUND: ng-packagr issue - https://github.com/dherges/ng-packagr/issues/163
import * as dragulaNamespace from 'dragula';
import { Drake } from 'dragula';

export const dragula: (containers?: any, options?: any) => Drake = (dragulaNamespace as any).default || dragulaNamespace;