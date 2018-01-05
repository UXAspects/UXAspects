import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ux-ebox',
    templateUrl: './ebox.component.html',
    styleUrls: ['./ebox.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class EboxComponent { }

@Directive({
    selector: 'ux-ebox-header'
})
export class EboxHeaderDirective { }

@Directive({
    selector: 'ux-ebox-content'
})
export class EboxContentDirective { }
