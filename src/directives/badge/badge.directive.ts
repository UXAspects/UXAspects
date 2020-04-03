import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ColorService } from './../../services/color/color.service';
import { ThemeColor } from './../../services/color/theme-color';
import { ContrastService } from './../accessibility/contrast-ratio/contrast.service';

export type BadgeVerticalPosition = 'above' | 'below' | 'top' | 'bottom';

export type BadgeHorizontalPosition = 'before' | 'after' | 'left' | 'right';

export type BadgeSize = 'small' | 'medium' | 'large';

@Directive({
    selector: '[uxBadge]',
    host: {
        class: 'ux-badge-container',
        '[class.ux-badge-small]': '_size === "small"',
        '[class.ux-badge-medium]': '_size === "medium"',
        '[class.ux-badge-large]': '_size === "large"',
        '[class.ux-badge-inline]': 'inline',
        '[class.ux-badge-above]': '_isAbove() && !inline',
        '[class.ux-badge-below]': '!_isAbove() && !inline',
        '[class.ux-badge-hidden]': 'hidden'
    }
})
export class BadgeDirective implements OnChanges, OnDestroy {
    private readonly _class = 'ux-badge';
    private readonly _darkColor: ThemeColor = ThemeColor.parse('#000');
    private readonly _lightColor: ThemeColor = ThemeColor.parse('#FFF');
    private readonly _noOverlapOffset: number = 2;

    /**
     * Directive parameter that sets the content of the badge
     */
    private _displayText: string;
    private _isNumber: boolean;
    private _truncatedText: boolean = false;

    @Input('uxBadge')
    get content(): string {
        return this._content;
    }
    set content(s: string) {
        const subject = s.toString().trim();
        this._isNumber = /^\d+$/.test(subject);
        this._content = subject;
    }
    private _content: string;

    /**
     * Define the badge background color
     */
    private readonly _defaultBackgroundColor: ThemeColor = this._darkColor;

    @Input('badgeBackgroundColor')
    get backgroundColor(): string {
        return this._backgroundColor.toHex();
    }
    set backgroundColor(color: string) {
        this._backgroundColor = ThemeColor.parse(
            this._colorService.resolve(color)
        );
    }
    private _backgroundColor: ThemeColor = this._defaultBackgroundColor;

    /**
     * Define the badge text color
     */
    @Input('badgeTextColor')
    get textColor(): string {
        return this._textColor.toHex();
    }
    set textColor(color: string) {
        this._textColor = color
            ? ThemeColor.parse(this._colorService.resolve(color))
            : this._determineContrastColor();
    }
    private _textColor: ThemeColor = ThemeColor.parse('#fff');

    /**
     * Aria description value for accessibility devices
     */
    @Input('badgeAriaLabel') ariaLabel: string;

    /**
     * Set the badge vertical position in relation to the parent element
     */
    private _defaultVPos: BadgeVerticalPosition = 'above';

    @Input('badgeVerticalPosition')
    get vPos(): string {
        return this._vPos;
    }
    set vPos(position: string) {
        this._vPos =
            (position.toLowerCase() as BadgeVerticalPosition) ||
            this._defaultVPos;
    }
    private _vPos: BadgeVerticalPosition = this._defaultVPos;

    /**
     * Set the badge horizontal position in relation to the parent element
     */
    private _defaultHPos: BadgeHorizontalPosition = 'after';

    @Input('badgeHorizontalPosition')
    get hPos(): string {
        return this._hPos;
    }
    set hPos(position: string) {
        this._hPos =
            (position.toLowerCase() as BadgeHorizontalPosition) ||
            this._defaultHPos;
    }
    private _hPos: BadgeHorizontalPosition = this._defaultHPos;

    /**
     * Set if the badge overlaps parent content or flows after parent
     */
    @Input('badgeOverlap') overlap: boolean = false;

    /**
     * Max value that can be displayed - if string measures no. of characters,
     * if number checks against exact number not no. of characters
     */
    @Input('badgeMaxValue') maxValue: number;

