import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, ViewChild, NgModule, HostListener} from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuTriggerDirective } from './menu-trigger/menu-trigger.directive';
import { MenuModule } from './menu.module';
import { IconModule } from '../icon/index';
import { StringFilterModule } from '../../pipes/string-filter';

@Component({
    selector: 'app-menu-test',
    template: `
    <div class="btn-group" *ngIf="!destroyed">
    <button
        type="button"
        class="btn button-secondary dropdown-toggle"
        [uxMenuTriggerFor]="menu">
        Actions <ux-icon name="down" class="dropdown-icon-inline"></ux-icon>
    </button>
    </div>

  <ux-menu #menu>
    <button uxMenuItem>Item One</button>
    <ux-menu-divider></ux-menu-divider>
    <button uxMenuItem #subMenuTrigger="ux-menu-trigger" [uxMenuTriggerFor]="subMenu"> Item Two</button>
    <button uxMenuItem>Item Three</button>
  </ux-menu>

  <ux-menu #subMenu>
    <button uxMenuItem id="submenu-item-1" *ngFor="let case of cases | stringFilter: caseFilter">
            {{ case }}</button>
    <button uxMenuItem>Sub Item Two</button>
  </ux-menu>

  <div>
    <button id="trigger" #menuTrigger="ux-menu-trigger" [uxMenuTriggerFor]="menu">Open Menu</button>
    </div>`
})
export class MenuTestComponent {

    @ViewChild('menuTrigger', { static: true }) trigger: MenuTriggerDirective;
    @ViewChild('subMenuTrigger', { static: true }) subMenuTrigger: MenuTriggerDirective;
    cases: string[] = [
        'Alpha',
        'Beta',
        'Gamma',
        'Delta',
        'Epsilon',
        'Zeta',
        'Eta',
        'Theta',
        'Iota',
        'Kappa',
        'Alpha 2',
        'Alpha 3',
    ];

    caseFilter: string = '';

    destroyed: boolean = false;

    @HostListener('keydown.space')
    onSpace(): void {
      this.destroyed = true;
    }

}

