import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { ColorPickerColor, ColorService, MenuItemType, MenuTriggerDirective } from "@ux-aspects/ux-aspects";

@Component({
    selector: 'uxd-documentation-color-picker',
    templateUrl: './documentation-color-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./documentation-color-picker.component.less']
})
export class DocumentationColorPickerComponent implements AfterViewInit, OnInit {

    @ViewChild(MenuTriggerDirective) menuTrigger?: MenuTriggerDirective;

    @Input() showInput = false;
    @Input() colors: ColorPickerColor[][];
    @Input() selected: ColorPickerColor;
    @Input() showTooltips = false;
    @Input() colorNames = [];
    @Input() buttonStyle: string = 'circle';
    @Input() buttonSize = 'md';
    @Input() columns = 4;
    @Input() menuOpen: boolean = false;

    /** Emit when the currently selected value changes */
    @Output() selectedChange = new EventEmitter<ColorPickerColor>();

    menuItemType: MenuItemType = MenuItemType.Custom;

    constructor(private readonly colorService: ColorService, private _cd: ChangeDetectorRef) { }

    ngOnInit(): void {
        if (this.colorNames.length > 0) {
            this.colors = this.colorNames.map(row =>
                row.map(colorName => new ColorPickerColor(colorName, this.colorService.resolve(colorName))));
        }

        if (!this.selected) {
            this.selected = this.colors[0][0];
        }
    }

    ngAfterViewInit(): void {
        if (this.menuOpen) {
            this.menuTrigger?.openMenu();
            this._cd.detectChanges();
        }
    }

    close(): void {
        this.menuTrigger?.closeMenu();
    }

    onColorPickerSelectedChange(color: ColorPickerColor): void {
        this.selectedChange.next(color);
        if (!this.showInput) {
            this.close();
        }
    }
}