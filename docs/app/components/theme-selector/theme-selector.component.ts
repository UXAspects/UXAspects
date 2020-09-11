import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SiteTheme, SiteThemeId } from '../../interfaces/SiteTheme';
import { SiteThemeService } from '../../services/site-theme/site-theme.service';

@Component({
    selector: 'uxd-theme-selector',
    templateUrl: './theme-selector.component.html',
    styleUrls: ['./theme-selector.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent implements OnChanges, OnDestroy {
    @Input()
    buttonTitle: string;

    @Input()
    themes: ReadonlyArray<SiteTheme> = [];

    dropdownOpen: boolean;
    selected: SiteTheme;
    default: SiteTheme;

    private _onDestroy = new Subject();

    constructor(private readonly _siteThemeService: SiteThemeService) {
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
