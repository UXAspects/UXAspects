import { Injectable, DOCUMENT, inject } from '@angular/core';
import { PersistentDataService } from '@ux-aspects/ux-aspects';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SiteThemeId } from '../../interfaces/SiteTheme';

@Injectable({
  providedIn: 'root',
})
export class SiteThemeService {
  private readonly _document = inject<Document>(DOCUMENT);
  private readonly _persistentDataService = inject(PersistentDataService);

  theme$ = new BehaviorSubject<SiteThemeId>(SiteThemeId.Keppel);

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
            link.href = 'theme-micro-focus.css';
            break;
          case SiteThemeId.MicroFocus2017:
            link.href = 'theme-micro-focus-2017.css';
            break;
          case SiteThemeId.MicroFocus2017Roboto:
            link.href = 'theme-micro-focus-2017-roboto.css';
            break;
          case SiteThemeId.WhiteLabel:
            link.href = 'theme-white-label.css';
            break;
        }
      }

      this._persistentDataService.setItem('uxd-site-theme', siteTheme);
    });
  }
}
