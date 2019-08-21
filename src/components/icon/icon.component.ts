import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
// tslint:disable-next-line: import-blacklist
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { IconService } from './icon.service';
import { IconDefinition } from './iconsets/iconset.interface';

@Component({
    selector: 'ux-icon',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[style.font-size]': 'size',
        '[class.ux-flip-horizontal]': 'flipHorizontal',
        '[class.ux-flip-vertical]': 'flipVertical',
        '[class.ux-rotate-90]': 'rotate == 90',
        '[class.ux-rotate-180]': 'rotate == 180',
        '[class.ux-rotate-270]': 'rotate == 270',
    }
})
export class IconComponent implements OnChanges, AfterViewInit, OnDestroy {

    /** Define the icon to display */
    @Input() name: string;

    /** Define a custom size for the icon */
    @Input() size: string;

    /** The number of degrees to rotate the icon */
    @Input() set rotate(rotation: IconRotation | any) {
        this._rotate = coerceNumberProperty(rotation) as IconRotation;
    }

    get rotate() {
        return this._rotate;
    }

    /** Define if the icon should be horizontally flipped */
    @Input() set flipHorizontal(flipHorizontal: boolean | any) {
        this._flipHorizontal = coerceBooleanProperty(flipHorizontal);
    }

    get flipHorizontal() {
        return this._flipHorizontal;
    }

    /** Define if the icon should be horizontally flipped */
    @Input() set flipVertical(flipVertical: boolean | any) {
        this._flipVertical = coerceBooleanProperty(flipVertical);
    }

    get flipVertical() {
        return this._flipVertical;
    }

    /** Store the matching icon definition */
    _icon: IconDefinition;

    /** Store the numeric value of rotation */
    private _rotate: IconRotation;

    /** Store the boolean value of flip vertical */
    private _flipVertical: boolean = false;

    /** Store the boolean value of flip horizontal */
    private _flipHorizontal: boolean = false;

    /** Automatically unsubscribe from observables */
    private readonly _onDestroy = new Subject<void>();

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _renderer: Renderer2,
        private readonly _iconService: IconService,
    ) { }

    /** When inputs change ensure we have the best icon definition */
    ngOnChanges(changes: SimpleChanges): void {

        // if the name or size changes then update the icon
        if (changes.name && changes.name.currentValue !== changes.name.previousValue ||
            changes.size && changes.size.currentValue !== changes.size.previousValue) {
            this.updateIcon();
        }
    }

    /** Watch for changes to the iconset */
    ngAfterViewInit(): void {
        // watch for changes to the iconset to check if we need to update.
        this._iconService.iconsChanged$.pipe(
            filter(event => this._icon && event.name === this._icon.name),
            takeUntil(this._onDestroy)
        ).subscribe(() => this.updateIcon());
    }

    /** Cleanup on component destroy */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** get the icon definition based on the name and size specified */
    updateIcon(): void {

        // remove the current icon set and icon classes of the old icon.
        // note we are using the renderer and not HostBindings as a HostBinding
        // on the `class` property will override any user added classes which is
        // not desirable.
        if (this._icon) {
            this._renderer.removeClass(this._elementRef.nativeElement, this._icon.iconset);
            this._renderer.removeClass(this._elementRef.nativeElement, this._icon.icon);
        }

        // update the stored icon definition with the best match based on name and size
        this._icon = this._iconService.getIcon(this.name, this.size);

        // add the new icon classes, again using the renderer to avoid overriding user classes
        if (this._icon) {
            this._renderer.addClass(this._elementRef.nativeElement, this._icon.iconset);
            this._renderer.addClass(this._elementRef.nativeElement, this._icon.icon);
        } else if (!!this.name) {
            console.warn(`The icon ${this.name} could not be found. Ensure you are using the correct iconset.`);
        }
    }
}


export type IconRotation = 90 | 180 | 270;