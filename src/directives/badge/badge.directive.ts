import { Directive, ElementRef, Input, Renderer, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ColorService } from 'src/services/color/color.service';
import { ThemeColor } from 'src/services/color/theme-color';
import { ContrastService } from './../accessibility/contrast-ratio/contrast.service';

export enum BadgeVerticalPosition {
    Top = 'Top',
    Bottom = 'Bottom',
    Inline = 'Inline'
}

export enum BadgeHorizontalPosition {
    Right = 'Right',
    Left = 'Left',
    Center = 'Center'
}

export enum BadgeSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large'
}

@Directive({
    selector: '[uxBadge]'
})
export class BadgeDirective implements OnInit, OnChanges {
    /**
     * Define the badge background color
     */
    @Input() public set badgeBackgroundColor(color: string) {
        this._backgroundColor = ThemeColor.parse(this._colorService.resolve(color));
    }

    @Input() public set badgeFontColor(color: string) {
        this._fontColor = color ? ThemeColor.parse(this._colorService.resolve(color)) : this._determineContrastColor();
    }

    @Input() public set badgeText(s: string) {
        const subject = s.trim();
        this._isNumber =  /^\d+$/.test(subject);
        this._text = subject;
    }

    @Input() public set badgeAriaLabel(s: string) {
        this._ariaLabel = s;
    }

    @Input() public set badgeVerticalPosition(position: string) {
        this._vPos = this._determineVPos(position);
    }

    @Input() public set badgeHorizontalPosition(position: string) {
        this._hPos = this._determineHPos(position);
    }

    @Input() public set badgeOverlap(overlap: boolean) {
        this._overlap = overlap;
    }

    @Input() public set badgeMaxLength(len: number) {
        this._maxLength = len;
    }

    @Input() public set badgeSize(size: string) {
        this._size = this._determineSize(size);
    }

    // shows + for number, ellipsis for text
    public maxCharacters: number;

    private _backgroundColor: ThemeColor;
    private _fontColor: ThemeColor;

    private _darkColor: ThemeColor;
    private _lightColor: ThemeColor;
    private _isNumber: boolean;
    private _text: string;
    private _displayText: string;
    private _ariaLabel: string;
    private _vPos: BadgeVerticalPosition;
    private _hPos: BadgeHorizontalPosition;
    private _size: BadgeSize;
    private _overlap: boolean;
    private _maxLength: number;
    private suffix: string;

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _renderer: Renderer,
        private readonly _colorService: ColorService,
        private readonly _contrastService: ContrastService
    ) {
    }

    public ngOnInit(): void {
        this._darkColor = ThemeColor.parse('#000');
        this._lightColor = ThemeColor.parse('#fff');
        this._vPos = BadgeVerticalPosition.Top;
        this._hPos = BadgeHorizontalPosition.Right;
        this._text = '';
        this._ariaLabel = '';
        this._maxLength = null;
        this._overlap = true;
        this._isNumber = false;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // get display friendly version of text based on max length and type of val;
        if (changes.text) {
            let finalText: string = changes.badgeText.currentValue || '';

            if (finalText.length) {
                if (this._maxLength && finalText.length > this._maxLength) {
                    if (this._isNumber) {
                        finalText = '';

                        for (let i = 0; i < this._maxLength; i++) {
                            finalText += '9';
                        }

                        finalText += '+';
                    } else {
                        if (changes.badgeText.currentValue.length > this._maxLength) {
                            finalText = `${ changes.text.currentValue.substr(0, this._maxLength - 1) }&hellip;`;
                        }
                    }
                }
            }

            this._displayText = finalText;
        }

        // if text is only set, set aria label from it
        if (changes.badgeText && !changes.badgeAriaLabel && !this._ariaLabel) {
            this._ariaLabel = changes.badgeText.currentValue;
        }
    }

    private _determineContrastColor(): ThemeColor {
        return this._backgroundColor ?
            ThemeColor.parse(
                this._contrastService.getContrastColor(
                    this._backgroundColor,
                    this._lightColor,
                    this._darkColor
                ).toRgba())
            : this._lightColor;
    }

    private _determineVPos(position: string): BadgeVerticalPosition {
        const pos = BadgeVerticalPosition[this._makeEnumFriendly(position)];
        return pos || BadgeVerticalPosition.Top;
    }

    private _determineHPos(position: string): BadgeHorizontalPosition {
        const pos = BadgeHorizontalPosition[this._makeEnumFriendly(position)];
        return pos || BadgeHorizontalPosition.Right;
    }

    private _determineSize(size: string): BadgeSize {
        const s = BadgeSize[this._makeEnumFriendly(size)];
        return s || BadgeSize.Medium;
    }

    private _makeEnumFriendly(s: string): string {
        const subject = s.trim().replace(/ /g, '');
        return `${subject.substr(0, 1).toUpperCase()}${subject.substr(1, subject.length - 1).toLowerCase()}`;
    }
}