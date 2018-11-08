import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
export declare class SingleSelectListStrategy<T> extends SelectionStrategy<T> {
    click(_event: MouseEvent, data: T): void;
    keydown(event: KeyboardEvent, data: T): void;
}
