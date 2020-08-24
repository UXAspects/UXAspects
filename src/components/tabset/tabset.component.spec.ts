import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { dispatchMouseEvent } from '../../common/testing';
import { TabsetComponent } from './tabset.component';
import { TabsetModule } from './tabset.module';

@Component({
    selector: 'app-tabset-test',
    template: `
        <ux-tabset [minimal]="true" aria-label="Tabset Example" #tabset>
            <ux-tab
                [active]="tab.active"
                (activeChange)="activeChange(tab.title, $event)"
                (deactivated)="onTabDeactivated()"
                (activated)="onTabActivated()"
                customClass="text-center"
                *ngFor="let tab of tabs"
            >
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

    activeChange(_tab: Tab, _active: boolean) { }

    onTabActivated(): void { }

    onTabDeactivated(): void { }

    @ViewChild('tabset', { static: true })
    public tabset: TabsetComponent;

}

describe('Tabset Component', () => {
    let component: TabsetTestComponent;
    let fixture: ComponentFixture<TabsetTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsetModule],
            declarations: [TabsetTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TabsetTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('should emit activated output when tab is clicked', async () => {

        spyOn(component, 'onTabActivated');

        await clickTab(1);

        expect(component.onTabActivated).toHaveBeenCalled();
    });

    it('should emit deactivated output when tab is deselected', async () => {

        spyOn(component, 'onTabDeactivated');

        await clickTab(2);

        expect(component.onTabDeactivated).toHaveBeenCalled();
    });

    it('should emit activeChange output when tab is selected', async () => {

        const activeChangeSpy = spyOn(component, 'activeChange');

        await clickTab(2);

        expect(activeChangeSpy.calls.allArgs()).toEqual([['Schedule', false], ['Solution', true]]);
    });

    it('should change to new tab when tab is programmatically selected by tab index', fakeAsync(() => {

        const tab1 = getTabItem(0);
        const tab3 = getTabItem(2);

        // check first tab is active
        expect(tab1.classList.contains('active')).toBeTruthy();

        spyOn(component, 'onTabActivated');

        // programatically change tab by index
        component.tabset.selectTab(2);
        tick(20);

        // check second tab is now active/first tab is not active
        expect(tab3.classList.contains('active')).toBeTruthy();
        expect(tab1.classList.contains('active')).toBeFalsy();

        // check tab contains correct content
        expect(nativeElement.querySelector('.tab-pane[aria-hidden="false"] h4').innerHTML).toEqual('Solution');

        expect(component.onTabActivated).toHaveBeenCalled();
    }));

    it('should change to new tab when tab is programmatically selected by tab instance', fakeAsync(() => {

        const tab1 = getTabItem(0);
        const tab3 = getTabItem(2);

        // check first tab is active
        expect(tab1.classList.contains('active')).toBeTruthy();

        spyOn(component, 'onTabActivated');

        // programatically change tab by instance
        component.tabset.selectTab(component.tabset._tabset.tabs[2]);
        tick(20);

        // check second tab is now active/first tab is not active
        expect(tab3.classList.contains('active')).toBeTruthy();
        expect(tab1.classList.contains('active')).toBeFalsy();

        // check tab contains correct content
        expect(nativeElement.querySelector('.tab-pane[aria-hidden="false"] h4').innerHTML).toEqual('Solution');

        expect(component.onTabActivated).toHaveBeenCalled();
    }));

    it('should change to a tab when the `active` property is set to true', async () => {

        const tab1 = getTabItem(0);
        const tab3 = getTabItem(2);

        // check first tab is active
        expect(tab1.classList.contains('active')).toBe(true);

        // set tab 3 to be active
        component.tabs[2].active = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(tab1.classList.contains('active')).toBe(false);
        expect(tab3.classList.contains('active')).toBe(true);

        // check tab contains correct content
        expect(nativeElement.querySelector('.tab-pane[aria-hidden="false"] h4').innerHTML).toEqual('Solution');
    });

    it('should change to the most recent tab when multiple `active` properties are set to true', async () => {

        const tab1 = getTabItem(0);
        const tab2 = getTabItem(1);
        const tab3 = getTabItem(2);

        // check first tab is active
        expect(tab1.classList.contains('active')).toBe(true);

        // set tab 2 to be active
        component.tabs[1].active = true;
        fixture.detectChanges();
        await fixture.whenStable();

        // set tab 3 to be active
        component.tabs[2].active = true;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(tab1.classList.contains('active')).toBe(false);
        expect(tab2.classList.contains('active')).toBe(false);
        expect(tab3.classList.contains('active')).toBe(true);

        // check tab contains correct content
        expect(nativeElement.querySelector('.tab-pane[aria-hidden="false"] h4').innerHTML).toEqual('Solution');
    });

    async function clickTab(index: number): Promise<void> {
        const tab = getTabLink(index);
        dispatchMouseEvent(tab, 'mousedown');
        await fixture.whenStable();
    }

    function getTabLink(index: number): HTMLElement {
        return nativeElement.querySelectorAll<HTMLAnchorElement>('ux-tabset ul .nav-link').item(index);
    }

    function getTabItem(index: number): HTMLElement {
        return nativeElement.querySelectorAll<HTMLAnchorElement>('ux-tabset ul .nav-item').item(index);
    }
});

export interface Tab {
    title: string;
    content: string;
    active?: boolean;
}
