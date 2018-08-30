import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';
export declare class SingleSelectListStrategy extends SelectionStrategy {
    click(_event: MouseEvent, data: any): void;
    keydown(event: KeyboardEvent, data: any): void;
}
