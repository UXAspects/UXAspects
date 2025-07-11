import { IFooterColumn } from './IFooterColumn';
import { ILink } from './ILink';
import { ILogo } from './ILogo';

export interface IFooter {
  columns: IFooterColumn[];
  copyright: string;
  logo: ILogo;
  feedback: ILink;
}
