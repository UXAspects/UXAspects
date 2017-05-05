import { Usage } from './../../interfaces/Usage';
import { Input, Renderer2, Component } from '@angular/core';

@Component({
    selector: 'uxd-usage-link',
    templateUrl: './usage-link.component.html',
    styleUrls: ['./usage-link.component.less'],
    host: {
        '[class.enabled]': 'isUsageEnabled()'
    }
})
export class UsageLinkComponent{

    @Input() usage: Usage;
    @Input() pop: string;

    private popoverElement: any;

    constructor(private renderer: Renderer2) { }

    isUsageEnabled() {
        return this.usage;
    }

    onShown(popover: any) {

        this.popoverElement = popover._popover._componentRef.location.nativeElement;

        this.renderer.setStyle(this.popoverElement, 'style', '300px');
        this.renderer.setStyle(this.popoverElement, 'maxWidth', '300px');
        this.renderer.setStyle(this.popoverElement, 'borderRadius', '0');
        this.renderer.setStyle(this.popoverElement, 'zIndex', '1');
    }

    //copy to clipboard button
    copy(text: string) {
        let dummy = this.renderer.createElement('input');
        this.renderer.appendChild(this.popoverElement, dummy);
        this.renderer.setAttribute(dummy, 'id', 'dummy_id');
        (<HTMLInputElement>document.getElementById('dummy_id')).value = text;
        dummy.select();
        document.execCommand('copy');
        this.renderer.removeChild(this.popoverElement, dummy);
    }
}