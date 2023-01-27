import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { LocationStrategy } from '@angular/common';
import {
    Attribute,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    Renderer2,
    SimpleChanges,
    ɵɵsanitizeUrlOrResourceUrl,
} from '@angular/core';
import {
    ActivatedRoute,
    NavigationEnd,
    Params,
    QueryParamsHandling,
    Router,
    UrlTree,
} from '@angular/router';
import { Subject, Subscription } from 'rxjs';

/**
 * This is a temporary directive that will be removed once Angular 14 support can be dropped.
 *
 * It is a modified version of the RouterLink directive from Angular 15.0.0.
 *
 * Angular 15 merged the RouterLink and RouterLinkWithHref directives into a single directive.
 * The issue is that the Angular build tooling is detecting a[routerLink] as using the RouterLink directive,
 * but it is actually using the RouterLinkWithHref directive in Angular 14. As a result, the directive
 * is not being instantiated and the routerLink attribute is not being processed.
 */
@Directive({
    standalone: true,
    selector: '[uxRouterLink]',
})
export class RouterLinkDirective implements OnChanges, OnDestroy {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);
    private readonly renderer = inject(Renderer2);
    private readonly element = inject(ElementRef);
    private readonly locationStrategy? = inject(LocationStrategy, { optional: true });

    private _preserveFragment = false;
    private _skipLocationChange = false;
    private _replaceUrl = false;

    href: string | null = null;

    @HostBinding('attr.target') @Input() target?: string;
    @Input() queryParams?: Params | null;
    @Input() fragment?: string;

    @Input() queryParamsHandling?: QueryParamsHandling | null;
    @Input() state?: { [k: string]: any };
    @Input() relativeTo?: ActivatedRoute | null;

    private commands: any[] | null = null;

    /** Whether a host element is an `<a>` tag. */
    private readonly isAnchorElement: boolean;

    private readonly subscription?: Subscription;

    /** @internal */
    onChanges = new Subject<RouterLinkDirective>();

    constructor(
        @Attribute('tabindex') private readonly tabIndexAttribute: string | null | undefined
    ) {
        const tagName = this.element.nativeElement.tagName;
        this.isAnchorElement = tagName === 'A' || tagName === 'AREA';

        if (this.isAnchorElement) {
            this.subscription = this.router.events.subscribe(s => {
                if (s instanceof NavigationEnd) {
                    this.updateHref();
                }
            });
        } else {
            this.setTabIndexIfNotOnNativeEl('0');
        }
    }

    @Input()
    set preserveFragment(preserveFragment: boolean | string | null | undefined) {
        this._preserveFragment = coerceBooleanProperty(preserveFragment);
    }

    get preserveFragment(): boolean {
        return this._preserveFragment;
    }

    @Input()
    set skipLocationChange(skipLocationChange: boolean | string | null | undefined) {
        this._skipLocationChange = coerceBooleanProperty(skipLocationChange);
    }

    get skipLocationChange(): boolean {
        return this._skipLocationChange;
    }

    @Input()
    set replaceUrl(replaceUrl: boolean | string | null | undefined) {
        this._replaceUrl = coerceBooleanProperty(replaceUrl);
    }

    get replaceUrl(): boolean {
        return this._replaceUrl;
    }

    /**
     * Modifies the tab index if there was not a tabindex attribute on the element during
     * instantiation.
     */
    private setTabIndexIfNotOnNativeEl(newTabIndex: string | null) {
        if (
            this.tabIndexAttribute != null /* both `null` and `undefined` */ ||
            this.isAnchorElement
        ) {
            return;
        }
        this.applyAttributeValue('tabindex', newTabIndex);
    }

    /** @nodoc */
    ngOnChanges(changes: SimpleChanges) {
        if (this.isAnchorElement) {
            this.updateHref();
        }
        // This is subscribed to by `RouterLinkActive` so that it knows to update when there are changes
        // to the RouterLinks it's tracking.
        this.onChanges.next(this);
    }

    @Input('uxRouterLink')
    set routerLink(commands: any[] | string | null | undefined) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
            this.setTabIndexIfNotOnNativeEl('0');
        } else {
            this.commands = null;
            this.setTabIndexIfNotOnNativeEl(null);
        }
    }

    /** @nodoc */
    @HostListener('click', [
        '$event.button',
        '$event.ctrlKey',
        '$event.shiftKey',
        '$event.altKey',
        '$event.metaKey',
    ])
    onClick(
        button: number,
        ctrlKey: boolean,
        shiftKey: boolean,
        altKey: boolean,
        metaKey: boolean
    ): boolean {
        if (this.urlTree === null) {
            return true;
        }

        if (this.isAnchorElement) {
            if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
                return true;
            }

            if (typeof this.target === 'string' && this.target !== '_self') {
                return true;
            }
        }

        const extras = {
            skipLocationChange: this.skipLocationChange,
            replaceUrl: this.replaceUrl,
            state: this.state,
        };
        this.router.navigateByUrl(this.urlTree, extras);

        // Return `false` for `<a>` elements to prevent default action
        // and cancel the native behavior, since the navigation is handled
        // by the Router.
        return !this.isAnchorElement;
    }

    /** @nodoc */
    ngOnDestroy(): any {
        this.subscription?.unsubscribe();
    }

    private updateHref(): void {
        this.href =
            this.urlTree !== null && this.locationStrategy
                ? this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(this.urlTree))
                : null;

        const sanitizedValue =
            this.href === null
                ? null
                : // This class represents a directive that can be added to both `<a>` elements,
                  // as well as other elements. As a result, we can't define security context at
                  // compile time. So the security context is deferred to runtime.
                  // The `ɵɵsanitizeUrlOrResourceUrl` selects the necessary sanitizer function
                  // based on the tag and property names. The logic mimics the one from
                  // `packages/compiler/src/schema/dom_security_schema.ts`, which is used at compile time.
                  //
                  // Note: we should investigate whether we can switch to using `@HostBinding('attr.href')`
                  // instead of applying a value via a renderer, after a final merge of the
                  // `RouterLinkWithHref` directive.
                  ɵɵsanitizeUrlOrResourceUrl(
                      this.href,
                      this.element.nativeElement.tagName.toLowerCase(),
                      'href'
                  );
        this.applyAttributeValue('href', sanitizedValue);
    }

    private applyAttributeValue(attrName: string, attrValue: string | null) {
        const renderer = this.renderer;
        const nativeElement = this.element.nativeElement;
        if (attrValue !== null) {
            renderer.setAttribute(nativeElement, attrName, attrValue);
        } else {
            renderer.removeAttribute(nativeElement, attrName);
        }
    }

    get urlTree(): UrlTree | null {
        if (this.commands === null) {
            return null;
        }
        return this.router.createUrlTree(this.commands, {
            // If the `relativeTo` input is not defined, we want to use `this.route` by default.
            // Otherwise, we should use the value provided by the user in the input.
            relativeTo: this.relativeTo !== undefined ? this.relativeTo : this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: this.preserveFragment,
        });
    }
}
