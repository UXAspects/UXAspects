import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorService } from '../../services/color/color.service';
import { ContrastService } from '../accessibility';
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
            [badgeBorderColor]="borderColor"
            [badgeMaxValue]="maxValue"
            [badgeHidden]="hidden"
            [badgeSize]="size"
            [badgeVerticalPosition]="verticalPosition"
            [badgeHorizontalPosition]="horizontalPosition"
            [badgeOverlap]="overlap"
        ></button>
    `,
})
export class BadgeTestComponent {
    badgeContentText: string | number = 'Some badge';
    badgeColor: string = null;
    borderColor: string = null;
    maxValue: number = null;
    hidden: boolean = false;
    size: string = 'medium';
    verticalPosition: string = 'above';
    horizontalPosition: string = 'after';
    overlap: boolean = false;
}

describe('Badge', () => {
    let component: BadgeTestComponent;
    let fixture: ComponentFixture<BadgeTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BadgeModule],
            providers: [ContrastService, ColorService],
            declarations: [BadgeTestComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should have a badge directive attached', () => {
        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(buttonWithBadge).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-container')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-above')).toBeTruthy();
        expect(buttonWithBadge.classList.contains('ux-badge-after')).toBeTruthy();

        expect(badge.classList.contains('ux-badge-medium')).toBeTruthy();
        expect(badge.textContent).toBe('Some badge');
        expect(badge.style.color).toBe('rgb(255, 255, 255)');
    });

    it('should be able to create an empty badge (no content)', async () => {
        component.badgeContentText = null;
        fixture.detectChanges();
        await fixture.whenStable();
        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.textContent.replace(/ /g, '')).toBe('');
    });

    it('should set the background color with theme color', async () => {
        component.badgeColor = 'critical';
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);

        expect(badge.style.backgroundColor).toBe('rgb(255, 69, 79)');
        expect(badge.style.color).toBe('rgb(0, 0, 0)');
    });

    it('should set the background color with hex color', async () => {
        component.badgeColor = '#FFF';
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);

        expect(badge.style.backgroundColor).toBe('rgb(255, 255, 255)');
        expect(badge.style.color).toBe('rgb(0, 0, 0)');
    });

    it('should set the background color with rgba color', async () => {
        component.badgeColor = 'rgba(255, 255, 255, 0.5)';
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);

        expect(badge.style.backgroundColor).toBe('rgba(255, 255, 255, 0.5)');
        expect(badge.style.color).toBe('rgb(0, 0, 0)');
    });

    it('should set the border color correctly', async () => {
        component.borderColor = 'critical';
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);

        expect(badge.style.borderColor).toBe('rgb(255, 69, 79)');
    });

    it('should truncate the text when max value is set (string length)', async () => {
        const t = 'A really long badge title';
        component.badgeContentText = t;
        component.maxValue = 13;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.textContent).toBe('A really long…');
    });

    it('should not affect a string shorter than the max value (string length)', async () => {
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

    it('should limit a number when max value is set (actual value)', async () => {
        component.badgeContentText = '1849';
        component.maxValue = 999;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.innerHTML).toBe('999+');
    });

    it('should not affect number smaller than max value (actual value)', async () => {
        component.badgeContentText = '998';
        component.maxValue = 999;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.innerHTML).toBe('998');
    });

    it('should limit a number when max value is set (numeric value)', async () => {
        component.badgeContentText = 1849;
        component.maxValue = 999;
        fixture.detectChanges();
        await fixture.whenStable();

        const buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.innerHTML).toBe('999+');
    });

    it('should not affect number smaller than max value (numeric value)', async () => {
        component.badgeContentText = 998;
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
        const badge: HTMLSpanElement = buttonWithBadge.querySelector(badgeSelector);
        expect(badge.classList.contains('ux-badge-large')).toBeTruthy();
    });

    it('should be able to set to overlap the subject element', async () => {
        component.overlap = true;
        fixture.detectChanges();
        await fixture.whenStable();

        let buttonWithBadge: HTMLButtonElement = document.querySelector(buttonSelector);
        expect(buttonWithBadge.classList.contains('ux-badge-overlap')).toBeTruthy();
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
