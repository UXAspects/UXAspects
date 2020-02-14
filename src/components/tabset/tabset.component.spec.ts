import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from '../../common/testing';
import { TabsetComponent } from './tabset.component';
import { TabsetModule } from './tabset.module';

@Component({
    selector: 'app-tabset-test',
    template: `
        <ux-tabset [minimal]="true" aria-label="Tabset Example" #tabset>
            <ux-tab (deselect)="onTabDeselect()"  (deactivated)="onTabDeactivated()" (select)="onTabSelect()"  (activated)="onTabActivated()" customClass="text-center" *ngFor="let tab of tabs">
                <ng-template uxTabHeading>
                    <span>{{ tab.title }}</span>
                </ng-template>

                <div class="m-t">
                    <h4>{{ tab.title }}</h4>
                    <p>{{ tab.content }}</p>
                </div>
            </ux-tab>
        </ux-tabset>
    `
})
export class TabsetTestComponent {

    tabs: Tab[] = [
        {
            content: 'test text',
            title: 'Schedule',
        },
        {
            content: 'test text',
            title: 'Protection',
        },
        {
            content: 'test text',
            title: 'Solution',
        },
        {
            content: 'test text',
            title: 'Analytics',
        }
    ];

    onTabSelect(): void {
    }

    onTabActivated(): void {
    }

    onTabDeselect(): void {
    }

    onTabDeactivated(): void {
    }

}

describe('Tabset Component', () => {
    let component: TabsetTestComponent;
    let fixture: ComponentFixture<TabsetTestComponent>;
    let nativeElement: HTMLElement;
    let tabset: TabsetComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsetModule],
            declarations: [TabsetTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TabsetTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        tabset = fixture.debugElement.query(By.directive(TabsetComponent)).componentInstance;
        fixture.detectChanges();
    });

    it('should emit activated output when tab is clicked', () => {

        spyOn(component, 'onTabActivated');

        const tab = getTab(1, nativeElement);

        dispatchMouseEvent(tab, 'mousedown');

        expect(component.onTabActivated).toHaveBeenCalled();
    });

    it('should emit select output when tab is clicked', () => {

        spyOn(component, 'onTabSelect');

        const tab = getTab(1, nativeElement);

        dispatchMouseEvent(tab, 'mousedown');

        expect(component.onTabSelect).toHaveBeenCalled();
    });

    it('should emit deactivated output when tab is deselected', () => {

        spyOn(component, 'onTabDeactivated');

        const tab = getTab(2, nativeElement);

        dispatchMouseEvent(tab, 'mousedown');

        expect(component.onTabDeactivated).toHaveBeenCalled();

    });

    it('should emit deselect output when tab is deselected', () => {

        spyOn(component, 'onTabDeselect');

        const tab = getTab(2, nativeElement);

        dispatchMouseEvent(tab, 'mousedown');

        expect(component.onTabDeselect).toHaveBeenCalled();
    });

    it('should change to new tab when tab is programmatically selected by tab index', () => {

        const tab1 = getTabForClass(0, nativeElement);
        const tab3 = getTabForClass(2, nativeElement);

        // check first tab is active
        expect(tab1.classList.contains('active')).toBeTruthy();

        spyOn(component, 'onTabActivated');

        // programatically change tab by index
        tabset.selectTab(2);

        // check second tab is now active/first tab is not active
        expect(tab3.classList.contains('active')).toBeTruthy();
        expect(tab1.classList.contains('active')).toBeFalsy();

        expect(component.onTabActivated).toHaveBeenCalled();
    });

    it('should change to new tab when tab is programmatically selected by tab instance', () => {

        const tab1 = getTabForClass(0, nativeElement);
        const tab3 = getTabForClass(2, nativeElement);

        // check first tab is active
        expect(tab1.classList.contains('active')).toBeTruthy();

        spyOn(component, 'onTabActivated');

        // programatically change tab by instance
        tabset.selectTab(tabset._tabset.tabs[2]);

        // check second tab is now active/first tab is not active
        expect(tab3.classList.contains('active')).toBeTruthy();
        expect(tab1.classList.contains('active')).toBeFalsy();

        expect(component.onTabActivated).toHaveBeenCalled();
    });

});

function getTab(index: number, nativeElement: HTMLElement): HTMLElement {
    return nativeElement.querySelectorAll<HTMLAnchorElement>('ux-tabset ul .nav-link').item(index);
}

function getTabForClass(index: number, nativeElement: HTMLElement): HTMLElement {
    return nativeElement.querySelectorAll<HTMLAnchorElement>('ux-tabset ul .nav-item').item(index);
}

export interface Tab {
    title: string;
    content: string;
}