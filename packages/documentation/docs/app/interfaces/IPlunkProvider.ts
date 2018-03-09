import { IPlunk } from './IPlunk';

export interface IPlunkProvider {
    plunk: IPlunk;
}

export function isIPlunkProvider(obj: any) {
    return 'plunk' in obj;
}