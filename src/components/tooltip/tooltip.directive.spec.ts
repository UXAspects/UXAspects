import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TooltipModule } from './tooltip.module';
import { TooltipDirective } from './tooltip.directive';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
    selector: 'app-tooltip-test',
    template: `
        <button *ngIf="showTrigger" uxTooltip="Tooltip content here" [(isOpen)]="isOpen">
            Show Tooltip
        </button>
    `
})
export class TooltipDirectiveSpecComponent {
    @ViewChild(TooltipDirective, { static: false }) tooltipDirective: TooltipDirective;

    isOpen: boolean = false;
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

        const shownSpy = spyOn(component.tooltipDirective.shown, 'emit');

        component.tooltipDirective.show();
        tick(0);
        expect(getTooltip()).toBeTruthy();
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

    it('should not show tooltip when tooltip is disabled', fakeAsync(() => {
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

    it('should show allow open state to be controlled via the isOpen input', fakeAsync(() => {
        component.isOpen = true;
        fixture.detectChanges();

        tick(0);
        expect(getTooltip()).toBeTruthy();

        // should also close
        component.isOpen = false;
        fixture.detectChanges();

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
