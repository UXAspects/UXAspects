import { IPlayground } from './IPlayground';

export interface IPlaygroundProvider {
    playground: IPlayground | (() => IPlayground);
}

export function isIPlaygroundProvider(obj: any): obj is IPlaygroundProvider {
    return 'playground' in obj;
}
