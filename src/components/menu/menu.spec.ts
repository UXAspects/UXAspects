import { OverlayContainer, OverlayRef } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPlacementService } from '../../services/overlay-placement';
import { MenuTriggerDirective } from './menu-trigger/menu-trigger.directive';
import { MenuModule } from './menu.module';

@Component({
  selector: 'app-menu-test',
  template: `
    <ux-menu #menu [alignment]="alignment">
      <button
        type="button"
        id="menu-item-1"
        uxMenuItem
        (click)="onClick()"
        [disabled]="disabled"
        (activate)="onActivate($event)"
      >
        Item One
      </button>
      <ux-menu-divider></ux-menu-divider>
      <button
        uxMenuItem
        [disabled]="disabled"
        #subMenuTrigger="ux-menu-trigger"
        [uxMenuTriggerFor]="subMenu"
      >
        Item Two
      </button>
      <button uxMenuItem>Item Three</button>
    </ux-menu>

    <ux-menu #subMenu>
      <button uxMenuItem id="submenu-item-1"></button>
      <button uxMenuItem>Sub Item Two</button>
    </ux-menu>

    <div>
      <button id="trigger" #menuTrigger="ux-menu-trigger" [uxMenuTriggerFor]="menu">
        Open Menu
      </button>
    </div>
  `,
  standalone: false,
})
export class MenuTestComponent {
  alignment = 'start';
  disabled: boolean = false;
  @ViewChild('menuTrigger', { static: true }) trigger: MenuTriggerDirective;
  @ViewChild('subMenuTrigger', { static: true }) subMenuTrigger: MenuTriggerDirective;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onActivate(_: MouseEvent | KeyboardEvent): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick(_: MouseEvent): void {}
}

describe('MenuComponent', () => {
  let component: MenuTestComponent;
  let fixture: ComponentFixture<MenuTestComponent>;
  let nativeElement: HTMLElement;
  let triggerElement: HTMLButtonElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let overlayPlacement: OverlayPlacementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuModule, NoopAnimationsModule],
      declarations: [MenuTestComponent],
    }).compileComponents();

    // access the overlay container
    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTestComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    triggerElement = nativeElement.querySelector('#trigger');
    overlayPlacement = TestBed.inject(OverlayPlacementService);

    fixture.detectChanges();
  });

  it('should create not initially show the menus', () => {
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
    const backdrop = overlayContainerElement.querySelector(
      '.cdk-overlay-backdrop'
    ) as HTMLDivElement;
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
    expect(document.querySelectorAll('button[uxmenuitem]').length).toBe(3);
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
    const backdrop = overlayContainerElement.querySelector(
      '.cdk-overlay-backdrop'
    ) as HTMLDivElement;
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

  it('should emit an activated event when clicking on menu item', async () => {
    component.trigger.openMenu();
    fixture.detectChanges();
    await fixture.whenStable();

    spyOn(component, 'onActivate');

    const item1Element = overlayContainerElement.querySelector('#menu-item-1') as HTMLButtonElement;
    expect(item1Element).toBeTruthy();
    item1Element.click();

    expect(component.onActivate).toHaveBeenCalledTimes(1);
  });

  it('should emit an activated event when pressing enter key on a menu item', async () => {
    component.trigger.openMenu();
    fixture.detectChanges();
    await fixture.whenStable();

    spyOn(component, 'onActivate');

    const item1Element = overlayContainerElement.querySelector('#menu-item-1') as HTMLButtonElement;
    expect(item1Element).toBeTruthy();
    item1Element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    expect(component.onActivate).toHaveBeenCalledTimes(1);
  });

  it('should not emit a click or activated event when disabled is true.', async () => {
    component.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();

    // open menu
    component.trigger.openMenu();
    fixture.detectChanges();
    await fixture.whenStable();

    // get the child submenu item
    const menuItem = overlayContainerElement.querySelector('#menu-item-1') as HTMLButtonElement;
    expect(menuItem).toBeTruthy();

    spyOn(component, 'onActivate');
    spyOn(component, 'onClick');

    // perform a click
    menuItem.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.onActivate).not.toHaveBeenCalled();
    expect(component.onClick).not.toHaveBeenCalled();
  });

  it('should not open submenu when menu item is disabled ', async () => {
    component.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();

    // open menu
    component.trigger.openMenu();
    fixture.detectChanges();
    await fixture.whenStable();

    component.subMenuTrigger.openMenu();
    fixture.detectChanges();
    await fixture.whenStable();

    // get the child submenu item
    const subItemMenu = overlayContainerElement.querySelector(
      '#submenu-item-1'
    ) as HTMLButtonElement;
    expect(subItemMenu).toBeFalsy();
  });

  it('should contain the role menu in the overlay dropdown', async () => {
    // perform a click on the trigger element
    await triggerElement.click();

    // run change detection
    await fixture.detectChanges();

    // only the root level menu item should be open
    expect(document.querySelectorAll('.ux-menu').length).toBe(1);

    // expect the ux-menu to contain the role
    expect(document.querySelector('.ux-menu').getAttribute('role')).toBe('menu');
  });

  it('should change update the alignment when the alignment input is changed', async () => {
    spyOn(overlayPlacement, 'updatePosition').and.callThrough();

    // change the input
    component.alignment = 'end';

    fixture.detectChanges();
    await fixture.whenStable();

    // expect alignment to be the default
    expect(await overlayPlacement.updatePosition).toHaveBeenCalledWith(
      jasmine.any(OverlayRef),
      'bottom',
      'end',
      undefined
    );
  });
});

