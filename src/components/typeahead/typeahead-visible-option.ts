export interface TypeaheadVisibleOption<T = any> {
    value: T;
    key: string;
    isRecentOption?: boolean;
}
