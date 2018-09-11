import { LocationStrategy } from '@angular/common';
import { Directive, HostBinding, HostListener, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil, delay } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { NavigationItem } from '../navigation-item.inferface';
import { NavigationService } from '../navigation.service';

@Directive({
    selector: '[uxNavigationLink]',
    exportAs: 'uxNavigationLink'
})
export class NavigationLinkDirective implements OnInit, OnChanges, OnDestroy {

    @Input()
    navigationItem: NavigationItem;

    @Input()
    set expanded(value: boolean) {
        this._expanded$.next(value);
    }

    @Input()
    canExpand: boolean;

    @Input()
    @HostBinding('class.indent')
    indent: boolean;

    @HostBinding('attr.href')
    href: string;

    @HostBinding('attr.role')
    role: string;

    @HostBinding('attr.aria-expanded')
    ariaExpanded: string = 'undefined';

    isActive: boolean;

    indentChildren: boolean;

    private _expanded$ = new Subject<boolean>();
    private _onDestroy = new Subject<void>();

    constructor(
        private _router: Router,
        private _locationStrategy: LocationStrategy,
        private _navigationService: NavigationService
    ) { }

    ngOnInit(): void {

        this._expanded$.pipe(takeUntil(this._onDestroy)).subscribe(expanded => {
            requestAnimationFrame(() => {
                if (this.navigationItem.children && this.navigationItem.children.length > 0) {
                    this.ariaExpanded = `${expanded}`;
                    this._navigationService.setExpanded(this.navigationItem, expanded);
                }
            });
        });

        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._onDestroy))
            .subscribe(this.updateNavigationState.bind(this));

        this.updateNavigationState();

        this.updateAttributes();
    }

    ngOnChanges(): void {
        this.updateAttributes();
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostListener('click', ['$event'])
    @HostListener('keydown.enter', ['$event'])
    activated(event: Event): boolean {

        if (this.navigationItem.routerLink) {
            const commands = Array.isArray(this.navigationItem.routerLink) ? this.navigationItem.routerLink : [this.navigationItem.routerLink];
            this._router.navigate(commands, this.navigationItem.routerExtras);
        }

        // Toggle expanded state (relevant only if it has children)
        this.navigationItem.expanded = !this.navigationItem.expanded;

        // Invoke the custom click handler if specified
        if (this.navigationItem.click) {
            this.navigationItem.click(event, this.navigationItem);
        }

        return false;
    }

    private updateNavigationState(): void {
        this.isActive = this.isActiveItem(this.navigationItem);

        if (this.navigationItem.children) {
            const activeChild = this.navigationItem.children.find(child => this.isActiveItem(child));
            if (activeChild) {
                this.navigationItem.expanded = true;
            }
        }
    }

    private updateAttributes(): void {

        this.href = this.getHref();
        this.role = (this.navigationItem.children && this.navigationItem.children.length > 0) ? 'button' : 'treeitem';

        this.indentChildren = this.navigationItem.children && this.navigationItem.children.some(item => item.children && item.children.length > 0);
    }

    private getHref(): string {

        if (this.navigationItem.routerLink) {
            const commands = Array.isArray(this.navigationItem.routerLink) ? this.navigationItem.routerLink : [this.navigationItem.routerLink];
            const urlTree = this._router.createUrlTree(commands, this.navigationItem.routerExtras);
            return this._locationStrategy.prepareExternalUrl(this._router.serializeUrl(urlTree));
        }

        return null;
    }

    private isActiveItem(item: NavigationItem): boolean {

        if (item.routerLink) {
            const commands = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            const urlTree = this._router.createUrlTree(commands, item.routerExtras);
            return this._router.isActive(urlTree, true);
        }

        return false;
    }
}