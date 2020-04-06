import { AfterContentChecked, Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ColorService } from './../../services/color/color.service';
import { ThemeColor } from './../../services/color/theme-color';
import { ContrastService } from './../accessibility/contrast-ratio/contrast.service';

export type BadgeVerticalPosition = 'above' | 'below' | 'top' | 'bottom';

export type BadgeHorizontalPosition = 'before' | 'after' | 'left' | 'right';

export type BadgeSize = 'small' | 'medium' | 'large';

@Directive({
    selector: '[uxBadge]',
    exportAs: 'ux-badge',
    host: {
        class: 'ux-badge-container',
        '[class.ux-badge-small]': '_badgeSize === "small"',
        '[class.ux-badge-medium]': '_badgeSize === "medium"',
        '[class.ux-badge-large]': '_badgeSize === "large"',
        '[class.ux-badge-inline]': 'badgeInline',
        '[class.ux-badge-above]': '!badgeInline && _isAbove()',
        '[class.ux-badge-below]': '!badgeInline && !_isAbove()',
        '[class.ux-badge-after]': '!badgeInline && _isAfter()',
        '[class.ux-badge-before]': '!badgeInline && !_isAfter()',
        '[class.ux-badge-hidden]': 'badgeHidden'
    }
})
export class BadgeDirective implements OnChanges, OnDestroy, AfterContentChecked {
    private readonly _className = 'ux-badge';
    private readonly _darkColor: ThemeColor = ThemeColor.parse('#000');
    private readonly _lightColor: ThemeColor = ThemeColor.parse('#FFF');
    private readonly _noOverlapOffset: number = 2;
    private _badgeElement: HTMLElement | undefined;
    private _isNumber: boolean;
    private _truncatedText: boolean = false;

    /**
     * Directive parameter that sets the content of the badge
     */
    private _displayText: string;

    @Input('uxBadge')
    get badgeContent(): string {
        return this._badgeContent;
    }
    set badgeContent(s: string) {
        const subject = s.toString().trim();
        this._isNumber = /^\d+$/.test(subject);
        this._badgeContent = subject;
    }
    private _badgeContent: string;

    /**
     * Define the badge background color
     */
    private readonly _defaultBackgroundColor: ThemeColor = this._darkColor;

    @Input()
    get badgeColor(): string {
        return this._badgeColor.toHex();
    }
    set badgeColor(color: string) {
        this._badgeColor = ThemeColor.parse(
            this._colorService.resolve(color)
        );
    }
    private _badgeColor: ThemeColor = this._defaultBackgroundColor;

    /**
     * Aria description value for accessibility devices
     */
    @Input() badgeAriaLabel: string;

    /**
     * Set the badge vertical position in relation to the parent element
     */
    private _defaultVerticalPosition: BadgeVerticalPosition = 'above';

    @Input()
    get badgeVerticalPosition(): string {
        return this._badgeVerticalPosition;
    }
    set badgeVerticalPosition(position: string) {
        this._badgeVerticalPosition =
            (position.toLowerCase() as BadgeVerticalPosition) ||
            this._defaultVerticalPosition;
    }
    private _badgeVerticalPosition: BadgeVerticalPosition = this._defaultVerticalPosition;

    /**
     * Set the badge horizontal position in relation to the parent element
     */
    private _defaultHorizontalPosition: BadgeHorizontalPosition = 'after';

    @Input()
    get badgeHorizontalPosition(): string {
        return this._badgeHorizontalPosition;
    }
    set badgeHorizontalPosition(position: string) {
        this._badgeHorizontalPosition =
            (position.toLowerCase() as BadgeHorizontalPosition) ||
            this._defaultHorizontalPosition;
    }
    private _badgeHorizontalPosition: BadgeHorizontalPosition = this._defaultHorizontalPosition;

    /**
     * Set if the badge overlaps parent content or flows after parent
     */
    @Input() badgeOverlap: boolean = false;

    /**
     * Max value that can be displayed - if string measures no. of characters,
     * if number checks against exact number not no. of characters
     */
    @Input() badgeMaxValue: number;

    /**
     * Badge size (based on CSS styles)
     */
    private _defaultBadgeSize: BadgeSize = 'medium';

