import { ILink } from './ILink';
import { IFooterColumn } from './IFooterColumn';

export interface IFooter {
    columns: IFooterColumn[];
    copyright: string;
    logo: string;
    feedback: ILink;
}