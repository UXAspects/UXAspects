import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, Output } from '@angular/core';
import { ColorService } from '../../services/color/color.service';
import { ToolbarSearchButtonDirective } from './toolbar-search-button.directive';
import { ToolbarSearchFieldDirective } from './toolbar-search-field.directive';


@Component({
    selector: 'ux-toolbar-search',
    template: `<ng-content></ng-content>`,
    animations: [
        trigger('expanded', [
            state(
                'collapsed',
                style({
                    width: '{{initialWidth}}'
                }),
                {
                    params: { initialWidth: '30px' }
                }
            ),
            state(
                'expanded',
                style({
                    width: '100%'
                })
            ),
            transition('collapsed <=> expanded', [animate('0.3s ease-out')])
        ])
    ]
})
export class ToolbarSearchComponent implements AfterContentInit {

    @HostBinding('class.expanded')
    @Input()
    get expanded(): boolean {
        return this._expanded;
    }

    set expanded(value: boolean) {
        this._expanded = value;

        this.expandedChange.emit(value);

        if (value) {
            // Set focus on the input when expanded
            this.field.focus();
        } else {
            // Clear text when contracted
            this.field.clear();

            // Remove focus (works around an IE issue where the caret remains visible)
            this.field.blur();
        }
    }

    @Input()
    @HostBinding('class')
    direction: 'left' | 'right' = 'right';

    @Input()
    @HostBinding('class.inverse')
    inverse = false;

    @Input()
    set background(value: string) {
        this.backgroundColor = this._colorService.resolve(value) || 'transparent';
    }

    @Output()
    expandedChange = new EventEmitter<boolean>();

    @Output()
    search = new EventEmitter<string>();

    private _expanded: boolean = false;

    @HostBinding('@expanded')
    get expandedAnimation(): any {
        return {
            value: this.expanded ? 'expanded' : 'collapsed',
            params: {
                initialWidth: this.button.width + 'px'
            }
        };
    }

    @HostBinding('style.position') position = 'relative';
    @HostBinding('style.background-color') backgroundColor = 'transparent';
    @ContentChild(ToolbarSearchFieldDirective) field: ToolbarSearchFieldDirective;
    @ContentChild(ToolbarSearchButtonDirective) button: ToolbarSearchButtonDirective;

    private _placeholder: HTMLElement;

    constructor(
        private _elementRef: ElementRef,
        private _colorService: ColorService,
        @Inject(DOCUMENT) private _document: any) {
    }

    ngAfterContentInit() {
        // Subscribe to the submit event on the input field, triggering the search event
        this.field.submit.subscribe((text: string) => this.search.emit(text));

        // Subscribe to cancel events coming from the input field
        this.field.cancel.subscribe(() => this.expanded = false);

        // Subscribe to the button click event
        this.button.clicked.subscribe(() => {
            if (this.expanded && this.field.text) {
                this.search.emit(this.field.text);
            } else {
                this.expanded = !this.expanded;
            }
        });

        // Create placeholder element to avoid changing layout when switching to position: absolute
        this.createPlaceholder();
    }

    @HostListener('@expanded.start', ['$event'])
    animationStart(event: AnimationEvent) {
        if (event.toState === 'expanded') {
            this.position = 'absolute';
            this.enablePlaceholder(true);
        }
    }

    @HostListener('@expanded.done', ['$event'])
    animationDone(event: AnimationEvent) {
        if (event.toState === 'collapsed') {
            this.position = 'relative';
            this.enablePlaceholder(false);
        }
    }

    private createPlaceholder() {
        // Get width and height of the component
        const styles = getComputedStyle(this._elementRef.nativeElement);

        // Create invisible div with the same dimensions
        this._placeholder = this._document.createElement('div');
        this._placeholder.style.display = 'none';
        this._placeholder.style.width = this.button.width + 'px';
        this._placeholder.style.height = styles.height;
        this._placeholder.style.visibility = 'hidden';

        // Add as a sibling
        this._elementRef.nativeElement.parentNode.insertBefore(this._placeholder, this._elementRef.nativeElement);
    }

    private enablePlaceholder(enabled: boolean) {
        this._placeholder.style.display = (enabled ? 'inline-block' : 'none');
    }
}
