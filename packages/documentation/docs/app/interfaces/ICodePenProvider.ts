import { ICodePen } from './ICodePen';

export interface ICodePenProvider {
    codepen: ICodePen;
}

export function isICodePenProvider(obj: any) {
    return 'codepen' in obj;
}