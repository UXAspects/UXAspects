export interface TypeaheadVisibleOption<T = any> {
    value: T;
    key: string;
    isDisabled: boolean;
    isRecentOption?: boolean;
}
