import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContrastService } from '../accessibility/contrast-ratio/contrast.service';
import { BadgeModule } from './badge.module';

const buttonSelector = 'button[class^=ux-badge]';
const badgeSelector = '.ux-badge';

@Component({
    selector: 'app-badge-test',
    template: `
        <button
            id="button"
            [uxBadge]="badgeContentText"
            [badgeColor]="badgeColor"
            [badgeMaxValue]="maxValue"
            [badgeHidden]="hidden"
            [badgeSize]="size"
            [badgeVerticalPosition]="verticalPosition"
            [badgeHorizontalPosition]="horizontalPosition"
            [badgeAriaDescription]="ariaDescription"
        ></button>
    `,
})
export class BadgeTestComponent {
    badgeContentText: string = 'Some badge';
    ariaDescription: string;
    badgeColor: string = '#000';
    maxValue: number = null;
    hidden: boolean = false;
    size: string = 'medium';
    verticalPosition: string = 'above';
    horizontalPosition: string = 'after';
}

describe('Badge', () => {
    let component: BadgeTestComponent;
    let fixture: ComponentFixture<BadgeTestComponent>;
    let nativeElement: HTMLElement;
    let triggerElement: HTMLButtonElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [BadgeModule],
            providers: [ContrastService],
            declarations: [BadgeTestComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        triggerElement = nativeElement.querySelector('#button');

        fixture.detectChanges();
    });

    it('should have a badge directive attached', () => {
        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector('.ux-badge');
        expect(buttonWithBadge).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-container')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-medium')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-above')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-after')).toBeTruthy();

        expect(badge.textContent).toBe('Some badge');
        expect(badge.getAttribute('aria-describedby')).toBe(badge.textContent);

        expect(badge.style.background).toBe('rgb(0, 0, 0)');
        expect(badge.style.color).toBe('rgb(255, 255, 255)');
    });

    it('should have seperate text and aria labels', async () => {
        const badgeText = 'The badge itself';
        const ariaDescription = 'This is some different text';
        component.badgeContentText = badgeText;
        component.ariaDescription = ariaDescription;
        fixture.detectChanges();
        await fixture.whenStable();

        let buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        let badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);

        expect(badge.textContent).toBe(badgeText);
        expect(badge.getAttribute('aria-describedby')).toBe(ariaDescription);
    });

    it('should set the background correctly', async () => {
        component.badgeColor = 'critical';
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);

        expect(badge.style.background).toBe('rgb(255, 69, 79)');
        expect(badge.style.color).toBe('rgb(0, 0, 0)');
    });

    it('should set the truncate text', async () => {
        const t = 'A really long badge title';
        component.badgeContentText = t;
        component.maxValue = 13;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.textContent).toBe('A really long…');
        expect(badge.getAttribute('title')).toBe(t);
    });

    it('should not affect a string shorter than the limit', async () => {
        const t = 'What`s new';
        component.badgeContentText = t;
        component.maxValue = 13;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.textContent).toBe(t);
        expect(badge.getAttribute('title')).toBeFalsy();
    });

    it('should limit a number', async () => {
        component.badgeContentText = '1849';
        component.maxValue = 999;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.innerHTML).toBe('999+');
    });

    it('should not affect number smaller than limit', async () => {
        component.badgeContentText = '998';
        component.maxValue = 999;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.innerHTML).toBe('998');
    });

    it('should not be visible', async () => {
        component.hidden = true;
        fixture.detectChanges();
        await fixture.whenStable();

        let buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        expect(buttonWithBadge.classList.contains('ux-badge-hidden')).toBeTruthy();

        component.hidden = false;
        fixture.detectChanges();
        await fixture.whenStable();

        buttonWithBadge = document.querySelector(buttonSelector);
        expect(buttonWithBadge.classList.contains('ux-badge-hidden')).toBeFalsy();
    });

    it('should change the size of the badge', async () => {
        component.size = 'large';
        fixture.detectChanges();
        await fixture.whenStable();

        let buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        expect(buttonWithBadge.classList.contains('ux-badge-large')).toBeTruthy();
    });

    it('should change the alignment of the badge', async () => {
        component.verticalPosition = 'above';
        component.horizontalPosition = 'before';
        fixture.detectChanges();
        await fixture.whenStable();

        let buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        expect(buttonWithBadge.classList.contains('ux-badge-above')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-before')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-below')).toBeFalsy();
        expect(buttonWithBadge.classList.contains('ux-badge-after')).toBeFalsy();

        // change removes old styles, add new
        component.verticalPosition = 'below';
        component.horizontalPosition = 'after';
        fixture.detectChanges();
        await fixture.whenStable();

        buttonWithBadge = document.querySelector(buttonSelector);
        expect(buttonWithBadge.classList.contains('ux-badge-below')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-above')).toBeFalsy();
        expect(buttonWithBadge.classList.contains('ux-badge-after')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-before')).toBeFalsy();
    });
});
