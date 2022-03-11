import {Component, ViewChild} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardModule} from '../../dashboard';
import {DashboardPredefinedWidgetsModule} from '../dashboard-predefined-widgets.module';
import {SelectConfig} from '../interfaces/select-widget.interface';
import {DashboardSelectWidgetComponent, GetOptionByValuePipe} from './dashboard-select-widget.component';

const defaultOptions: ReadonlyArray<SelectConfig> = [
    {value: 'nothing', label: 'Zero', icon: 'close'},
    {value: 'something', label: 'One', icon: 'radial'},
];

@Component({
    selector: 'ux-select-widget-test-component',
    template: `
        <ux-dashboard>
            <ux-dashboard-select-widget id="widget-select" name="Select Widget" heading="Select Widget"
                                        fixedMode="false" colSpan="3" rowSpan="4"
                                        [options]="options" value="nothing">
            </ux-dashboard-select-widget>
        </ux-dashboard>
    `
})
export class DashboardSelectWidgetTestComponent {
    options: ReadonlyArray<SelectConfig> = defaultOptions;
    @ViewChild(DashboardSelectWidgetComponent) widget: DashboardSelectWidgetComponent;
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
        expect(component.widget).toBeTruthy();
    });
});

describe('GetOptionByValuePipe', () => {
    let pipe: GetOptionByValuePipe = new GetOptionByValuePipe();

    it('should find the the option by value', () => {
        expect(pipe.transform(defaultOptions, 'nothing')).toEqual(defaultOptions[0]);
    });

    it('should return null', () => {
        expect(pipe.transform(defaultOptions, 'everything')).toBeNull();
    });
});
