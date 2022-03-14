import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Migration } from '../../interfaces/Migration';
import { SiteThemeId } from '../../interfaces/SiteTheme';
import { SiteThemeService } from '../../services/site-theme/site-theme.service';

@Component({
    selector: 'uxd-migrate-link',
    templateUrl: './migrate-link.component.html',
    styleUrls: ['./migrate-link.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MigrateLinkComponent implements OnDestroy {

    @Input() migration: Migration;

    SiteThemeId = SiteThemeId;
    theme: SiteThemeId = this._siteThemeService.theme$.getValue();

    private _onDestroy = new Subject<void>();

    constructor(private _siteThemeService: SiteThemeService) {
        this._siteThemeService.theme$
            .pipe(takeUntil(this._onDestroy))
            .subscribe(siteThemeId => this.theme = siteThemeId);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

}