@Component({
  selector: 'app-menu-trigger-test',
  template: `
    @if (showTrigger) {
      <div class="btn-group">
        <button
          type="button"
          class="btn button-secondary dropdown-toggle"
          [uxMenuTriggerFor]="menu"
          (closed)="closed()"
        >
          Actions
        </button>
      </div>
    }

    <ux-menu id="ux-menu-1" #menu>
      <button type="button" uxMenuItem>
        <span class="dropdown-menu"></span>
        <span class="dropdown-menu-text">Export</span>
      </button>

      <button
        type="button"
        id="menu-item-2"
        (activate)="onActivate($event)"
        [closeOnSelect]="closeOnSelect"
        uxMenuItem
      >
        <span class="dropdown-menu"></span>
        <span class="dropdown-menu-text">Annotate</span>
      </button>

      <button type="button" uxMenuItem>
        <span class="dropdown-menu"></span>
        <span class="dropdown-menu-text">Save List</span>
      </button>
    </ux-menu>
  `,
  standalone: false,
})
export class MenuTriggerDestroyTestComponent {
  @ViewChild(MenuTriggerDirective, { static: false })
  trigger: MenuTriggerDirective;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onActivate(_: MouseEvent | KeyboardEvent): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  closed(): void {}

  showTrigger: boolean = true;
  closeOnSelect: boolean = true;
}

describe('MenuTriggerDestroyTestComponent', () => {
  let component: MenuTriggerDestroyTestComponent;
  let fixture: ComponentFixture<MenuTriggerDestroyTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuModule, NoopAnimationsModule],
      declarations: [MenuTriggerDestroyTestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTriggerDestroyTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should hide the menu when the trigger element is destroyed.', async () => {
    component.trigger.openMenu();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.querySelectorAll('.ux-menu').length).toBe(1);

    component.showTrigger = false;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.trigger).toBeFalsy();
    expect(document.querySelectorAll('.ux-menu').length).toBe(0);
  });

  it('should not close the menu when an item is clicked when closeOnSelect is false', async () => {
    component.closeOnSelect = false;
    // open menu
    component.trigger.openMenu();

    fixture.detectChanges();
    await fixture.whenStable();

    // close menu by clicking on an item
    const items = document.querySelectorAll<HTMLButtonElement>('button[uxmenuitem]');

    items.item(1).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.querySelectorAll('.ux-menu').length).toBe(1);
  });

  it('should not close the menu item when pressing enter key when closeOnSelect is false', async () => {
    component.closeOnSelect = false;
    component.trigger.openMenu();

    fixture.detectChanges();
    await fixture.whenStable();

    const item2Element = document.querySelector('#menu-item-2') as HTMLButtonElement;
    item2Element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.querySelectorAll('.ux-menu').length).toBe(1);
  });

  it('should contain the aria-controls attribute when the menu is opened', async () => {
    expect(document.querySelector('.btn').getAttribute('aria-controls')).toBe(null);

    // open menu
    component.trigger.openMenu();

    fixture.detectChanges();
    await fixture.whenStable();

    // get the aria-controls overlay
    expect(document.querySelector('.btn').getAttribute('aria-controls')).toBe('ux-menu-1-menu');
  });

  it('should contain the correct id for the ux-menu and the overlay', async () => {
    // open menu
    component.trigger.openMenu();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.querySelector('.ux-menu').getAttribute('id')).toBe('ux-menu-1-menu');
    expect(document.querySelector('ux-menu').getAttribute('id')).toBe('ux-menu-1');
  });

  it('should emit closed when the menu has closed', async () => {
    spyOn(component, 'closed');
    // open menu
    component.trigger.openMenu();

    fixture.detectChanges();
    await fixture.whenStable();

    // close menu by clicking on an item
    const items = document.querySelectorAll<HTMLButtonElement>('button[uxmenuitem]');

    items.item(1).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.closed).toHaveBeenCalledTimes(1);
  });
});
