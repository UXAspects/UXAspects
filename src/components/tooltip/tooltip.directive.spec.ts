import { TestBed, ComponentFixture, fakeAsync, tick, inject } from '@angular/core/testing';
import { Component, SimpleChange, ViewChild } from '@angular/core';
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

describe('Tooltip Directive', () => {

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

    it('should show tooltip', fakeAsync(() => {

        const isOpenChangeSpy = spyOn(component.tooltipDirective.isOpenChange, 'emit');
        const shownSpy = spyOn(component.tooltipDirective.shown, 'emit');

        component.tooltipDirective.show();
        tick(0);
        expect(getTooltip()).toBeTruthy();
        // expect(isOpenChangeSpy).toHaveBeenCalledWith(true);
        // expect(isOpenChangeSpy).toHaveBeenCalledTimes(1);
        expect(shownSpy).toHaveBeenCalledTimes(1);
    }));

    it('should show tooltip after delay', fakeAsync(() => {
        component.tooltipDirective.delay = 100;
        component.tooltipDirective.show();
        tick(0);
        expect(getTooltip()).toBeFalsy();
        tick(100);
        expect(getTooltip()).toBeTruthy();
    }));

    it('should correctly destroy tooltip pending show', fakeAsync(async () => {
        component.tooltipDirective.delay = 100;
        component.tooltipDirective.show();
        tick(0);

        component.showTrigger = false;
        fixture.detectChanges();
        await fixture.whenStable();

        // ensure the timeout is cancelled
        expect((component.showTrigger as any)._showTimeoutId).toBeFalsy();
    }));

    it('should not show tooltip when tooltip is disabled', fakeAsync(async () => {
        component.tooltipDirective.disabled = true;
        component.tooltipDirective.show();
        tick(0);
        expect(getTooltip()).toBeFalsy();
    }));

    it('should apply the custom tooltip class', fakeAsync(() => {
        component.tooltipDirective.customClass = 'custom-tooltip-class';
        component.tooltipDirective.show();
        tick(0);
        expect(getTooltip()).toBeTruthy();
        expect(getInnerTooltip().classList.contains('custom-tooltip-class')).toBeTruthy();
    }));

    it('should apply the correct tooltip placement', fakeAsync(() => {
        component.tooltipDirective.placement = 'right';
        component.tooltipDirective.show();
        tick(0);
        expect(getTooltip()).toBeTruthy();
        expect(getInnerTooltip().classList.contains('right')).toBeTruthy();
    }));

    it('should show the correct tooltip content', fakeAsync(() => {
        component.tooltipDirective.show();
        tick(0);
        expect(getTooltipContent()).toBe('Tooltip content here');
    }));

    it('should show allow open state to be controlled via the isOpen input', fakeAsync(async () => {
        component.tooltipDirective.isOpen = true;

        // ngOnChanges won't be called by Angular here (even with detect changes) but we can simulate it
        component.tooltipDirective.ngOnChanges({
            isOpen: new SimpleChange(undefined, true, false)
        });

        tick(0);
        expect(getTooltip()).toBeTruthy();

        // should also close
        component.tooltipDirective.isOpen = false;

        // ngOnChanges won't be called by Angular here (even with detect changes) but we can simulate it
        component.tooltipDirective.ngOnChanges({
            isOpen: new SimpleChange(true, false, false)
        });

        tick(0);
        expect(getTooltip()).toBeFalsy();
    }));

    function getTooltip(): HTMLElement | null {
        return document.querySelector('ux-tooltip');
    }

    function getInnerTooltip(): HTMLElement | null {
        return getTooltip().querySelector('.tooltip');
    }

    function getTooltipContent(): string {
        return getTooltip().querySelector<HTMLDivElement>('.tooltip-inner').innerText.trim();
    }
});
