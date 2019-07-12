import { LocationStrategy } from '@angular/common';
import { ChangeDetectorRef, Directive, HostBinding, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { tick } from '../../../common/index';
import { NavigationItem, NavigationItemRouterOptions } from '../navigation-item.inferface';
import { NavigationModuleOptions, NAVIGATION_MODULE_OPTIONS } from '../navigation-options';
import { NavigationService } from '../navigation.service';

@Directive({
    selector: '[uxNavigationLink]',
    exportAs: 'uxNavigationLink'
})
export class NavigationLinkDirective implements OnInit, OnChanges, OnDestroy {

    /** The NavigationItem this element represents */
    @Input() navigationItem: NavigationItem;

    /** The expaned state of this item */
    @Input() set expanded(value: boolean) { this._expanded$.next(value); }

    /** Determine if this item can be expanded */
    @Input() canExpand: boolean;

    /** Determine if this item should be indented */
    @Input() @HostBinding('class.indent') indent: boolean;

    /** Determine the href of this element */
    @HostBinding('attr.href') href: string;

    /** Determine the role of this element */
    @HostBinding('attr.role') role: string;

    /** Update the aria-expanded attribute of this element */
    @HostBinding('attr.aria-expanded') ariaExpanded: boolean;

    /** Store the active state of the item */
    isActive: boolean;

    /** Store the indendation state of the children */
    indentChildren: boolean;

    /** Emit with the current expaned state */
    private _expanded$ = new Subject<boolean>();

    /** Unsubscribe from all observables when this directive is destroyed */
    private _onDestroy = new Subject<void>();

    constructor(
        private _router: Router,
        private _locationStrategy: LocationStrategy,
        private _navigationService: NavigationService,
        private _changeDetector: ChangeDetectorRef,
        private _route: ActivatedRoute,
        @Optional() @Inject(NAVIGATION_MODULE_OPTIONS) private _options: NavigationModuleOptions
    ) { }

    ngOnInit(): void {

        // any time expanded state anywhere change we should run change detection in case we should collapse
        this._navigationService.expanded$.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this._changeDetector.markForCheck());

        this._expanded$.pipe(tick(), takeUntil(this._onDestroy)).subscribe(expanded => {
            if (this.navigationItem.children && this.navigationItem.children.length > 0) {
                this.ariaExpanded = expanded;
                this._navigationService.setExpanded(this.navigationItem, expanded);
            }
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

        this._changeDetector.markForCheck();
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

        const { exact, ignoreQueryParams } = this.getRouterOptions(item);

        if (item.routerLink) {

            let routerExtras = item.routerExtras;

            // if we are to ignore the query params we must remove them
            if (ignoreQueryParams) {
                // get the current actual query params
                const { queryParams } = this._route.snapshot;

                // override the provided query params with the actual query params so they will alway match
                routerExtras = { ...routerExtras, queryParams };
            }

            const commands = Array.isArray(item.routerLink) ? item.routerLink : [item.routerLink];
            const urlTree = this._router.createUrlTree(commands, routerExtras);

            return this._router.isActive(urlTree, exact);
        }

        return false;
    }

    /** Get the router options with defaults for missing properties */
    private getRouterOptions(item: NavigationItem): NavigationItemRouterOptions {

        // get the default options based on the ones provided in `forRoot`
        const defaultOptions = { exact: true, ignoreQueryParams: false, ...(this._options ? this._options.routerOptions : {}) };

        // if there are item specific router options they should take precendence
        return { ...defaultOptions, ...item.routerOptions };
    }
}