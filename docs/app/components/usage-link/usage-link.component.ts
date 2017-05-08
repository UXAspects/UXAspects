import { Usage } from './../../interfaces/Usage';
import { Input, Renderer2, Component } from '@angular/core';

@Component({
    selector: 'uxd-usage-link',
    templateUrl: './usage-link.component.html',
    styleUrls: ['./usage-link.component.less'],
    host: {
        '(document:click)': 'onClick($event, pop)',
        '(document:keyup.escape)': 'closePopover()'
    }
})
export class UsageLinkComponent {

    @Input() usage: Usage;
    @Input() pop: string;

    private popover: any;
    private popoverElement: any;
    private usageElement: any;


    constructor(private renderer: Renderer2) {}

    onShown(event: any, popover: any) {
        this.usageElement = event.content.elementRef.nativeElement.parentElement;
        this.popover = popover;
        this.popoverElement = popover._popover._componentRef.location.nativeElement;

        this.renderer.setStyle(this.popoverElement, 'style', '300px');
        this.renderer.setStyle(this.popoverElement, 'maxWidth', '300px');
        this.renderer.setStyle(this.popoverElement, 'borderRadius', '0');
        this.renderer.setStyle(this.popoverElement, 'zIndex', '1');
    }

    closePopover () {
        if (this.popover) {
            this.popover.hide();
        }
    }

    onClick(event: any){
        if (!this.popover) {
            return;
        }
        let target = event.target;
        while (target.parentNode) {
            if(target !== this.popoverElement && target !== this.usageElement) {
                target = target.parentNode
            } else {
                return;
            }
        }
        this.popover.hide();
    }

    // copy to clipboard button
    copy(text: string) {
        let dummy = this.renderer.createElement('input');
        this.renderer.appendChild(this.popoverElement, dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        this.renderer.removeChild(this.popoverElement, dummy);
    }
}