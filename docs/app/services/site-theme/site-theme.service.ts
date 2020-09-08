import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PersistentDataService } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SiteThemeService {

    theme$ = new BehaviorSubject<SiteTheme>(SiteTheme.Keppel);

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _persistentDataService: PersistentDataService
    ) { }

    load(): void {
        // Load previously saved value
        const persistedSiteTheme = SiteTheme[this._persistentDataService.getItem('uxd-site-theme')];
        this.theme$.next(persistedSiteTheme || SiteTheme.MicroFocus);

        // Update from changes triggered by the theme page
        this.theme$.pipe(distinctUntilChanged()).subscribe(siteTheme => {
            const link = this._document.querySelector('link#uxd-theme-link') as HTMLLinkElement;
            if (link) {
                switch (siteTheme) {
                    case SiteTheme.MicroFocus:
                        link.href = 'micro-focus.css';
                        break;
                    case SiteTheme.MicroFocus2020:
                        link.href = 'micro-focus-2020.css';
                        break;
                    case SiteTheme.WhiteLabel:
                        link.href = 'white-label.css';
                        break;
                }
            }

            this._persistentDataService.setItem('uxd-site-theme', siteTheme);
        });
    }
}

export enum SiteTheme {
    Keppel = 'Keppel',
    MicroFocus = 'MicroFocus',
    MicroFocus2020 = 'MicroFocus2020',
    WhiteLabel = 'WhiteLabel'
}
