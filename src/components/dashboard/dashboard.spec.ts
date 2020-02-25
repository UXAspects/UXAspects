import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOptions } from './dashboard.component';
import { DashboardModule } from './dashboard.module';


@Component({
    selector: 'app-ux-dashboard',
    template: `<ux-dashboard
                    [options]="options">

                    <ux-dashboard-widget
                        id="run-widget-A"
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
                        id="run-widget-B"
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
                </ux-dashboard>
    `
})
export class DashboardComponent {

    options: DashboardOptions;
    initialOptions: DashboardOptions  = {
        columns: 6,
        padding: 10,
        rowHeight: 200,
        emptyRow: false,
        minWidth: 187
    };
    adjustedOptions: DashboardOptions  = {
        columns: 4,
        padding: 10,
        rowHeight: 400,
        emptyRow: false,
        minWidth: 187
    };
}

fdescribe('Dashboard', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

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
        fixture.detectChanges();
    });

    it('should initialise correctly', () => {
        expect(component).toBeTruthy();
    });

    it('should change columns option if columns option adjusted', async() => {
        component.options = component.initialOptions;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.columns).toBe(6);
        component.options = component.adjustedOptions

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.options.columns).toBe(4);
    });

    // it('should change padding option if padding option adjusted', async() => {
    //     expect(component.options.padding).toBe(10);

    //     component.options.padding = 20;
    //     fixture.detectChanges();
    //     await fixture.whenStable();

    //     expect(component.options.padding).toBe(20);
    // });

    // it('should change rowHeight option if rowHeight option adjusted', async() => {
    //     expect(component.options.rowHeight).toBe(300);

    //     component.options.rowHeight = 600;
    //     fixture.detectChanges();
    //     await fixture.whenStable();

    //     expect(component.options.rowHeight).toBe(600);
    // });

    // it('should change minWidth option if minWidth option adjusted', async() => {
    //     expect(component.options.minWidth).toBe(187);

    //     component.options.minWidth = 100;
    //     fixture.detectChanges();
    //     await fixture.whenStable();

    //     expect(component.options.minWidth).toBe(100);
    // });

    // it('should change emptyRow option if emptyRow option adjusted', async() => {
    //     expect(component.options.emptyRow).toBe(false);

    //     component.options.emptyRow = true;
    //     fixture.detectChanges();
    //     await fixture.whenStable();

    //     expect(component.options.emptyRow).toBe(true);
    // });
});
