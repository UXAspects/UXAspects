import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
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
        '[class.ux-badge-no-content]': '!badgeContent',
    },
})
export class BadgeDirective implements AfterViewInit, OnChanges, OnDestroy {
    private readonly _className = 'ux-badge';
    private readonly _darkColor: ThemeColor = ThemeColor.parse('#000');
    private readonly _lightColor: ThemeColor = ThemeColor.parse('#FFF');
    private _badgeElement: HTMLElement | undefined;
    private _isNumber: boolean;

    /**
     * Directive parameter that sets the content of the badge
     */
    private _badgeDisplayContent: string;

    @Input('uxBadge')
    get badgeContent(): string {
        return this._badgeContent;
    }
    set badgeContent(s: string) {
        if (s && s.replace(/ /g, '').length > 0) {
            const subject = s.toString().trim();
            this._isNumber = /^\d+$/.test(subject);
            this._badgeContent = subject;
        } else {
            this._badgeContent = null;
        }
    }
    private _badgeContent: string = null;

    /**
     * Define the badge background color
     */
    @Input()
    get badgeColor(): string {
        return this._badgeColor.toHex();
    }
    set badgeColor(color: string) {
        this._badgeColor = this.parseThemeColor(color);
    }
    private _badgeColor: ThemeColor = this._darkColor;

    /**
     * Define the badge border color - if unset there is no border
     */
    @Input()
    get badgeBorderColor(): string {
        return this._badgeBorderColor.toHex();
    }
    set badgeBorderColor(color: string) {
        this._badgeBorderColor = this.parseThemeColor(color);
    }
    private _badgeBorderColor: ThemeColor;

    /**
     * Set the badge vertical position in relation to the parent element
     */
    @Input()
    badgeVerticalPosition: BadgeVerticalPosition = 'above';

    /**
     * Set the badge horizontal position in relation to the parent element
     */
    @Input()
    badgeHorizontalPosition: BadgeHorizontalPosition = 'after';

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
    @Input()
    badgeSize: BadgeSize = 'medium';

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
    ) { }

    ngAfterViewInit(): void {
        const badgeElement: HTMLSpanElement = this._renderer.createElement('span');
        this._renderer.addClass(badgeElement, this._className);
        this._renderer.setStyle(badgeElement, 'display', 'none');
        this._renderer.setProperty(badgeElement, 'innerHTML', this._badgeDisplayContent);
        this._renderer.setStyle(badgeElement, 'color', this.determineContentTextColor().toHex());

        if (this._badgeColor) {
            this._renderer.setStyle(badgeElement, 'background', this._badgeColor.toHex());
        }

        if (this._badgeBorderColor) {
            this._renderer.setStyle(badgeElement, 'border-color', this._badgeBorderColor.toHex());
        }

        this._badgeElement = badgeElement;
        this._renderer.appendChild(this._element.nativeElement, this._badgeElement);
        this._renderer.removeStyle(this._badgeElement, 'display');
    }

    ngOnChanges(changes: SimpleChanges): void {
        let contentChanged: boolean = false;
        // get display friendly version of text based on max length and type of val;
        if (changes.badgeContent || changes.badgeMaxValue) {
            let finalText: string =
                (changes.badgeContent && changes.badgeContent.currentValue) || this.badgeContent || null;
            const maxValue: number =
                (changes.badgeMaxValue && changes.badgeMaxValue.currentValue) || this.badgeMaxValue || null;

            if (finalText && maxValue && maxValue > 0) {
                if (this._isNumber && parseInt(finalText) > maxValue) {
                    finalText = `${maxValue}+`;
                } else if (finalText.length > maxValue) {
                    finalText = `${finalText.substr(0, maxValue)}&hellip;`;
                }
            }

            this._badgeDisplayContent = finalText;
            contentChanged = true;
        }

        // if the badge is visible set changed values
        if (this._badgeElement) {
            // set the badge content
            if (contentChanged) {
                this._renderer.setProperty(this._badgeElement, 'innerHTML', this._badgeDisplayContent);
            }

            // set the badge color
            if (changes.badgeColor && changes.badgeColor.currentValue !== changes.badgeColor.previousValue) {
                this._renderer.setStyle(this._badgeElement, 'background', this._badgeColor.toHex());
                this._renderer.setStyle(this._badgeElement, 'color', this.determineContentTextColor().toHex());
            }

            // set the badge border color
            if (changes.badgeBorderColor && changes.badgeBorderColor.currentValue !== changes.badgeBorderColor.previousValue) {
                this._renderer.setStyle(this._badgeElement, 'border-color', this._badgeBorderColor.toHex());
            }
        }
    }

    ngOnDestroy(): void {
        if (this._renderer.destroyNode) {
            this._renderer.destroyNode(this._badgeElement);
        }
    }

    private determineContentTextColor(): ThemeColor {
        return this._badgeColor
            ? ThemeColor.parse(
                this._contrastService.getContrastColor(this._badgeColor, this._lightColor, this._darkColor).toRgba()
            )
            : this._lightColor;
    }

    private parseThemeColor(color: string): ThemeColor {
        let themeColor: ThemeColor = null;

        if (color) {
            themeColor = ThemeColor.parse(this._colorService.resolve(color));
        }

        return themeColor;
    }
}
