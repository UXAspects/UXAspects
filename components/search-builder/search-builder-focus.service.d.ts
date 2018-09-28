import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class SearchBuilderFocusService {
    focus$: BehaviorSubject<SearchBuilderFocus>;
    /**
     * Set focus on a search builder component.
     * @param groupId The `id` of the group containing the component.
     * @param index The (zero-based) index of the component.
     */
    setFocus(groupId: string, index: number): void;
    /**
     * Removes focus from all components. If focus is not on a search builder component, this does nothing.
     */
    clearFocus(): void;
}
export interface SearchBuilderFocus {
    groupId: string;
    index: number;
}
