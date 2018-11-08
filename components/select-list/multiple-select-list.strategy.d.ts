import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
export declare class MultipleSelectListStrategy<T> extends SelectionStrategy<T> {
    private _lastSelection;
    /** Prevent the browser from highlighting text on shift click */
    mousedown(event: MouseEvent): void;
    click(event: MouseEvent, data: T): void;
    keydown(event: KeyboardEvent, data: T): void;
    multipleSelect(data: T): void;
    private getSelectedItems(start, end);
}
