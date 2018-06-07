import { AfterContentInit, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList, Renderer2 } from '@angular/core';
import { MenuNavigationItemDirective } from './menu-navigation-item.directive';
import { MenuNavigationToggleDirective } from './menu-navigation-toggle.directive';
import { MenuNavigationService } from './menu-navigation.service';
export declare class MenuNavigationDirective implements OnInit, AfterContentInit, OnDestroy {
    private _service;
    private _elementRef;
    private _renderer;
    toggleButton: MenuNavigationToggleDirective;
    toggleButtonPosition: 'top' | 'right' | 'bottom' | 'left';
    navigatedOut: EventEmitter<KeyboardEvent>;
    items: QueryList<MenuNavigationItemDirective>;
    readonly activeIndex: number;
    private _itemsOrdered;
    private _document;
    private _subscription;
    constructor(_service: MenuNavigationService, _elementRef: ElementRef, _renderer: Renderer2, document: any);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    focusFirst(): void;
    private keydownHandler(event);
    private moveNext(event);
    private movePrevious(event);
    private moveFirst();
    private moveLast();
    private moveToToggleButton(event);
}
