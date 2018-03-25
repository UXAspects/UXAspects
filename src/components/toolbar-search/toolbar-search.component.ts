import {
    Component,
    ContentChild,
    AfterContentInit,
    HostBinding,
    HostListener,
    EventEmitter,
    Output,
    Inject,
    ElementRef,
    Input
} from '@angular/core';
import {
    AnimationEvent,
    trigger,
    transition,
    query,
    style,
    animate,
    state
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';

import { ToolbarSearchFieldDirective } from './toolbar-search-field.directive';
import { ToolbarSearchButtonDirective } from './toolbar-search-button.directive';

@Component({
    selector: 'ux-toolbar-search',
    template: `<ng-content></ng-content>`,
    animations: [
        trigger('expanded', [
            state(
                'false',
                style({
                    width: '{{initialWidth}}'
                }),
                {
                    params: { initialWidth: '30px' }
                }
            ),
            state(
                'true',
                style({
                    width: '100%'
                })
            ),
            transition('false <=> true', [animate('0.3s ease-out')])
        ])
    ]
})
export class ToolbarSearchComponent implements AfterContentInit {

    @HostBinding('class.expanded')
    get expanded(): boolean {
        return this._expanded;
    }

    set expanded(value: boolean) {
        this._expanded = value;

        if (value) {
            // Set focus on the input when expanded
            this._field.focus();
        } else {
            // Clear text when contracted
            this._field.text = '';
        }
    }

    @Input()
    @HostBinding('class')
    direction: 'left' | 'right' = 'right';

    @Input()
    @HostBinding('class.inverse')
    inverse = false;

    @Output() search = new EventEmitter<string>();

    private _expanded: boolean = false;

    @HostBinding('@expanded')
    private get _expandedAnimation(): any {
        return {
            value: this.expanded,
            params: {
                initialWidth: this._button.width
            }
        };
    }

    @HostBinding('style.position')
    private _position = 'relative';

    @ContentChild(ToolbarSearchFieldDirective)
    private _field: ToolbarSearchFieldDirective;

    @ContentChild(ToolbarSearchButtonDirective)
    private _button: ToolbarSearchButtonDirective;

    private _placeholder: HTMLElement;

    private _document: Document;

    constructor(
        private _elementRef: ElementRef,
        @Inject(DOCUMENT) document: any) {
        this._document = <Document>document;
    }

    ngAfterContentInit() {

        // Subscribe to the submit event on the input field, triggering the search event
        this._field.submit.subscribe(text => this.search.emit(text));

        // Subscribe to cancel events coming from the input field
        this._field.cancel.subscribe(() => (this.expanded = false));

        // Subscribe to the button click event
        this._button.clicked.subscribe(() => {
            if (this.expanded && this._field.text) {
                this.search.emit(this._field.text);
            } else {
                this.expanded = !this.expanded;
            }
        });

        // Create placeholder element to avoid changing layout when switching to position: absolute
        this.createPlaceholder();
    }

    @HostListener('@expanded.start', ['$event'])
    animationStart(event: AnimationEvent) {
        if (event.toState.toString() === 'true') {
            this._position = 'absolute';
            this.enablePlaceholder(true);
        }
    }

    @HostListener('@expanded.done', ['$event'])
    animationDone(event: AnimationEvent) {
        if (event.toState.toString() === 'false') {
            this._position = 'relative';
            this.enablePlaceholder(false);
        }
    }

    private createPlaceholder() {

        // Get width and height of the component
        const styles = getComputedStyle(this._elementRef.nativeElement);

        // Create invisible div with the same dimensions
        this._placeholder = this._document.createElement('div');
        this._placeholder.style.display = 'none';
        this._placeholder.style.width = this._button.width;
        this._placeholder.style.height = styles.height;
        this._placeholder.style.visibility = 'hidden';

        // Add as a sibling
        this._elementRef.nativeElement.parentNode.insertBefore(this._placeholder, this._elementRef.nativeElement);
    }

    private enablePlaceholder(enabled: boolean) {
        this._placeholder.style.display = (enabled ? 'inline-block' : 'none');
    }
}
