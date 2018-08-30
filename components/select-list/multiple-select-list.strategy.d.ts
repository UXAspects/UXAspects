import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
export declare class MultipleSelectListStrategy extends SelectionStrategy {
    private _lastSelection;
    /** Prevent the browser from highlighting text on shift click */
    mousedown(event: MouseEvent): void;
    click(event: MouseEvent, data: any): void;
    keydown(event: KeyboardEvent, data: any): void;
    multipleSelect(data: any): void;
    private getSelectedItems(start, end);
}
