import { ICodePenTemplate } from './ICodePenTemplate';

export interface ICodePen {
    html: string;
    htmlAttributes?: any;
    htmlTemplates?: ICodePenTemplate[];
    css?: string[];
    js?: string[];
}
