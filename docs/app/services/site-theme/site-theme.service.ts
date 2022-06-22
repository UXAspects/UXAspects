import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SiteThemeId } from '../../interfaces/SiteTheme';
import { DOCUMENT } from '@angular/common';
import { PersistentDataService } from '@ux-aspects/ux-aspects';

@Injectable({
    providedIn: 'root'
})
export class SiteThemeService {

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
            if (link) {
                switch (siteTheme) {
                    case SiteThemeId.MicroFocus:
                        link.href = 'assets/themes/micro-focus/css/main.css';
                        break;
                    case SiteThemeId.MicroFocus2017:
                        link.href = 'assets/themes/micro-focus-2017/css/main.css';
                        break;
                    case SiteThemeId.MicroFocus2017Roboto:
                        link.href = 'assets/themes/micro-focus-2017-roboto/css/main.css';
                        break;
                    case SiteThemeId.WhiteLabel:
                        link.href = 'assets/themes/white-label/css/main.css';
                        break;
                }
            }

            this._persistentDataService.setItem('uxd-site-theme', siteTheme);
        });
    }
}