    /**
     * Badge size (based on CSS styles)
     */
    private _defaultSize: BadgeSize = 'medium';

    @Input('badgeSize')
    get size(): string {
        return this._size;
    }
    set size(size: string) {
        this._size = (size.toLowerCase() as BadgeSize) || this._defaultSize;
    }
    private _size: BadgeSize = this._defaultSize;

    /**
     * Inline setting (overrides position parameters)
     */
    @Input('badgeInline') inline: boolean = false;

    /**
     * Hide badge from view
     */
    @Input('badgeHidden') hidden: boolean = false;

    private _badgeElement: HTMLElement | undefined;

    constructor(
        private readonly _element: ElementRef,
        private readonly _renderer: Renderer2,
        private readonly _colorService: ColorService,
        private readonly _contrastService: ContrastService
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        // get display friendly version of text based on max length and type of val;
        if (changes.content) {
            let finalText: string = changes.content.currentValue || null;

            if (finalText && this.maxValue) {
                if (
                    this._isNumber &&
                    changes.content.currentValue > this.maxValue
                ) {
                    finalText = `${this.maxValue}+`;
                } else if (
                    changes.content.currentValue.length > this.maxValue
                ) {
                    this._truncatedText = true;
                    finalText = `${changes.content.currentValue.substr(
                        0,
                        this.maxValue - 1
                    )}&hellip;`;
                } else {
                    this._truncatedText = false;
                }
            }

            this._displayText = finalText;
        }

        // if text is only set, set aria label from it
        if (changes.content && !this.ariaLabel) {
            this.ariaLabel = changes.content.currentValue;
        }

        // force update to text color if background color changes and text color not explicitly set
        if (changes.backgroundColor && this._textColor !== this._lightColor) {
            this.textColor = this._textColor.toHex();
        }

        this.updateBadge();
    }

    ngOnDestroy(): void {
        if (this._renderer.destroyNode) {
            this._renderer.destroyNode(this._badgeElement);
        }
    }

    private updateBadge(): HTMLElement {
        const badgeElement: HTMLSpanElement = this._renderer.createElement(
            'span'
        );
        this.clearExisting(this._class);

        badgeElement.classList.add(this._class);
        badgeElement.classList.add('hidden');

        badgeElement.innerHTML = this._displayText;
        badgeElement.style.setProperty('color', this._textColor.toHex());

        if (this.ariaLabel) {
            badgeElement.setAttribute('aria-label', this.ariaLabel);
        }

        if (this._truncatedText) {
            badgeElement.setAttribute('title', this._content);
        }

        if (this._backgroundColor) {
            badgeElement.style.setProperty(
                'background',
                this._backgroundColor.toHex()
            );
        }

        this._badgeElement = badgeElement;
        this._renderer.appendChild(
            this._element.nativeElement,
            this._badgeElement
        );

        if (!this.inline) {
            const badgeWidth = this._badgeElement.offsetWidth;

            if (badgeWidth) {
                const xPos = this.overlap
                    ? badgeWidth / 2
                    : badgeWidth + this._noOverlapOffset;

                this._badgeElement.style.setProperty('right', `-${xPos}px`);
            }
        }

        badgeElement.classList.remove('hidden');

        return this._badgeElement;
    }

    private clearExisting(className: string): void {
        const parentElement: HTMLElement = this._element.nativeElement;
        let count: number = parentElement.children.length;

        while (count--) {
            const current = parentElement.children[count];

            if (current.classList.contains(className)) {
                parentElement.removeChild(current);
            }
        }
    }

    private _determineContrastColor(): ThemeColor {
        return this._backgroundColor
            ? ThemeColor.parse(
                this._contrastService
                    .getContrastColor(
                        this._backgroundColor,
                        this._lightColor,
                        this._darkColor
                    )
                    .toRgba()
            )
            : this._lightColor;
    }

    private _isAbove(): boolean {
        return ['above', 'top'].indexOf(this._vPos) > -1;
    }
}
