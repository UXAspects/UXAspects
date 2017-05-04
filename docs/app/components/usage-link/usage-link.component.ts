import { Usage } from './../../interfaces/Usage';
import { Input, Component } from '@angular/core';

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

    isUsageEnabled() {
        return this.usage;
    }

    onShown(popover: any) {
        let popoverElement = popover._popover._componentRef.location.nativeElement;
        popoverElement.style.width = '400px';
        popoverElement.style.borderRadius = '0';
        popoverElement.style.zIndex = '1';
    }

    //copy to clipboard button
    copy(text: string) {
        let dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.setAttribute('id', 'dummy_id');
        (<HTMLInputElement>document.getElementById('dummy_id')).value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
    }
}