import { TypeaheadOptionApi } from './typeahead-option-api';

export interface TypeaheadOptionContext<T> {
    option: T;
    api: TypeaheadOptionApi<T>;
}
