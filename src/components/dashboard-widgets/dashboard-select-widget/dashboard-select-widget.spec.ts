import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardModule } from '../../dashboard';
import { DashboardPredefinedWidgetsModule } from '../dashboard-predefined-widgets.module';
import { SelectConfig } from '../interfaces/select-widget.interface';
import { GetOptionByValuePipe } from './dashboard-select-widget.component';

@Component({
    selector: 'app-ux-select-widget',
    template: `
        <ux-dashboard>
            <ux-dashboard-select-widget class="widget"
                                        id="widget-select"
                                        name="Select Widget"
                                        heading="Select Widget"
                                        [fixedMode]="false"
                                        [options]="options"
                                        value="0">
            </ux-dashboard-select-widget>
        </ux-dashboard>
    `
})
export class DashboardSelectWidgetTestComponent {
    options: ReadonlyArray<SelectConfig> = [
        { value: '0', label: 'Zero', icon: 'close' },
        { value: '1', label: 'One', icon: 'radial' },
    ];
}

describe('Select Widget', () => {
    let component: DashboardSelectWidgetTestComponent;
    let fixture: ComponentFixture<DashboardSelectWidgetTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule, DashboardPredefinedWidgetsModule],
            declarations: [DashboardSelectWidgetTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardSelectWidgetTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });
});

describe('GetOptionByValuePipe', () => {
    let pipe: GetOptionByValuePipe;
    let options: ReadonlyArray<SelectConfig>;

    beforeEach(() => {
        options = [
            { value: '0', label: 'Zero', icon: 'close' },
            { value: '1', label: 'One', icon: 'radial' },
        ];
        pipe = new GetOptionByValuePipe();
    });

    it('should find the the option by value', () => {
        expect(pipe.transform(options, '0')).toEqual(options[0]);
    });

    it('should return null', () => {
        expect(pipe.transform(options, 'value')).toBeNull();
    });
});
