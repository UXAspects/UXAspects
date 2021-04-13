import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PersistentDataService } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SiteThemeId } from '../../interfaces/SiteTheme';

@Injectable({
    providedIn: 'root'
})
export class SiteThemeService {

    theme$ = new BehaviorSubject<SiteThemeId>(SiteThemeId.Keppel);

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _persistentDataService: PersistentDataService
    ) { }

    load(): void {
        // Load previously saved value
        const persistedSiteTheme = SiteThemeId[this._persistentDataService.getItem('uxd-site-theme')];
        this.theme$.next(persistedSiteTheme || SiteThemeId.MicroFocus);

        // Update from changes triggered by the theme page
        this.theme$.pipe(distinctUntilChanged()).subscribe(siteTheme => {
            const link = this._document.querySelector('link#uxd-theme-link') as HTMLLinkElement;
            if (link) {
                switch (siteTheme) {
                    case SiteThemeId.MicroFocus:
                        link.href = 'micro-focus.css';
                        break;
                    case SiteThemeId.MicroFocusNext:
                        link.href = 'micro-focus-next.css';
                        break;
                    case SiteThemeId.Roboto:
                        link.href = 'roboto.css';
                        break;
                    case SiteThemeId.WhiteLabel:
                        link.href = 'white-label.css';
                        break;
                }
            }

            this._persistentDataService.setItem('uxd-site-theme', siteTheme);
        });
    }
}


