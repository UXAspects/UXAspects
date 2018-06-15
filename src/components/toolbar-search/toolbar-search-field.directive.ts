import { Directive, ElementRef, EventEmitter, HostListener, Optional, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

const KEYS = {
    ENTER: 13,
    ESCAPE: 27
};

@Directive({
    selector: '[uxToolbarSearchField]'
})
export class ToolbarSearchFieldDirective {

    @Output()
    cancel = new EventEmitter<void>();

    @Output()
    submit = new EventEmitter<string>();

    get text(): string {
        // Use ngModel if specified on the host; otherwise read the DOM
        if (this._ngModel) {
            return this._ngModel.value;
        }

        return this._elementRef.nativeElement.value;
    }

    constructor(
        private _elementRef: ElementRef,
        @Optional() private _ngModel: NgModel) { }

    focus() {
        setTimeout(() => {
            this._elementRef.nativeElement.focus();
        });
    }

    blur() {
        setTimeout(() => {
            this._elementRef.nativeElement.blur();
        });
    }

    clear() {
        // Use ngModel if specified on the host; otherwise use the DOM
        if (this._ngModel) {
            this._ngModel.reset();
        } else {
            this._elementRef.nativeElement.value = '';
        }
    }

    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent) {
        setTimeout(() => {
            if (event.keyCode === KEYS.ENTER) {
                this.submit.emit(this.text);
            } else if (event.keyCode === KEYS.ESCAPE) {
                this._elementRef.nativeElement.blur();
                this.cancel.emit();
            }
        });
    }
}
