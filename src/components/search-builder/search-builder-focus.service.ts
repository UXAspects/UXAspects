import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const UNSET_FOCUS: SearchBuilderFocus = { groupId: null, index: -1 };

@Injectable({
    providedIn: 'root'
})
export class SearchBuilderFocusService {

    focus$ = new BehaviorSubject<SearchBuilderFocus>(UNSET_FOCUS);

    /**
     * Set focus on a search builder component.
     * @param groupId The `id` of the group containing the component.
     * @param index The (zero-based) index of the component.
     */
    setFocus(groupId: string, index: number): void {
        this.focus$.next({ groupId: groupId, index: index });
    }

    /**
     * Removes focus from all components. If focus is not on a search builder component, this does nothing.
     */
    clearFocus(): void {
        this.focus$.next(UNSET_FOCUS);
    }
}

export interface SearchBuilderFocus {
    groupId: string;
    index: number;
}
