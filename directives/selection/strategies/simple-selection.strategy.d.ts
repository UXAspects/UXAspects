import { SelectionStrategy } from './selection.strategy';
export declare class SimpleSelectionStrategy<T> extends SelectionStrategy<T> {
    /**
     * When the item is clicked simply toggle the current selected state
     */
    click(_event: MouseEvent, data: T): void;
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     */
    keydown(event: KeyboardEvent, data: T): void;
    /**
     * Override the standard toggle function to always activate the item
     */
    toggle(data: T): void;
}
