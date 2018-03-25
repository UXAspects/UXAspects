import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[uxToolbarSearchField]',
    host: {
        'class': 'form-control'
    }
})
export class ToolbarSearchFieldDirective {

    @Output()
    cancel = new EventEmitter<void>();

    @Output()
    submit = new EventEmitter<string>();

    get text(): string {
        return this._elementRef.nativeElement.value;
    }

    set text(value: string) {
        this._elementRef.nativeElement.value = value;
    }

    constructor(private _elementRef: ElementRef) { }

    focus() {
        setTimeout(() => {
            this._elementRef.nativeElement.focus();
        });
    }

    @HostListener('keydown', ['$event'])
    escape(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            this.cancel.emit();
        } else if (event.key === 'Enter') {
            this.submit.emit(this.text);
        }
    }
}
