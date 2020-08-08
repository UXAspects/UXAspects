import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Pipe,
    PipeTransform,
    ViewChild
} from '@angular/core';
import { PredefinedWidgetConfig } from '../interfaces/predefined-widget';
import { EnumConfig, EnumWidgetConfig } from '../interfaces/enum-widget';
import { SidePanelComponent } from '../../side-panel';
import { SelectListComponent } from '../../select-list';

@Component({
    selector: 'ux-dashboard-enum-widget',
    templateUrl: './dashboard-enum-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEnumWidgetComponent implements PredefinedWidgetConfig, EnumWidgetConfig, OnInit {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @ViewChild('sidePanel') sidePanel: SidePanelComponent;
    @ViewChild('enumList') enumList: ElementRef<SelectListComponent<EnumConfig>>;
    @Input() enums: EnumConfig[];
    @Input() value: string | number;

    @Output() valueChange = new EventEmitter<string | number>();

    selected: ReadonlyArray<EnumConfig>;

    private _getEnumByValuePipe: GetEnumByValuePipe = new GetEnumByValuePipe();
    private lastSelection: EnumConfig[];

    ngOnInit() {
        const selectedEnum = this.enums.find(item => item.value === this.value);

        this.selected = [selectedEnum];
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
