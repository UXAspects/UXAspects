import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOptions } from './dashboard.component';
import { DashboardModule } from './dashboard.module';
import { DashboardLayoutData } from './dashboard.service';
import { DashboardWidgetComponent } from './widget/dashboard-widget.component';


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
    options: DashboardOptions = { columns: 5, padding: 5, minWidth: 100, rowHeight: 100, emptyRow: true };
}

describe('Dashboard', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let nativeElement: HTMLElement;
    let widgetA: HTMLElement;
    let widgetB: HTMLElement;
    let widgetC: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule],
            declarations: [DashboardComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        widgetA = nativeElement.querySelector('#widget-A');
        widgetB = nativeElement.querySelector('#widget-B');
        widgetC = nativeElement.querySelector('#widget-C');
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should stack widgets if columns reduced allowing only one widget per row', async() => {
        expect(widgetB.style.top).toBe('0px');

        const adjustedOptions = { ...component.options, columns: 3 };

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetB.style.top).toBe('100px');
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

    it('should switch to stacked mode when minWidth increased', async() => {
        // setup columns option so row one has widgetA and Row two has widgetB/C
        const columnsSetup = { ...component.options, columns: 4 };

        component.options = columnsSetup;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(getPixels(widgetC.style.left)).toBeGreaterThan(0);

        const increasedMinWidth = { ...component.options, minWidth: 3000 };

        component.options = increasedMinWidth;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetC.style.left).toBe('0px');
    });

});

function getPixels(cssValue: string): number {
    return parseInt(cssValue.replace('px', ''));
}

@Component({
    selector: 'app-ux-dashboard-layout',
    template: `<ux-dashboard
                    [options]="options"
                    [(layout)]="layout"
                    (layoutChange)="onLayoutChange()">

                    <ux-dashboard-widget
                        id="run-widget"
                        name="Runs">
                    </ux-dashboard-widget>

                    <ux-dashboard-widget
                        id="purpose-widget"
                        name="Purpose">
                    </ux-dashboard-widget>

                    <ux-dashboard-widget
                        id="host-widget"
                        name="Host">
                    </ux-dashboard-widget>

            </ux-dashboard>
`
})
export class DashboardWithInitialLayoutTestComponent {

    options: DashboardOptions = {
        columns: 3,
        padding: 10,
        rowHeight: 300,
        emptyRow: false,
        minWidth: 187
    };

    layout: ReadonlyArray<DashboardLayoutData> = [
        { id: 'run-widget', col: 0, row: 0, colSpan: 2, rowSpan: 1},
        { id: 'purpose-widget', col: 0, row: 2, colSpan: 1, rowSpan: 1},
        { id: 'host-widget', col: 0, row: 3, colSpan: 3, rowSpan: 1},
    ];

    @ViewChildren(DashboardWidgetComponent) widgets: QueryList<DashboardWidgetComponent>;

    onLayoutChange(): void {

    }

}

describe('Dashboard with initial layout', () => {
    let component: DashboardWithInitialLayoutTestComponent;
    let fixture: ComponentFixture<DashboardWithInitialLayoutTestComponent>;
    let nativeElement: HTMLElement;
    let layoutChangeSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DashboardModule],
            declarations: [DashboardWithInitialLayoutTestComponent]
        })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(DashboardWithInitialLayoutTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        layoutChangeSpy = spyOn(component, 'onLayoutChange');

        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should update the widgets correctly when an initial layout value is given', async () => {
        // check that the underlying widgets receive the correct position and size values

        expect(layoutChangeSpy).not.toHaveBeenCalled();

        expect(component.widgets.toArray()[0].getColumn()).toBe(0, 'widget 0 column');
        expect(component.widgets.toArray()[0].getRow()).toBe(0, 'widget 0 row');
        expect(component.widgets.toArray()[0].getColumnSpan()).toBe(2, 'widget 0 columnSpan');
        expect(component.widgets.toArray()[0].getRowSpan()).toBe(1, 'widget 0 rowSpan');

        expect(component.widgets.toArray()[1].getColumn()).toBe(0, 'widget 1 column');
        expect(component.widgets.toArray()[1].getRow()).toBe(2, 'widget 1 row');
        expect(component.widgets.toArray()[1].getColumnSpan()).toBe(1, 'widget 1 columnSpan');
        expect(component.widgets.toArray()[1].getRowSpan()).toBe(1, 'widget 1 rowSpan');

        expect(component.widgets.toArray()[2].getColumn()).toBe(0, 'widget 2 column');
        expect(component.widgets.toArray()[2].getRow()).toBe(3, 'widget 2 row');
        expect(component.widgets.toArray()[2].getColumnSpan()).toBe(3, 'widget 2 columnSpan');
        expect(component.widgets.toArray()[2].getRowSpan()).toBe(1, 'widget 2 rowSpan');
    });

    it('should update the layout when a new value is passed to the input', async () => {
        component.layout = [
            { id: 'purpose-widget', col: 0, row: 0, colSpan: 2, rowSpan: 1},
            { id: 'host-widget', col: 0, row: 2, colSpan: 1, rowSpan: 1},
            { id: 'run-widget', col: 0, row: 3, colSpan: 3, rowSpan: 1},
        ];

        fixture.detectChanges();
        await fixture.whenStable();

        expect(layoutChangeSpy).not.toHaveBeenCalled();

        expect(component.widgets.toArray()[0].getColumn()).toBe(0, 'widget 0 column');
        expect(component.widgets.toArray()[0].getRow()).toBe(3, 'widget 0 row');
        expect(component.widgets.toArray()[0].getColumnSpan()).toBe(3, 'widget 0 columnSpan');
        expect(component.widgets.toArray()[0].getRowSpan()).toBe(1, 'widget 0 rowSpan');

        expect(component.widgets.toArray()[1].getColumn()).toBe(0, 'widget 1 column');
        expect(component.widgets.toArray()[1].getRow()).toBe(0, 'widget 1 row');
        expect(component.widgets.toArray()[1].getColumnSpan()).toBe(2, 'widget 1 columnSpan');
        expect(component.widgets.toArray()[1].getRowSpan()).toBe(1, 'widget 1 rowSpan');

        expect(component.widgets.toArray()[2].getColumn()).toBe(0, 'widget 2 column');
        expect(component.widgets.toArray()[2].getRow()).toBe(2, 'widget 2 row');
        expect(component.widgets.toArray()[2].getColumnSpan()).toBe(1, 'widget 2 columnSpan');
        expect(component.widgets.toArray()[2].getRowSpan()).toBe(1, 'widget 2 rowSpan');

    });
});
