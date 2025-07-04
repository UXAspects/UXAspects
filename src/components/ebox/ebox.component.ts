import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

@Component({
    selector: 'ux-ebox',
    templateUrl: './ebox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EboxComponent { }

@Directive({
    selector: 'ux-ebox-header',
    standalone: false
})
export class EboxHeaderDirective { }

@Directive({
    selector: 'ux-ebox-content',
    standalone: false
})
export class EboxContentDirective { }
