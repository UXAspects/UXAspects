import { Directive, OnInit } from '@angular/core';
import { ConduitComponent } from './conduit.component';

@Directive({
  selector: 'ux-conduit-zone',
  standalone: false,
})
export abstract class ConduitZoneComponent extends ConduitComponent implements OnInit {
  abstract zoneId: string;

  ngOnInit(): void {
    this._zone.setZoneId(this.zoneId);
    super.ngOnInit();
  }
}
