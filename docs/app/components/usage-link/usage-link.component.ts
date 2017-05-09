import { Usage } from './../../interfaces/Usage';
import { Input, Renderer2, Component, ElementRef, ViewChild } from '@angular/core';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
    selector: 'uxd-usage-link',
    templateUrl: './usage-link.component.html',
    styleUrls: ['./usage-link.component.less'],
    host: {
        '(document:click)': 'onClick($event)',
        '(document:keyup.escape)': 'closePopover()'
    }
})
export class UsageLinkComponent {

    @Input() usage: Usage;

    @ViewChild(PopoverDirective) popover: PopoverDirective;

    private popoverElement: HTMLElement;

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

    onShown() {
        this.popoverElement = (<any>this.popover)._popover._componentRef.location.nativeElement;

        this.renderer.setStyle(this.popoverElement, 'style', '300px');
        this.renderer.setStyle(this.popoverElement, 'maxWidth', '300px');
        this.renderer.setStyle(this.popoverElement, 'borderRadius', '0');
        this.renderer.setStyle(this.popoverElement, 'zIndex', '1');
    }

    closePopover () {
        this.popover.hide();
    }

    onClick(event: MouseEvent) {
        if (!this.popoverElement || !this.popoverElement.contains(event.target as HTMLElement) &&
            !this.elementRef.nativeElement.contains(event.target)) {

            this.popover.hide();
        }
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