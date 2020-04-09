import {
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    Renderer2,
    SimpleChanges,
} from '@angular/core';
import { ColorService } from '../../services/color/color.service';
import { ThemeColor } from '../../services/color/theme-color';
import { ContrastService } from '../accessibility/contrast-ratio/contrast.service';

export type BadgeVerticalPosition = 'above' | 'below';

export type BadgeHorizontalPosition = 'before' | 'after';

export type BadgeSize = 'small' | 'medium' | 'large';

@Directive({
    selector: '[uxBadge]',
    exportAs: 'ux-badge',
    host: {
        class: 'ux-badge-container',
        '[class.ux-badge-small]': 'badgeSize === "small"',
        '[class.ux-badge-medium]': 'badgeSize === "medium"',
        '[class.ux-badge-large]': 'badgeSize === "large"',
        '[class.ux-badge-above]': 'badgeVerticalPosition === "above"',
        '[class.ux-badge-below]': 'badgeVerticalPosition === "below"',
        '[class.ux-badge-after]': 'badgeHorizontalPosition === "after"',
        '[class.ux-badge-before]': 'badgeHorizontalPosition === "before"',
    },
})
export class BadgeDirective implements OnChanges, OnDestroy /*, AfterContentChecked*/ {
    private readonly _className = 'ux-badge';
    private readonly _darkColor: ThemeColor = ThemeColor.parse('#000');
    private readonly _lightColor: ThemeColor = ThemeColor.parse('#FFF');
    private _badgeElement: HTMLElement | undefined;
    private _isNumber: boolean;
    private _truncatedText: boolean = false;

    /**
     * Directive parameter that sets the content of the badge
     */
    private _badgeDisplayContent: string;

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
        this._badgeColor = ThemeColor.parse(this._colorService.resolve(color));
    }
    private _badgeColor: ThemeColor = this._defaultBackgroundColor;

    /**
     * Aria description value for accessibility devices
     */
    @Input() badgeAriaDescription: string;

    /**
     * Set the badge vertical position in relation to the parent element
     */
    private _defaultVerticalPosition: BadgeVerticalPosition = 'above';

    @Input()
    private badgeVerticalPosition: BadgeVerticalPosition = this._defaultVerticalPosition;

    /**
     * Set the badge horizontal position in relation to the parent element
     */
    private _defaultHorizontalPosition: BadgeHorizontalPosition = 'after';

    @Input()
    private badgeHorizontalPosition: BadgeHorizontalPosition = this._defaultHorizontalPosition;

    /**
     * Set if the badge overlaps parent content or flows after parent
     */
    @HostBinding('class.ux-badge-overlap')
    @Input()
    badgeOverlap: boolean = false;

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
    private badgeSize: BadgeSize = this._defaultBadgeSize;

    /**
     * Hide badge from view
     */
    @HostBinding('class.ux-badge-hidden')
    @Input()
    badgeHidden: boolean = false;

    constructor(
        private readonly _element: ElementRef<HTMLElement>,
        private readonly _renderer: Renderer2,
        private readonly _colorService: ColorService,
        private readonly _contrastService: ContrastService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        // get display friendly version of text based on max length and type of val;
        if (changes.badgeContent) {
            let finalText: string = changes.badgeContent.currentValue || null;

            if (finalText && this.badgeMaxValue) {
                if (this._isNumber && changes.badgeContent.currentValue > this.badgeMaxValue) {
                    finalText = `${this.badgeMaxValue}+`;
                } else if (changes.badgeContent.currentValue.length > this.badgeMaxValue) {
                    this._truncatedText = true;
                    finalText = `${changes.badgeContent.currentValue.substr(0, this.badgeMaxValue)}&hellip;`;
                } else {
                    this._truncatedText = false;
                }
            }

            this._badgeDisplayContent = finalText;
        }

        // if text is only set, set aria label from it
        if (changes.badgeContent && !this.badgeAriaDescription) {
            this.badgeAriaDescription = changes.badgeContent.currentValue;
        }

        this.updateBadge();
    }

    ngOnDestroy(): void {
        if (this._renderer.destroyNode) {
            this._renderer.destroyNode(this._badgeElement);
        }
    }

    private updateBadge(): HTMLElement {
        const badgeElement: HTMLSpanElement = this._renderer.createElement('span');
        this.clearExisting();

        badgeElement.classList.add(this._className);
        badgeElement.style.setProperty('display', 'none');

        badgeElement.innerHTML = this._badgeDisplayContent;
        badgeElement.style.setProperty('color', this.determineContentTextColor().toHex());

        if (this.badgeAriaDescription) {
            badgeElement.setAttribute('aria-describedby', this.badgeAriaDescription);
        }

        if (this._truncatedText) {
            badgeElement.setAttribute('title', this._badgeContent);
        }

        if (this._badgeColor) {
            badgeElement.style.setProperty('background', this._badgeColor.toHex());
        }

        this._badgeElement = badgeElement;
        this._renderer.appendChild(this._element.nativeElement, this._badgeElement);
        badgeElement.style.removeProperty('display');

        return this._badgeElement;
    }

    private clearExisting(): void {
        if (this._badgeElement) {
            this._element.nativeElement.removeChild(this._badgeElement);
        }
    }

    private determineContentTextColor(): ThemeColor {
        return this._badgeColor
            ? ThemeColor.parse(
                  this._contrastService.getContrastColor(this._badgeColor, this._lightColor, this._darkColor).toRgba()
              )
            : this._lightColor;
    }
}
