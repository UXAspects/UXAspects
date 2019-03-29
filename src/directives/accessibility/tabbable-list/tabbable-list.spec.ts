import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessibilityModule } from '../accessibility.module';

/**
 * Simple List
 */
@Component({
    template: `
        <ul uxTabbableList>
            <li uxTabbableListItem *ngFor="let index of [1, 2, 3, 4, 5]">{{ index }}</li>
        </ul>
    `
})
export class SimpleListComponent { }

/**
 * Test Cases
 */
describe('Tabbable List - Simple List', () => {
    let fixture: ComponentFixture<SimpleListComponent>;
    let nativeElement: HTMLElement;
    let listItems: HTMLElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [AccessibilityModule],
            declarations: [SimpleListComponent]
        }).createComponent(SimpleListComponent);

        // run initial change detection
        fixture.detectChanges();

        // store the element
        nativeElement = fixture.nativeElement;

        // get an array of all the list items
        listItems = Array.from(nativeElement.querySelectorAll('li'));
    });

    it('The first item should be tabbable initially', () => {

        // only the first item should initially have a tab index of 0
        listItems.forEach((item, index) => expect(isTabbable(item)).toBe(index === 0));
    });

    it('should make an item tabbable when clicked', () => {
        // click the third item
        listItems[2].click();

        // only the third item should now have a tab index of 0
        listItems.forEach((item, index) => expect(isTabbable(item)).toBe(index === 2));
    });

    it('should navigate by pressing arrow keys', () => {
        // focus the first item
        listItems[0].click();

        // press the down arrow key
        keydown(listItems[0], DOWN_ARROW);

        expect(isTabbable(listItems[0])).toBe(false);
        expect(isTabbable(listItems[1])).toBe(true);

        // press the up arrow key
        keydown(listItems[0], UP_ARROW);

        expect(isTabbable(listItems[0])).toBe(true);
        expect(isTabbable(listItems[1])).toBe(false);
    });

    it('should wrap when [wrap]="true"', () => {
        // focus the last item
        listItems[4].click();

        // press the down arrow key
        keydown(listItems[0], DOWN_ARROW);

        expect(isTabbable(listItems[4])).toBe(false);
        expect(isTabbable(listItems[0])).toBe(true);
    });

    function keydown(element: HTMLElement, key: number): void {
        element.dispatchEvent(new KeyboardEvent('keydown', { keyCode: key, which: key } as KeyboardEvent));
    }

    function isTabbable(element: HTMLElement): boolean {
        return element.tabIndex === 0 && element.getAttribute('tabindex') === '0';
    }

});