import { Injectable } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { Subject } from 'rxjs';

@Injectable()
export class TooltipService {
    shown$ = new Subject<TooltipComponent>();
}