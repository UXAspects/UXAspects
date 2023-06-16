export interface TypeaheadVisibleOption<T = unknown> {
    value: T;
    key: string;
    isRecentOption?: boolean;
}
