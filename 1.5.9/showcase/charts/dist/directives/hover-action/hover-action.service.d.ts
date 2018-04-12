import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HoverActionDirective } from './hover-action.directive';
import { HoverActionContainerDirective } from './hover-action-container.directive';
export declare class HoverActionService {
    active: BehaviorSubject<boolean>;
    private _container;
    private _focused;
    private _hovered;
    private _actions;
    register(action: HoverActionDirective): void;
    unregister(action: HoverActionDirective): void;
    setContainer(container: HoverActionContainerDirective): void;
    setFocusState(focus: boolean): void;
    setHoverState(hover: boolean): void;
    next(): void;
    previous(): void;
    updateVisibility(): void;
    private focusActionAtIndex(index);
    private getFocusedActionIndex();
    private containerHasFocus();
    private actionHasFocus();
    private getFocusedAction();
}
