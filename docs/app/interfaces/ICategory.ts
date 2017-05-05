import { Usage } from './Usage';
import { ISection } from './ISection';

export interface ICategory {
    title: string;
    link: string;
    usage: Usage[];
    sections: ISection[];
}