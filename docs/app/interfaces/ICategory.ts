import { ISection } from './ISection';

export interface ICategory {
    title: string;
    link: string;
    sections: ISection[];
}