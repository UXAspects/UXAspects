import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsetModule } from './tabset.module';
import { Component } from '@angular/core';
import { dispatchMouseEvent } from '../../common/testing';

@Component({
    selector: 'app-tabset-test',
    template: `
        <ux-tabset [minimal]="true" aria-label="Tabset Example">
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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsetModule],
            declarations: [TabsetTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TabsetTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should emit activated output when tab is clicked and emit deactivated output when tab deselected', () => {

        spyOn(component, 'onTabActivated');
        spyOn(component, 'onTabDeactivated');

        const tab = getTab(1, nativeElement);

        dispatchMouseEvent(tab, 'mousedown');

        expect(component.onTabActivated).toHaveBeenCalled();
        expect(component.onTabDeactivated).toHaveBeenCalled();

    });

    it('should emit select output when tab is clicked and emit deselect output when tab deselected', () => {

        spyOn(component, 'onTabSelect');
        spyOn(component, 'onTabDeselect');

        const tab = getTab(1, nativeElement);

        dispatchMouseEvent(tab, 'mousedown');

        expect(component.onTabSelect).toHaveBeenCalled();
        expect(component.onTabDeselect).toHaveBeenCalled();
    });

});

function getTab(index: number, nativeElement: HTMLElement): HTMLElement {
    return nativeElement.querySelectorAll<HTMLAnchorElement>('ux-tabset ul .nav-link').item(index);
}

export interface Tab {
    title: string;
    content: string;
}