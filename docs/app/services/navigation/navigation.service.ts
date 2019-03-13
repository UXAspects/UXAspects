import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../interfaces/ICategory';
import { IDocumentationPage } from '../../interfaces/IDocumentationPage';
import { ILink } from '../../interfaces/ILink';
import { ISection } from '../../interfaces/ISection';
import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { versionFromString, VersionService } from '../version/version.service';


const NAVIGATION_TOP_OFFSET = 50;

// Slight offset for Firefox when checking which section is active
const NAVIGATION_ACTIVE_OFFSET = 51;

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    // This is used to record the ID of the fragment currently in view if the URL was not updated
    private activeFragment: string = null;

    // Reference counter for components that are rendering asynchronously
    private renderingCount: number = 0;

    constructor(@Inject(DOCUMENT) private _document: Document,
        private _activeRoute: ActivatedRoute,
        private _router: Router,
        private _appConfig: AppConfiguration,
        private _versionService: VersionService) { }

    getScrollTop(): number {
        // support all browsers
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    getTopOffset() {
        return NAVIGATION_TOP_OFFSET;
    }

    isScrolledToBottom() {
        return (this.getScrollTop() + window.innerHeight) >= this._document.body.offsetHeight;
    }

    isFragmentActive(id: string) {
        const element = document.getElementById(id);
        if (id === this.activeFragment) {
            return true;
        }
        if (element) {
            // Check if the element intersercts with the top of the viewport, offset for the header
            const bounds = element.getBoundingClientRect();
            if (bounds.top <= NAVIGATION_ACTIVE_OFFSET && bounds.bottom > NAVIGATION_ACTIVE_OFFSET) {
                return true;
            }
        }
        return false;
    }

    setActiveFragment(id: string, replaceOnly: boolean = false, updateUrl: boolean = true) {
        if (updateUrl) {
            // If replaceOnly is specified then only navigate if URL already has a fragment
            if (!replaceOnly || this.urlHasFragment()) {
                // Trigger navigation without updating history
                this._router.navigate([], { fragment: id, replaceUrl: true });
            }
        } else {
            // URL was not updated so store the ID of the active fragment internally
            this.activeFragment = id;
        }
    }

    scrollToFragment(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView(true);
            // Offset for fixed header unless scrolled to the bottom

            if (!this.isScrolledToBottom()) {
                window.scrollBy(0, -this.getTopOffset());
            }
        }
    }

    configureForRoute(route: ActivatedRoute) {
        const category = <ICategory>route.snapshot.data['category'];
        if (category && route.snapshot.fragment) {

            // find the section matching the current route
            const section = category.sections.find((s) => s.id === route.snapshot.fragment);

            // if for some reason there is no section for the current route then fallback to default
            const version = versionFromString(section ? section.version : 'Angular');

            // if no matching section was found or the version has not previously been set or has changed then update it
            if (!section || !this._versionService.isSectionVersionMatch(section) && version !== null) {
                this._versionService.setVersion(version);
            }
        }
    }

    scrollOnNavigationChange(url: string) {
        const parsed = this._router.parseUrl(url);
        if (parsed.fragment) {
            // Check if the navigated section is already in view
            if (!this.isFragmentActive(parsed.fragment) || parsed.fragment !== this._activeRoute.snapshot.fragment) {
                // Otherwise, scroll to the top of that section
                setTimeout(() => {
                    this.scrollToFragment(parsed.fragment);
                });
            }
        } else {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
        this.activeFragment = null;
    }

    setSectionIds(sections: ISection[]) {
        // Ensure that every section has an ID suitable for fragment navigation
        for (let section of sections) {
            if (!section.id) {
                // E.g. ComponentsRadioButtonsNg1Component => radio-buttons-ng1
                section.id = section.component.replace(/^(?:Components|Css|Charts)(.+)Component$/, '$1')
                    .replace(/(.)([A-Z]+)/g, '$1-$2')
                    .toLowerCase();
            }
        }
    }

    getComponentLink(component: string): ILink {
        for (let pageName of this._appConfig.documentationPages) {
            const page = <IDocumentationPage>this._appConfig.getConfigurationData(pageName);
            const pageLink = page.id || page.title.toLowerCase();
            for (let category of page.categories) {
                const section = category.sections.find(s => s.component === component);
                if (section) {
                    return {
                        title: section.title,
                        link: `/${pageLink}/${category.link}`,
                        fragment: section.id
                    };
                }
            }
        }
    }

    private urlHasFragment() {
        return this._activeRoute.snapshot.fragment && this._activeRoute.snapshot.fragment.length;
    }
}
