import { SelectionStrategy } from './selection.strategy';
export declare class SimpleSelectionStrategy extends SelectionStrategy {
    /**
     * When the item is clicked simply toggle the current selected state
     */
    click(_event: MouseEvent, data: any): void;
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     */
    keydown(event: KeyboardEvent, data: any): void;
    /**
     * Override the standard toggle function to always activate the item
     */
    toggle(data: any): void;
}
