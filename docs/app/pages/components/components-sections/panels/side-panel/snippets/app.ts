import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  open = false;
  inline = false;
  attachTo = 'window';
  width = '50%';
  minWidth: string;
  maxWidth: string;
  top = '0';
  modal = false;
  animate = true;
  closeOnExternalClick = false;
  closeOnEscape = true;

  announce(isOpen: boolean): void {
    this._liveAnnouncer.announce(`Side panel ${isOpen ? 'opened' : 'closed'}.`, 'assertive');
  }
}
