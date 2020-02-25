import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOptions } from './dashboard.component';
import { DashboardModule } from './dashboard.module';


@Component({
    selector: 'app-ux-dashboard',
    template: `<ux-dashboard
                    [options]="options">

                    <ux-dashboard-widget
                        id="host-widget"
                        name="Hosts"
                        [colSpan]="3">

                        <h2 class="dashboard-widget-title">Runs</h2>

                            <div class="dashboard-widget-content-list">

                                <div class="dashboard-widget-content stacked">

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">NV Test</h3>
                                        <h4 class="dashboard-run-info-subtitle">ID Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">PC_IRENA</h3>
                                        <h4 class="dashboard-run-info-subtitle">Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info muted">
                                        <h3 class="dashboard-run-info-title">16/01/2017</h3>
                                        <h4 class="dashboard-run-info-subtitle">16:32 14min</h4>
                                    </div>

                                </div>

                                <div class="dashboard-widget-content stacked">
                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">NV Test_22</h3>
                                        <h4 class="dashboard-run-info-subtitle">ID Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">PC_hiLA</h3>
                                        <h4 class="dashboard-run-info-subtitle">Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info muted">
                                        <h3 class="dashboard-run-info-title">16/01/2017</h3>
                                        <h4 class="dashboard-run-info-subtitle">16:32 14min</h4>
                                    </div>
                                </div>
                            </div>

                    </ux-dashboard-widget>

                    <ux-dashboard-widget
                        id="widget-B"
                        name="Runs"
                        [colSpan]="2">

                        <div class="dashboard-widget-container">

                            <h2 class="dashboard-widget-title">Runs</h2>

                            <div class="dashboard-widget-content-list">

                                <div class="dashboard-widget-content stacked">

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">NV Test</h3>
                                        <h4 class="dashboard-run-info-subtitle">ID Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">PC_IRENA</h3>
                                        <h4 class="dashboard-run-info-subtitle">Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info muted">
                                        <h3 class="dashboard-run-info-title">16/01/2017</h3>
                                        <h4 class="dashboard-run-info-subtitle">16:32 14min</h4>
                                    </div>

                                </div>

                                <div class="dashboard-widget-content stacked">
                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">NV Test_22</h3>
                                        <h4 class="dashboard-run-info-subtitle">ID Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">PC_hiLA</h3>
                                        <h4 class="dashboard-run-info-subtitle">Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info muted">
                                        <h3 class="dashboard-run-info-title">16/01/2017</h3>
                                        <h4 class="dashboard-run-info-subtitle">16:32 14min</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ux-dashboard-widget>
                    <ux-dashboard-widget
                        id="widget-C"
                        name="Runs"
                        [colSpan]="1">

                        <div class="dashboard-widget-container">

                            <h2 class="dashboard-widget-title">Runs</h2>

                            <div class="dashboard-widget-content-list">

                                <div class="dashboard-widget-content stacked">

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">NV Test</h3>
                                        <h4 class="dashboard-run-info-subtitle">ID Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">PC_IRENA</h3>
                                        <h4 class="dashboard-run-info-subtitle">Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info muted">
                                        <h3 class="dashboard-run-info-title">16/01/2017</h3>
                                        <h4 class="dashboard-run-info-subtitle">16:32 14min</h4>
                                    </div>

                                </div>

                                <div class="dashboard-widget-content stacked">
                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">NV Test_22</h3>
                                        <h4 class="dashboard-run-info-subtitle">ID Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info">
                                        <h3 class="dashboard-run-info-title">PC_hiLA</h3>
                                        <h4 class="dashboard-run-info-subtitle">Test Name</h4>
                                    </div>

                                    <div class="dashboard-run-info muted">
                                        <h3 class="dashboard-run-info-title">16/01/2017</h3>
                                        <h4 class="dashboard-run-info-subtitle">16:32 14min</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ux-dashboard-widget>

                </ux-dashboard>
    `
})
export class DashboardComponent {

    options: DashboardOptions;
    initialOptions: DashboardOptions  = {
        columns: 3,
        padding: 10,
        rowHeight: 200,
        emptyRow: false,
        minWidth: 187
    };
}

describe('Dashboard', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let nativeElement: HTMLLIElement;
    let widget: HTMLLIElement;
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
        widget = nativeElement.querySelector('ux-dashboard-widget');
        widgetC = nativeElement.querySelector('#widget-C');
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should reposition widgets if columns option adjusted', async() => {
        let adjustedOptions: DashboardOptions  = {
            columns: 5,
            padding: 5,
            rowHeight: 400,
            emptyRow: false,
            minWidth: 187
        };
        component.options = component.initialOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetC.style.top).toBe('200px');

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widgetC.style.top).toBe('400px');
    });

    it('should increase widget padding if padding option increased', async() => {
        let adjustedOptions: DashboardOptions  = {
            columns: 6,
            padding: 10,
            rowHeight: 200,
            emptyRow: false,
            minWidth: 187
        };
        expect(widget.style.padding).toBe('5px');

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widget.style.padding).toBe('10px');
    });

    it('should increase widget rowHeight if rowHeight option increased', async() => {
        let adjustedOptions: DashboardOptions  = {
            columns: 6,
            padding: 10,
            rowHeight: 400,
            emptyRow: false,
            minWidth: 187
        };

        component.options = component.initialOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widget.style.height).toBe('200px');

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widget.style.height).toBe('400px');
    });

    it('should set widget rowHeight to equal options minWidth if rowHeight less than minWidth', async() => {
        let adjustedOptions: DashboardOptions  = {
            columns: 6,
            padding: 10,
            rowHeight: 200,
            emptyRow: false,
            minWidth: 400
        };

        component.options = adjustedOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(widget.style.height).toBe('400px');
    });
});
