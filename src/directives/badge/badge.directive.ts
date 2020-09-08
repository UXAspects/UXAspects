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
        '[class.ux-badge-above]': 'badgeVerticalPosition === "above"',
        '[class.ux-badge-below]': 'badgeVerticalPosition === "below"',
        '[class.ux-badge-after]': 'badgeHorizontalPosition === "after"',
        '[class.ux-badge-before]': 'badgeHorizontalPosition === "before"'
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
    private _badgeDisplayContent: string | number;

    @Input('uxBadge')
    get badgeContent(): string | number {
        return this._badgeContent;
    }
    set badgeContent(badge: string | number) {
        if (typeof badge === 'number') {
            this._badgeContent = badge;
            this._isNumber = true;
        } else if (typeof badge === 'string' && badge.replace(/ /g, '').length > 0) {
            const subject = badge.trim();
            this._isNumber = /^\d+$/.test(subject);
            this._badgeContent = subject;
        } else {
            this._badgeContent = null;
        }
    }

    private _badgeContent: string | number = null;

    /**
     * Define the badge background color
     */
    @Input()
    get badgeColor(): string {
        return this._badgeColor.toRgba();
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
        return this._badgeBorderColor.toRgba();
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
        this._badgeElement = this._renderer.createElement('span');
        this._renderer.addClass(this._badgeElement, this._className);
        this._renderer.setStyle(this._badgeElement, 'display', 'none');
        this.setBadgeColor();
        this.setBadgeBorderColor();
        this.setBadgeSize();
        this.setContent(this._badgeContent, this.badgeMaxValue);
        this._renderer.appendChild(this._element.nativeElement, this._badgeElement);
        this._renderer.removeStyle(this._badgeElement, 'display');
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if the badge is visible set changed values
        if (!this._badgeElement) {
            return;
        }

        // set badge content and get display friendly version of text based on max length and type of val
        if (changes.badgeContent || changes.badgeMaxValue) {
            const finalText: string = (changes.badgeContent && changes.badgeContent.currentValue) || this.badgeContent || null;
            const maxValue: number = (changes.badgeMaxValue && changes.badgeMaxValue.currentValue) || this.badgeMaxValue || null;
            this.setContent(finalText, maxValue);
        }

        // set the badge color
        if (changes.badgeColor && changes.badgeColor.currentValue !== changes.badgeColor.previousValue) {
            this.setBadgeColor();
        }

        // set the badge border color
        if (changes.badgeBorderColor && changes.badgeBorderColor.currentValue !== changes.badgeBorderColor.previousValue) {
            this.setBadgeBorderColor();
        }

        // set badge size
        if (changes.badgeSize && changes.badgeSize.currentValue !== changes.badgeSize.previousValue) {
            this.setBadgeSize(changes.badgeSize.previousValue);
        }
    }

    ngOnDestroy(): void {
        if (this._renderer.destroyNode) {
            this._renderer.destroyNode(this._badgeElement);
        }
    }

    private setContent(content: string | number | null, maxValue: number): void {
        if (content && maxValue && maxValue > 0) {

            if (this._isNumber) {
                const numericValue = typeof content === 'number' ? content : parseInt(content);

                if (numericValue > maxValue) {
                    content = `${maxValue}+`;
                }
            } else if (typeof content === 'string' && content.length > maxValue) {
                content = `${content.substr(0, maxValue)}…`;
            }
        }

        this._badgeDisplayContent = content;
        this._badgeElement.textContent = this._badgeDisplayContent?.toString();
    }

    private setBadgeColor(): void {
        if (this._badgeColor) {
            this._renderer.setStyle(this._badgeElement, 'background-color', this._badgeColor.toRgba());
        } else {
            this._renderer.removeStyle(this._badgeElement, 'background-color');
        }

        this._renderer.setStyle(this._badgeElement, 'color', this.determineContentTextColor().toRgba());
    }

    private setBadgeBorderColor(): void {
        if (this._badgeBorderColor) {
            this._renderer.setStyle(this._badgeElement, 'border-color', this._badgeBorderColor.toRgba());
        } else {
            this._renderer.removeStyle(this._badgeElement, 'border-color');
        }

        this._renderer.setStyle(this._badgeElement, 'background-clip', this._badgeBorderColor ? 'padding-box' : 'border-box');
    }

    private setBadgeSize(previousSize?: string): void {
        if (previousSize) {
            this._renderer.removeClass(this._badgeElement, `ux-badge-${previousSize}`);
        }

        this._renderer.addClass(this._badgeElement, `ux-badge-${this.badgeSize}`);
    }

    private determineContentTextColor(): ThemeColor {
        return this._badgeColor
            ? ThemeColor.parse(
                this._contrastService.getContrastColor(this._badgeColor, this._lightColor, this._darkColor).toRgba()
            )
            : this._lightColor;
    }

    private parseThemeColor(color: string): ThemeColor {
        if (!color) {
            return null;
        }

        return this._colorService.colorExists(color) ?
            ThemeColor.parse(this._colorService.resolve(color)) :
            ThemeColor.parse(color);
    }
}
