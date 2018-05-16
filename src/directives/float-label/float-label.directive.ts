import { Directive, Input, OnInit, TemplateRef, Renderer2, OnDestroy, HostBinding, OnChanges, ElementRef } from '@angular/core';

@Directive({
    selector: '[uxFloatLabel]',
    host: {
        'class': 'ux-float-label'
    }
})
export class FloatLabelDirective implements OnInit, OnChanges, OnDestroy {

    @Input('uxFloatLabel')
    input: HTMLInputElement;

    @Input()
    value: any;

    @Input()
    mode: 'focus' | 'input' = 'focus';

    @HostBinding('class.ux-float-label-raised')
    raised: boolean = false;


    private _focused = false;
    private _eventHandles: any[] = [];

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { }

    ngOnInit(): void {
        this._eventHandles.push(
            this._renderer.listen(this.input, 'focus', this.inputFocus.bind(this)),
            this._renderer.listen(this.input, 'blur', this.inputBlur.bind(this)),
            this._renderer.listen(this.input, 'input', this.inputChange.bind(this))
        );

        // Check initial input value
        this.raised = this.hasText();

        // Ensure that the `for` attribute is set
        if (!this._elementRef.nativeElement.getAttribute('for') && this.input.getAttribute('id')) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'for', this.input.getAttribute('id'));
        }
    }

    ngOnChanges(): void {
        if (!(this.mode === 'focus' && this._focused)) {
            this.raised = this.hasText();
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe event handles
        this._eventHandles.forEach((eventHandle) => eventHandle());
    }

    private hasText(): boolean {
        if (this.value === undefined) {
            return !!this.input.value;
        }
        return !!this.value;
    }

    private inputFocus(event: Event): void {
        if (this.mode === 'focus') {
            this._focused = true;
            this.raised = true;
        }
    }

    private inputBlur(event: Event): void {
        if (this.mode === 'focus') {
            this._focused = false;
            this.raised = this.hasText();
        }
    }

    private inputChange(event: Event): void {
        if (this.mode === 'input') {
            this.raised = this.hasText();
        }
    }
}