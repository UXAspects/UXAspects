import { ISection } from './ISection';
import { Usage } from './Usage';

export interface ICategory {
  title: string;
  link: string;
  sections: ISection[];
}
