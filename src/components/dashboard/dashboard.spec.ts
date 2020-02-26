import { Component, ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOptions } from './dashboard.component';
import { DashboardModule } from './dashboard.module';


@Component({
    selector: 'app-ux-dashboard',
    template: `<ux-dashboard
                    [options]="options">

                    <ux-dashboard-widget
                        id="widget-A"
                        name="Hosts"
                        [colSpan]="3">

                    </ux-dashboard-widget>

                    <ux-dashboard-widget
                        id="widget-B"
                        name="Runs"
                        [colSpan]="2">


                    </ux-dashboard-widget>

                    <ux-dashboard-widget
                        id="widget-C"
                        name="Runs"
                        [colSpan]="2">

                    </ux-dashboard-widget>

                </ux-dashboard>
    `
})
export class DashboardComponent {

    // defaultOptions: DashboardOptions = { columns: 5, padding: 5, minWidth: 100, minHeight: 100, emptyRow: true };
    options: DashboardOptions;

}

describe('Dashboard', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let nativeElement;
    let widgetA;
    let widgetC;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule],
            declarations: [DashboardComponent]
        })
        .overrideComponent(DashboardComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        widgetA = nativeElement.querySelector('#widget-A');
        widgetC = nativeElement.querySelector('#widget-C');
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should stack widgets if columns reduced allowing only one widget per row', async() => {
        // default columns option needs to be applied for test to be setup correctly
        const defaultOptions = { ...component.options, columns: 5 };

        component.options = defaultOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetC.style.top).toBe('151.6px');

        const adjustedOptions = { ...component.options, columns: 3 };

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetC.style.top).toBe('252.667px');
    });

    it('should increase widget padding if padding option increased', async() => {
        const adjustedOptions = { ...component.options, padding: 20 };
        expect(widgetA.style.padding).toBe('5px');

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetA.style.padding).toBe('20px');
    });

    it('should increase widget rowHeight if rowHeight option increased', async() => {
        const adjustedOptions = { ...component.options, rowHeight: 400 };
        expect(widgetA.style.height).toBe('100px');

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetA.style.height).toBe('400px');
    });

    it('should increase dashboard rows from two to three when minWidth Increased', async() => {
        // setup columns option so row one has widgetA and Row two has widgetB/C
        const columnsSetup = { ...component.options, columns: 4 };

        component.options = columnsSetup;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetC.style.left).toBe('378px');

        const increasedMinWidth = { ...component.options, minWidth: 3000 };

        component.options = increasedMinWidth;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetC.style.left).toBe('0px');
    });

});
