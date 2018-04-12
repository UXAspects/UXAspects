import { SearchBuilderGroupQuery } from './group-query.interface';
export interface SearchBuilderQuery {
    [key: string]: SearchBuilderGroupQuery[];
}
