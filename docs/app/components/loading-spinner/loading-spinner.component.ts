import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'uxd-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent implements OnDestroy {

    visible: boolean;

    private _subscription: Subscription;

    constructor(router: Router, changeDetectorRef: ChangeDetectorRef) {

        this._subscription = router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.visible = true;
            } else if (event instanceof NavigationEnd) {
                this.visible = false;
            }

            changeDetectorRef.markForCheck();
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
        this._subscription = null;
    }
}