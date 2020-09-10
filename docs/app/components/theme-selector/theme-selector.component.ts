import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Theme } from '../../interfaces/Theme';
import { SiteTheme, SiteThemeService } from '../../services/site-theme/site-theme.service';

@Component({
    selector: 'uxd-theme-selector',
    templateUrl: './theme-selector.component.html',
    styleUrls: ['./theme-selector.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent implements OnChanges, OnDestroy {
    @Input()
    title: string;

    @Input()
    themes: ReadonlyArray<Theme> = [];

    dropdownOpen: boolean;
    selected: Theme;
    default: Theme;

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

    setSelected(theme: Theme): void {
        this._siteThemeService.theme$.next(theme.id);
    }

    private updateWithTheme(themeId: SiteTheme): void {
        this.selected = this.themes.find(theme => theme.id === themeId);
    }
}
