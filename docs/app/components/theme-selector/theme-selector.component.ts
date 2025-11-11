import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, inject } from '@angular/core';
import { IconModule, MenuModule } from '@ux-aspects/ux-aspects';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SiteTheme, SiteThemeId } from '../../interfaces/SiteTheme';
import { SiteThemeService } from '../../services/site-theme/site-theme.service';

@Component({
  selector: 'uxd-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuModule, IconModule],
})
export class ThemeSelectorComponent implements OnChanges, OnDestroy {
  private readonly _siteThemeService = inject(SiteThemeService);

  @Input()
  buttonTitle: string;

  @Input()
  themes: ReadonlyArray<SiteTheme> = [];

  dropdownOpen: boolean;
  selected: SiteTheme;
  default: SiteTheme;

  private readonly _onDestroy = new Subject();

  constructor() {
    const _siteThemeService = this._siteThemeService;

    _siteThemeService.theme$
      .pipe(takeUntil(this._onDestroy))
      .subscribe(this.updateWithTheme.bind(this));
  }

  ngOnChanges(): void {
    this.updateWithTheme(this._siteThemeService.theme$.getValue());
    this.default = this.themes[0];
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  setSelected(theme: SiteTheme): void {
    this._siteThemeService.theme$.next(theme.id);
  }

  private updateWithTheme(themeId: SiteThemeId): void {
    this.selected = this.themes.find(theme => theme.id === themeId);
  }
}
