import { TestBed, ComponentFixture, fakeAsync, tick, inject } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TooltipModule } from './tooltip.module';
import { TooltipDirective } from './tooltip.directive';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
    selector: 'app-tooltip-test',
    template: `
        <button *ngIf="showTrigger" uxTooltip="Tooltip content here">
            Show Tooltip
        </button>
    `
})
export class TooltipDirectiveSpecComponent {
    @ViewChild(TooltipDirective, { static: false }) tooltipDirective: TooltipDirective;

    showTrigger: boolean = true;
}

fdescribe('Tooltip Directive', () => {

    let component: TooltipDirectiveSpecComponent;
    let fixture: ComponentFixture<TooltipDirectiveSpecComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TooltipModule],
            declarations: [TooltipDirectiveSpecComponent]
        });

        fixture = TestBed.createComponent(TooltipDirectiveSpecComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        // access the overlay container
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
    });

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    it('should show tooltip', fakeAsync(async () => {
        component.tooltipDirective.show();
        fixture.detectChanges();
        await fixture.whenStable();
        tick(1);
        expect(document.querySelector('ux-tooltip')).toBeTruthy();
    }));

    it('should show tooltip after delay', fakeAsync(async () => {
        component.tooltipDirective.delay = 100;
        component.tooltipDirective.show();
        fixture.detectChanges();
        await fixture.whenStable();
        tick(1);
        expect(document.querySelector('ux-tooltip')).toBeFalsy();
        tick(100);
        expect(document.querySelector('ux-tooltip')).toBeTruthy();
    }));

    it('should correctly destroy tooltip pending show', fakeAsync(async () => {
        component.tooltipDirective.delay = 100;
        component.tooltipDirective.show();
        tick(1);

        component.showTrigger = false;
        fixture.detectChanges();
        await fixture.whenStable();

        // ensure the timeout is cancelled
        expect((component.showTrigger as any)._showTimeoutId).toBeFalsy();
    }));

    it('should not show tooltip when tooltip is disabled', fakeAsync(async () => {
        component.tooltipDirective.disabled = true;
        component.tooltipDirective.show();
        tick(1);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(document.querySelector('ux-tooltip')).toBeFalsy();
    }));
});