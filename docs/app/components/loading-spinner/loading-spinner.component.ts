import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uxd-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class LoadingSpinnerComponent implements OnDestroy {
  visible: boolean;

  private _subscription: Subscription;

  constructor() {
    const router = inject(Router);
    const changeDetectorRef = inject(ChangeDetectorRef);

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
