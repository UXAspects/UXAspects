import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from '../../interfaces/ICategory';
import { NavigationService } from '../../services/navigation/navigation.service';
import { VersionService } from '../../services/version/version.service';

@Component({
    selector: 'uxd-documentation-category',
    templateUrl: './documentation-category.component.html'
})
export class DocumentationCategoryComponent implements OnInit, AfterViewInit {

    category: ICategory;
    private trackScroll: boolean = false;
    private versionSub: Subscription;

    constructor(private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _navigation: NavigationService,
        private _changeDetectorRef: ChangeDetectorRef,
        public versionService: VersionService) {
        // get version
        this.versionSub = this.versionService.version.subscribe(() => {
            if (this.category) {
                let hasSection = !!this.category.sections.find((section) => this.versionService.isSectionVersionMatch(section));
                if (!hasSection) {
                    this._router.navigate(['/'], {});
                }
            }

            this._changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy() {
        this.versionSub.unsubscribe();
    }

    ngOnInit() {
        // Fetch category details from the route metadata
        this.category = this._activatedRoute.snapshot.data['category'];
        this._navigation.setSectionIds(this.category.sections);
    }

    ngAfterViewInit() {
        this.trackScroll = true;
    }

    @HostListener('window:scroll')
    onWindowScroll() {
        if (this.trackScroll) {
            setTimeout(() => this.updateActiveSection());
        }
    }

    private updateActiveSection() {
        let activeSection = null;
        let replaceOnly = false;
        let updateUrl = true;

        // Check all sections in this category to find the one in view (at the top of the visible view)
        for (let section of this.category.sections) {

            // Check fragment corresponding to section ID.
            if (this._navigation.isFragmentActive(section.id)) {

                activeSection = section;

                // Special case - if the user clicked the link to a section that caused the window to
                // scroll to the bottom, then potentially the section above it will be in view.
                // Set a flag to not update the URL in that case (it should remain as the section clicked).
                updateUrl = !this._navigation.isScrolledToBottom();

                break;
            }
        }

        // Check if no section matched, this means that the document is scrolled at or near the top.
        if (activeSection === null) {

            // find all currently visible sections
            let sections = this.category.sections.filter(section => this.versionService.isSectionVersionMatch(section));

            // ensure there is at least one match
            if (sections.length === 0) {
                sections = this.category.sections;
            }

            // Make the first section active.
            activeSection = sections[0];

            // To prevent initially navigating to the first section and hiding the banner, this flag
            // indicates that the URL should only be updated if it already has a fragment.
            replaceOnly = true;
        }

        // Set the active fragment to update the URL in sync with the scroll position
        this._navigation.setActiveFragment(activeSection.id, replaceOnly, updateUrl);

        // indicate their may be changes
        this._changeDetectorRef.markForCheck();
    }
}