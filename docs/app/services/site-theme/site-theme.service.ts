import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {PersistentDataService} from '@ux-aspects/ux-aspects';
import {BehaviorSubject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';
import {SiteThemeId} from '../../interfaces/SiteTheme';
import {Direction} from "@angular/cdk/bidi";

@Injectable({
    providedIn: 'root'
})
export class SiteThemeService {

    direction: Direction = 'ltr';
    theme$ = new BehaviorSubject<SiteThemeId>(SiteThemeId.Keppel);

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _persistentDataService: PersistentDataService
    ) {
    }

    load(): void {
        // Load previously saved value
        const persistedSiteTheme = SiteThemeId[this._persistentDataService.getItem('uxd-site-theme')];
        this.theme$.next(persistedSiteTheme || SiteThemeId.MicroFocus);

        // Update from changes triggered by the theme page
        this.theme$.pipe(distinctUntilChanged()).subscribe(siteTheme => {
            const link = this._document.querySelector('link#uxd-theme-link') as HTMLLinkElement;
            switch (siteTheme) {
                case SiteThemeId.Keppel:
                    this.direction = 'ltr';
                    if (link) {
                        link.href = '';
                    }
                    break;
                case SiteThemeId.KeppelRTL:
                    this.direction = 'rtl';
                    if (link) {
                        link.href = '';
                    }
                    break;
                case SiteThemeId.MicroFocus:
                    this.direction = 'ltr';
                    if (link) {
                        link.href = 'micro-focus.css';
                    }
                    break;
                case SiteThemeId.MicroFocus2020:
                    this.direction = 'ltr';
                    if (link) {
                        link.href = 'micro-focus-2020.css';
                    }
                    break;
                case SiteThemeId.MicroFocusRTL2020:
                    this.direction = 'rtl';
                    if (link) {
                        link.href = 'micro-focus-2020-rtl.css';
                    }
                    break;
                case SiteThemeId.WhiteLabel:
                    this.direction = 'ltr';
                    if (link) {
                        link.href = 'white-label.css';
                    }
                    break;
            }

            this._persistentDataService.setItem('uxd-site-theme', siteTheme);
        });
    }
}


