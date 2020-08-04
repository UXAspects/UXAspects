import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Pipe,
    PipeTransform,
    ViewChild
} from '@angular/core';
import { EnumConfig, EnumWidgetConfig } from '../interfaces/enum-widget';
import { SidePanelComponent } from '../../side-panel';
import { SelectListComponent } from '../../select-list';
import { DashboardWidgetComponent } from '../../dashboard';

@Component({
    selector: 'ux-dashboard-enum-widget',
    templateUrl: './dashboard-enum-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEnumWidgetComponent implements EnumWidgetConfig, OnInit, OnDestroy {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @ViewChild('widget') widget: DashboardWidgetComponent;
    @ViewChild('sidePanel') sidePanel: SidePanelComponent;
    @ViewChild('enumList') enumList: ElementRef<SelectListComponent<EnumConfig>>;
    @Input() enums: EnumConfig[];
    @Input() value: string | number;

    @Output() valueChange = new EventEmitter<string | number>();

    selected: ReadonlyArray<EnumConfig>;

    private _isDragged: boolean = false;
    private _getEnumByValuePipe: GetEnumByValuePipe = new GetEnumByValuePipe();
    private lastSelection: EnumConfig[];

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit() {
        if (!this.enums) { throw new Error('No enums given!'); }
        if (!this.value) { throw new Error('No value given!'); }

        const selectedEnum = this.enums.find(item => item.value === this.value);

        this.selected = [selectedEnum];
    }

    ngOnDestroy() {
        this.widget.dashboardService.isDragging$.unsubscribe();
    }

    @HostListener('window:mousemove', [])
    onMouseEvent() {
        if (this._isDragged) {
            this.changeDetectorRef.markForCheck();
        }
    }

    openSidePanel(): void {
        const selectedEnum = this._getEnumByValuePipe.transform(this.enums, this.value);
        this.selected = [selectedEnum];
        this.sidePanel.openPanel();
    }

    save(): void {
        if (this.selected.length > 0) {
            this.value = this.selected[0].value;
            this.valueChange.emit(this.value);
            this.sidePanel.closePanel();
        }
    }

    cancel(): void {
        this.sidePanel.closePanel();
    }

    changeSelection(changedSelection: ReadonlyArray<EnumConfig>): void {
        if (changedSelection.length === 0) {
            this.selected = [...this.lastSelection];
        } else {
            this.selected = changedSelection;
        }
        this.lastSelection = [...this.selected];
    }
}

@Pipe({name: 'getEnumByValue'})
export class GetEnumByValuePipe implements PipeTransform {
    transform(enums: ReadonlyArray<EnumConfig>, value: number | string) {
        return (enums?.find(item => item.value === value));
    }
}
