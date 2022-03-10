import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Upgrade } from '../../interfaces/Upgrade';

@Component({
    selector: 'uxd-upgrade-link',
    templateUrl: './upgrade-link.component.html',
    styleUrls: ['./upgrade-link.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpgradeLinkComponent {

    @Input() upgrade: Upgrade;

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {}

}