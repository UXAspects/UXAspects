import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TooltipComponent } from './tooltip.component';

@Injectable()
export class TooltipService {
  shown$ = new Subject<TooltipComponent>();
}
