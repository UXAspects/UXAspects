import { ChangeDetectionStrategy, Component, Input, OnDestroy, inject } from '@angular/core';
import { AccessibilityModule, PopoverModule } from '@ux-aspects/ux-aspects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Migration } from '../../interfaces/Migration';
import { SiteThemeId } from '../../interfaces/SiteTheme';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';
import { SiteThemeService } from '../../services/site-theme/site-theme.service';

@Component({
  selector: 'uxd-migrate-link',
  templateUrl: './migrate-link.component.html',
  styleUrls: ['./migrate-link.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AccessibilityModule, PopoverModule],
})
export class MigrateLinkComponent implements OnDestroy {
  private readonly _siteThemeService = inject(SiteThemeService);
  private readonly _appConfig = inject(AppConfiguration);

  @Input() migration: Migration;

  SiteThemeId = SiteThemeId;
  universalUrl: string = this._appConfig.universalUrl;
  theme: SiteThemeId = this._siteThemeService.theme$.getValue();

  private readonly _onDestroy = new Subject<void>();

  constructor() {
    this._siteThemeService.theme$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(siteThemeId => (this.theme = siteThemeId));
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
