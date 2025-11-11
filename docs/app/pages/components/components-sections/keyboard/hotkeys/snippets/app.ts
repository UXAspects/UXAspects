import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(window:keydown.q)': 'focusNextQ()',
    '(window:keydown.w)': 'focusNextW()',
  },
})
export class AppComponent {
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  qText: string = 'None';
  wText: string = 'None';
  qFocused: number = null;
  wFocused: number = null;

  announce(item: string): void {
    this._liveAnnouncer.announce(`${item} selected`);
  }

  focusNextQ() {
    this.qFocused = this.qFocused === null || this.qFocused === 3 ? 0 : this.qFocused + 1;
  }

  focusNextW() {
    this.wFocused = this.wFocused === null || this.wFocused === 3 ? 0 : this.wFocused + 1;
  }
}
