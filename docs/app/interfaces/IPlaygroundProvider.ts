import { IPlayground } from './IPlayground';

export interface IPlaygroundProvider {
    playground: IPlayground;
}

export function isIPlaygroundProvider(obj: any) {
    return 'playground' in obj;
}