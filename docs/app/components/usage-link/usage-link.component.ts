import { Usage } from './../../interfaces/Usage';
import { Input, Component, Directive } from '@angular/core';

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
    @Input() test: string;
    @Input() pop: string;

    popoverContent = ``;

    isUsageEnabled() {
        return this.usage;
    }

    hide($event: Event, pop: Directive) {
        console.log(this.usage);
        // let target = event.target;
        // console.log(target);
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