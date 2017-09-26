import { ILink } from './ILink';
import { IFooterColumn } from './IFooterColumn';
import { ILogo } from './ILogo';

export interface IFooter {
    columns: IFooterColumn[];
    copyright: string;
    logo: ILogo;
    feedback: ILink;
    logoTitle: string;
}