describe('MenuComponent', () => {
    let component: MenuTestComponent;
    let fixture: ComponentFixture<MenuTestComponent>;
    let nativeElement: HTMLElement;
    let triggerElement: HTMLButtonElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MenuModule, NoopAnimationsModule, IconModule, StringFilterModule],
            declarations: [MenuTestComponent],
        })
            .compileComponents();

        // access the overlay container
        inject([OverlayContainer], (oc: OverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();
    }));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        triggerElement = nativeElement.querySelector('#trigger');

        fixture.detectChanges();
    });

    it('should create not intially show the menus', () => {
        // attempt to find the .ux-menu elements
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    it('should show the menu on trigger click', () => {
        // perform a click on the trigger element
        triggerElement.click();

        // run change detection
        fixture.detectChanges();

        // only the root level menu item should be open
        expect(document.querySelectorAll('.ux-menu').length).toBe(1);
    });

    it('should hide when the trigger is clicked again', async () => {
        // perform a click on the trigger element
        triggerElement.click();

        // run change detection
        fixture.detectChanges();

        // only the root level menu item should be open
        expect(document.querySelectorAll('.ux-menu').length).toBe(1);

        // perform a click on the overlay
        triggerElement.click();

        // run change detection
        fixture.detectChanges();

        // allow noop animation to complete
        await fixture.whenStable();

        // no menus should be visible
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    it('should hide when the outside the menu is clicked', async () => {
        // perform a click on the trigger element
        triggerElement.click();

        // run change detection
        fixture.detectChanges();

        // only the root level menu item should be open
        expect(document.querySelectorAll('.ux-menu').length).toBe(1);

        // get the backdrop element
        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLDivElement;
        expect(backdrop).toBeTruthy();

        // perform a click on the overlay
        backdrop.click();

        // run change detection
        fixture.detectChanges();

        // allow noop animation to complete
        await fixture.whenStable();

        // no menus should be visible
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    it('should show the menu when the trigger is programmatically called', () => {
        component.trigger.openMenu();
        fixture.detectChanges();
        expect(document.querySelectorAll('.ux-menu').length).toBe(1);
    });

    it('should close the menu when the trigger is programmatically called', async () => {
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelectorAll('.ux-menu').length).toBe(1);
        component.trigger.closeMenu();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    it('should toggle the menu when the trigger is programmatically called', async () => {
        component.trigger.toggleMenu();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelectorAll('.ux-menu').length).toBe(1);
        component.trigger.toggleMenu();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    it('should have the correct number of menu items', () => {
        component.trigger.openMenu();
        fixture.detectChanges();
        // find the menu items
        expect(document.querySelectorAll('button[uxmenuitem]').length).toBe(14);
    });

    it('should display the menu divider', () => {
        component.trigger.openMenu();
        fixture.detectChanges();
        // find the menu items
        expect(document.querySelectorAll('ux-menu-divider').length).toBe(1);
    });

    it('should update the aria-expanded state on the trigger', () => {
        expect(triggerElement.getAttribute('aria-haspopup')).toBe('true');
        expect(triggerElement.getAttribute('aria-expanded')).toBe('false');
        component.trigger.openMenu();
        fixture.detectChanges();
        expect(triggerElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should make only the first menu item tabbable', async () => {
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        const items = document.querySelectorAll('button[uxmenuitem]');

        expect(items.item(0).getAttribute('tabindex')).toBe('0');
        expect(items.item(1).getAttribute('tabindex')).toBe('-1');
        expect(items.item(2).getAttribute('tabindex')).toBe('-1');
    });

    it('should focus the menu trigger when the menu is closed', async () => {

        // open menu
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        // close menu by clicking on an item
        const items = document.querySelectorAll<HTMLButtonElement>('button[uxmenuitem]');
        items.item(0).click();
        fixture.detectChanges();
        await fixture.whenStable();

        // the trigger element should be focused
        expect(document.activeElement).toBe(triggerElement);
    });

    it('should show the submenu when the menu item is hovered', async () => {
        // open menu
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        // dispatch a mouse enter event
        component.subMenuTrigger._onMouseEnter();

        fixture.detectChanges();
        await fixture.whenStable();

        expect(document.querySelectorAll('.ux-menu').length).toBe(2);
    });

    it('should close all menus when backdrop is clicked', async () => {
        // open menu
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        // dispatch a mouse enter event
        component.subMenuTrigger._onMouseEnter();

        fixture.detectChanges();
        await fixture.whenStable();

        // get the backdrop element
        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLDivElement;
        expect(backdrop).toBeTruthy();

        // perform a click on the overlay
        backdrop.click();

        // run change detection
        fixture.detectChanges();

        // allow noop animation to complete
        await fixture.whenStable();

        // no menus should be visible
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    it('should close the menu when an item is clicked', async () => {
        // open menu
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        // close menu by clicking on an item
        const items = document.querySelectorAll<HTMLButtonElement>('button[uxmenuitem]');
        items.item(0).click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    it('should close both menus when a menu item is clicked', async () => {
        // open menu
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        // dispatch a mouse enter event
        component.subMenuTrigger._onMouseEnter();

        fixture.detectChanges();
        await fixture.whenStable();

        // close menu by clicking on an item
        const items = document.querySelectorAll<HTMLButtonElement>('button[uxmenuitem]');
        items.item(0).click();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);
    });

    /**
     * Test case covering issue: https://portal.digitalsafe.net/browse/EL-3644
     *
     * Opening a menu, expanding a submenu and selecting an item would close
     * the menu, hover when the top level menu is re-opened the internal hover
     * and focus states were not being reset correctly
     */
    it('should correctly reset menu state when closed', async () => {
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        component.subMenuTrigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        // get the child submenu item
        const submenuItem = document.querySelector<HTMLButtonElement>('#submenu-item-1');

        expect(submenuItem).toBeTruthy();

        // perform a click
        submenuItem.click();
        fixture.detectChanges();
        await fixture.whenStable();

        // the menu should now be closed check the internal menu state is correct
        expect(component.trigger.menu._isHovering$.value).toBeFalsy();
        expect(component.trigger.menu._isFocused$.value).toBeFalsy();
        expect(component.subMenuTrigger.menu._isHovering$.value).toBeFalsy();
        expect(component.subMenuTrigger.menu._isFocused$.value).toBeFalsy();

    });
    it('should hide the menu when the trigger element is destroyed.' , async () => {
        component.trigger.openMenu();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(document.querySelectorAll('.ux-menu').length).toBe(1);

        component.trigger.ngOnDestroy();
        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.cases).toBeTruthy();
        expect(document.querySelectorAll('.ux-menu').length).toBe(0);

      });


});