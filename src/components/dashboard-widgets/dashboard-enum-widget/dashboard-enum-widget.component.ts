import {
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
import { EnumConfig, EnumWidgetConfig } from '../interfaces/enum-widget';
import {SidePanelComponent} from '../../side-panel';
import {SelectListComponent} from '../../select-list';

@Component({
    selector: 'ux-dashboard-enum-widget',
    templateUrl: './dashboard-enum-widget.component.html',
})
export class DashboardEnumWidgetComponent implements EnumWidgetConfig, OnInit {
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

    selected: EnumConfig[];

    private lastSelection: EnumConfig[];

    ngOnInit() {
        if (!this.enums) { throw new Error('No enums given!'); }
        if (!this.value) { throw new Error('No value given!'); }

        const selectedEnum = this.enums.find(item => item.value === this.value);

        this.selected = [selectedEnum];
    }

    open(): void {
        const selectedEnum = this.enums.find(item => item.value === this.value);
        this.selected = [selectedEnum];
        this.sidePanel.openPanel();
    }

    save(): void {
        this.value = this.selected[0].value;
        this.valueChange.emit(this.value);
        this.sidePanel.closePanel();
    }

    cancel(): void {
        this.sidePanel.closePanel();
    }

    changeSelection(e: EnumConfig[]): void {
        if (e.length === 0) {
            this.selected = this.lastSelection.slice(0);
        }
        this.lastSelection = this.selected.slice(0);
    }
}

@Pipe({name: 'getEnumConfigByValue'})
export class GetEnumConfigByValuePipe implements PipeTransform {
    transform(value: number | string, enums: EnumConfig[], field: string) {
        return (enums.find(item => item.value === value))[field];
    }
}
