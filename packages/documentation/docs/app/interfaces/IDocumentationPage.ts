import { ICategory } from './ICategory';

export interface IDocumentationPage {
    id?: string;
    title: string;
    categories: ICategory[];
}