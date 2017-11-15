import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { ICategory } from '../../interfaces/ICategory';
import { ISection } from '../../interfaces/ISection';
import { VersionService, versionFromString } from '../version/version.service';

const NAVIGATION_TOP_OFFSET = 50;

// Slight offset for Firefox when checking which section is active
const NAVIGATION_ACTIVE_OFFSET = 51;

@Injectable()
export class NavigationService {

    // This is used to record the ID of the fragment currently in view if the URL was not updated
    private activeFragment: string = null;

    // Reference counter for components that are rendering asynchronously
    private renderingCount: number = 0;

    constructor( @Inject(DOCUMENT) private document: Document,
        private activeRoute: ActivatedRoute,
        private router: Router,
        private versionService: VersionService) { }

    getScrollTop(): number {
        // support all browsers
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

    getTopOffset() {
        return NAVIGATION_TOP_OFFSET;
    }

    isScrolledToBottom() {
        return (this.getScrollTop() + window.innerHeight) >= this.document.body.offsetHeight;
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
                this.router.navigate([], { fragment: id, replaceUrl: true });
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
            const section = category.sections.find((s) => s.id === route.snapshot.fragment);
            const version = versionFromString(section.version);
            if (!this.versionService.isSectionVersionMatch(section) && version !== null) {
                this.versionService.setVersion(version);
            }
        }
    }

    scrollOnNavigationChange(url: string) {
        const parsed = this.router.parseUrl(url);
        if (parsed.fragment) {
            // Check if the navigated section is already in view
            if (!this.isFragmentActive(parsed.fragment) || parsed.fragment !== this.activeRoute.snapshot.fragment) {
                // Otherwise, scroll to the top of that section
                setTimeout(() => {
                    this.scrollToFragment(parsed.fragment);
                });
            }
        } else {
            this.document.body.scrollTop = 0;
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

    private urlHasFragment() {
        return this.activeRoute.snapshot.fragment && this.activeRoute.snapshot.fragment.length;
    }
}