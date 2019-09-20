import { Directive, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[uxFloatLabel]',
    host: {
        'class': 'ux-float-label'
    }
})
export class FloatLabelDirective<T = string> implements OnInit, OnChanges, OnDestroy {

    @Input('uxFloatLabel')
    set input(input: HTMLInputElement) {

        // remove any previous autofill subscriptions
        if (this._input) {
            this._autofillMonitor.stopMonitoring(this._input);
        }

        this._subscription.unsubscribe();

        this._input = input;

        // if the input is null then don't need to subscribe to autofillMonitor
        if (!input) {
            return;
        }

        // create a new autofillMonitor subscription
        this._subscription = this._autofillMonitor.monitor(input).subscribe(event => {
            if (!this.raised && event.isAutofilled) {
                this.raised = true;
            }
            if (this.raised && !event.isAutofilled) {
                this.raised = false;
            }
        });
    }

    get input(): HTMLInputElement {
        return this._input;
    }

    @Input()
    value: T;

    @Input()
    mode: 'focus' | 'input' = 'focus';

    @HostBinding('class.ux-float-label-raised')
    raised: boolean = false;


    private _input: HTMLInputElement;
    private _focused = false;
    private _eventHandles: any[] = [];
    private _subscription = new Subscription();

    constructor(private _elementRef: ElementRef,
                private _renderer: Renderer2,
                private _autofillMonitor: AutofillMonitor) {}

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
        this._autofillMonitor.stopMonitoring(this._input);
        this._subscription.unsubscribe();
    }

    private hasText(): boolean {
        if (this.value === undefined) {
            return !!this.input.value;
        }
        return !!this.value;
    }

    private inputFocus(): void {
        if (this.mode === 'focus') {
            this._focused = true;
            this.raised = true;
        }
    }

    private inputBlur(): void {
        if (this.mode === 'focus') {
            this._focused = false;
            this.raised = this.hasText();
        }
    }

    private inputChange(): void {
        if (this.mode === 'input') {
            this.raised = this.hasText();
        }
    }
}