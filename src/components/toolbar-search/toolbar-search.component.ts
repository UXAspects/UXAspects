import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { isPlatformServer } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, HostListener, Inject, Input, OnDestroy, Output, PLATFORM_ID, Renderer2 } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColorService } from '../../services/color/color.service';
import { ToolbarSearchButtonDirective } from './toolbar-search-button.directive';
import { ToolbarSearchFieldDirective } from './toolbar-search-field.directive';

@Component({
    selector: 'ux-toolbar-search',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('expanded', [
            state('collapsed',
                style({ width: '{{initialWidth}}' }),
                { params: { initialWidth: '30px' } }
            ),
            state('expanded', style({ width: '100%' })),
            transition('collapsed <=> expanded', [animate('0.3s ease-out')])
        ])
    ],
    host: {
        '[class.expanded]': 'expanded',
        '[class.left]': 'direction === "left"',
        '[class.right]': 'direction === "right"',
        '[class.inverse]': 'inverse',
        '[style.position]': '_position',
        '[style.background-color]': '_backgroundColor',
        '[@expanded]': '_expandedAnimation'
    }
})
export class ToolbarSearchComponent implements AfterContentInit, OnDestroy {

    /** The direction in which the search box will expand. If the search button is aligned to the right edge of the container, specify left. */
    @Input() direction: 'left' | 'right' = 'right';

    /** Whether the color scheme is inverted. For use when the component is hosted on a dark background, e.g. the masthead. */
    @Input() inverse = false;

    /** Indicate whether or not the search field should always be expanded */
    @Input() alwaysExpanded: boolean = false;

    /** Whether the input field is visible. Use this to collapse or expand the control in response to other events. */
    @Input()
    set expanded(value: boolean) {
        this._expanded = value;

        this.expandedChange.emit(this.expanded);

        if (this.expanded) {
            // Set focus on the input when expanded
            this.field.focus();
        } else {
            // Clear text when contracted
            this.field.clear();

            // Remove focus (works around an IE issue where the caret remains visible)
            this.field.blur();
        }
    }

    get expanded(): boolean {
        return this.alwaysExpanded || this._expanded;
    }

    /*
     * The background color of the component. Color names from the Color Palette can be used here.
     * Specify this when a transparent background would cause display issues, such as background items showing through the search field.
     */
    @Input()
    set background(value: string) {
        this._backgroundColor = this._colorService.resolve(value) || 'transparent';
    }

    /** Emitted when the expanded state changes */
    @Output() expandedChange = new EventEmitter<boolean>();

    /**
     * Emitted when a search query has been submitted, either by pressing enter when the search field has focus, or by clicking the search button
     * when the search field contains text. The event contains the search text.
     */
    @Output() search = new EventEmitter<string>();

    /** Return the correct animation based on the expanded state */
    get _expandedAnimation(): any {
        return {
            value: this.expanded ? 'expanded' : 'collapsed',
            params: {
                initialWidth: this.button.width + 'px'
            }
        };
    }

    /** Access the input field element */
    @ContentChild(ToolbarSearchFieldDirective) field: ToolbarSearchFieldDirective;

    /** Access the search button element */
    @ContentChild(ToolbarSearchButtonDirective) button: ToolbarSearchButtonDirective;

    /** Store the CSS position value as this may change to absolute */
    _position: string = 'relative';

    /** Store the active background color */
    _backgroundColor: string = 'transparent';

    /** Store the expanded state */
    private _expanded: boolean = false;

    /** Store the programmatically created placeholder element */
    private _placeholder: HTMLElement;

    /** Unsubscribe from all subscriptions on component destroy */
    private _onDestroy = new Subject<void>();

    constructor(
        private _elementRef: ElementRef,
        private _colorService: ColorService,
        private _renderer: Renderer2,
        @Inject(PLATFORM_ID) private _platformId: Object
    ) { }

    ngAfterContentInit(): void {
        // Subscribe to the submit event on the input field, triggering the search event
        this.field.submit.pipe(takeUntil(this._onDestroy)).subscribe((text: string) => this.search.emit(text));

        // Subscribe to cancel events coming from the input field
        this.field.cancel.pipe(takeUntil(this._onDestroy)).subscribe(() => this.expanded = false);

        // Subscribe to the button click event
        this.button.clicked.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.expanded && this.field.text ? this.search.emit(this.field.text) : this.expanded = !this.expanded;
        });

        // Create placeholder element to avoid changing layout when switching to position: absolute
        // If the platform is a server we dont want to do this as we can't access getComputedStyle
        if (!isPlatformServer(this._platformId)) {
            this.createPlaceholder();
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();

        /**
         * We programmatically created the placeholder node so Angular is not aware of its existence
         * so we must manually destroy it otherwise the reference will be retained
        */
        if (this._placeholder) {
            this._renderer.destroyNode(this._placeholder);
        }
    }

    @HostListener('@expanded.start', ['$event'])
    animationStart(event: AnimationEvent): void {
        if (event.toState === 'expanded') {
            this._position = 'absolute';
            this.setPlaceholderVisible(true);
        }
    }

    @HostListener('@expanded.done', ['$event'])
    animationDone(event: AnimationEvent): void {
        if (event.toState === 'collapsed') {
            this._position = 'relative';
            this.setPlaceholderVisible(false);
        }
    }

    /** Programmatically create a placeholder element */
    private createPlaceholder(): void {

        // Get width and height of the component
        const styles = getComputedStyle(this._elementRef.nativeElement);

        // Create invisible div with the same dimensions
        this._placeholder = this._renderer.createElement('div');
        this._renderer.setStyle(this._placeholder, 'display', 'none');
        this._renderer.setStyle(this._placeholder, 'width', this.button.width + 'px');
        this._renderer.setStyle(this._placeholder, 'height', styles.height);
        this._renderer.setStyle(this._placeholder, 'visibility', 'hidden');

        // Add as a sibling
        this._renderer.insertBefore(this._elementRef.nativeElement.parentNode, this._placeholder, this._elementRef.nativeElement);
    }

    /** Update the visibility of the placeholder node */
    private setPlaceholderVisible(isVisible: boolean): void {
        this._renderer.setStyle(this._placeholder, 'display', isVisible ? 'inline-block' : 'none');
    }
}
