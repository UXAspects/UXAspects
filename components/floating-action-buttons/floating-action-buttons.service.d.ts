import { QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FloatingActionButtonComponent } from './floating-action-button.component';
export declare class FloatingActionButtonsService {
    open$: BehaviorSubject<boolean>;
    direction$: BehaviorSubject<"top" | "right" | "bottom" | "left">;
    private _buttons;
    open(): void;
    toggle(): void;
    close(): void;
    isHorizontal(): boolean;
    isVertical(): boolean;
    setButtons(buttons: QueryList<FloatingActionButtonComponent>): void;
    /** Make only the first button tabbable */
    setPrimaryButtonFocusable(): void;
    focusPrimaryButton(): void;
    focus(button: FloatingActionButtonComponent): void;
    focusSibling(next: boolean): void;
    private getFocusedButton();
    private getButtonIndex(button);
}
export declare type FloatingActionButtonDirection = 'top' | 'right' | 'bottom' | 'left';
