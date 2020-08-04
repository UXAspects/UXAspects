import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { SidePanelComponent } from '../../side-panel';
import { TextWidgetConfig } from '../interfaces/text-widget';
import { DashboardWidgetComponent } from '../../dashboard';

@Component({
    selector: 'ux-dashboard-text-widget',
    templateUrl: './dashboard-text-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTextWidgetComponent implements TextWidgetConfig, OnDestroy {
    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() fixedMode: boolean = false;
    @Input() colSpan: number = 1;
    @Input() rowSpan: number = 1;

    @ViewChild('widget') widget: DashboardWidgetComponent;
    @ViewChild('sidePanel') sidePanel: SidePanelComponent;
    @ViewChild('textArea') textArea: ElementRef<HTMLTextAreaElement>;
    @Input() text: string = '';
    @Input() editable: boolean = false;

    @Output() textChange = new EventEmitter<string>();

    private _isDragged: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnDestroy() {
        this.widget.dashboardService.isDragging$.unsubscribe();
    }

    @HostListener('window:mousemove', [])
    onMouseEvent() {
        if (this._isDragged) {
            this.changeDetectorRef.markForCheck();
        }
    }

    open() {
        this.textArea.nativeElement.value = this.text;
        this.sidePanel.openPanel();
    }

    save() {
        this.text = this.textArea.nativeElement.value;
        this.textChange.emit(this.text);
        this.sidePanel.closePanel();
    }

    cancel() {
        this.sidePanel.closePanel();
    }
}