    @Input()
    get badgeSize(): string {
        return this._badgeSize;
    }
    set badgeSize(size: string) {
        this._badgeSize = (size.toLowerCase() as BadgeSize) || this._defaultBadgeSize;
    }
    private _badgeSize: BadgeSize = this._defaultBadgeSize;

    /**
     * Inline setting (overrides position parameters)
     */
    @Input() badgeInline: boolean = false;

    /**
     * Hide badge from view
     */
    @Input() badgeHidden: boolean = false;

    constructor(
        private readonly _element: ElementRef<HTMLElement>,
        private readonly _renderer: Renderer2,
        private readonly _colorService: ColorService,
        private readonly _contrastService: ContrastService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        // get display friendly version of text based on max length and type of val;
        if (changes.badgeContent) {
            let finalText: string = changes.badgeContent.currentValue || null;

            if (finalText && this.badgeMaxValue) {
                if (
                    this._isNumber &&
                    changes.badgeContent.currentValue > this.badgeMaxValue
                ) {
                    finalText = `${this.badgeMaxValue}+`;
                } else if (
                    changes.badgeContent.currentValue.length > this.badgeMaxValue
                ) {
                    this._truncatedText = true;
                    finalText = `${changes.badgeContent.currentValue.substr(
                        0,
                        this.badgeMaxValue - 1
                    )}&hellip;`;
                } else {
                    this._truncatedText = false;
                }
            }

            this._displayText = finalText;
        }

        // if text is only set, set aria label from it
        if (changes.badgeContent && !this.badgeAriaLabel) {
            this.badgeAriaLabel = changes.badgeContent.currentValue;
        }

        this.updateBadge();
    }

    ngOnDestroy(): void {
        if (this._renderer.destroyNode) {
            this._renderer.destroyNode(this._badgeElement);
        }
    }

    ngAfterContentChecked(): void {
        if (!this.badgeInline) {
            this._setXPos();
        }
    }

    private updateBadge(): HTMLElement {
        const badgeElement: HTMLSpanElement = this._renderer.createElement(
            'span'
        );
        this._clearExisting();

        badgeElement.classList.add(this._className);
        badgeElement.classList.add('hidden');

        badgeElement.innerHTML = this._displayText;
        badgeElement.style.setProperty('color', this._determineContentTextColor().toHex());

        if (this.badgeAriaLabel) {
            badgeElement.setAttribute('aria-label', this.badgeAriaLabel);
        }

        if (this._truncatedText) {
            badgeElement.setAttribute('title', this._badgeContent);
        }

        if (this._badgeColor) {
            badgeElement.style.setProperty(
                'background',
                this._badgeColor.toHex()
            );
        }

        this._badgeElement = badgeElement;
        this._renderer.appendChild(
            this._element.nativeElement,
            this._badgeElement
        );

        badgeElement.classList.remove('hidden');

        return this._badgeElement;
    }

    private _setXPos(): void {
        const badgeWidth = this._badgeElement.getBoundingClientRect().width;

        let cssPosition: string;
        const xPos: number = Math.round(this.badgeOverlap
            ? (badgeWidth / 2)
            : badgeWidth + this._noOverlapOffset);

        switch (this._badgeHorizontalPosition) {
            case 'before':
            case 'left':
                cssPosition = 'left';
                break;

            default:
            case 'after':
            case 'right':
                cssPosition = 'right';
                break;
        }

        this._badgeElement.style.setProperty(cssPosition, `-${xPos}px`);
    }

    private _clearExisting(): void {
        if (this._badgeElement) {
            this._element.nativeElement.removeChild(this._badgeElement);
        }
    }

    private _determineContentTextColor(): ThemeColor {
        return this._badgeColor
            ? ThemeColor.parse(
                this._contrastService
                    .getContrastColor(
                        this._badgeColor,
                        this._lightColor,
                        this._darkColor
                    )
                    .toRgba()
            )
            : this._lightColor;
    }

    private _isAbove(): boolean {
        return ['above', 'top'].indexOf(this._badgeVerticalPosition) > -1;
    }

    private _isAfter(): boolean {
        return ['after', 'right'].indexOf(this._badgeHorizontalPosition) > -1;
    }
}
