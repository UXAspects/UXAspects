import { Component, Directive, Input, SimpleChange } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'ux-item-display-panel',
    templateUrl: './item-display-panel.component.html',
    exportAs: 'ux-item-display-panel',
    host: {
        '(document:click)': 'clickOff($event)',
        '(document:keyup.escape)': 'hide()'
    }
})
export class ItemDisplayPanelComponent { 
    @Input() top: number;
    @Input() shadow: boolean;
    @Input() visible: boolean;
    @Input() title: string;
    @Input() animate: boolean;

    height: string;

    ngOnChanges(changes: {[top: number]: SimpleChange}) {
        this.height = 'calc(100% - ' + this.top + 'px)';
    }

    clickOff(event: any) {
       
        // dont do anything if the panel is hidden
        if (this.visible) {
            let target = event.target;

            let hidePanel = true;

            while (target.nodeName !== 'BODY') {
                if (target.classList.contains('ux-item-display-panel')) {
                    hidePanel = false;
                    break;
                } else {
                    target = target.parentNode;
                }
            }

            if (hidePanel) {
                this.hide();
            }
        }
    }

    show(event: MouseEvent) {
        
        event.stopPropagation();

        if (!this.visible) {
            this.visible = true;
        }
    }

    hide() {
        if (this.visible) {
            this.visible = false;
        }
    }

}

@Directive({
    selector: 'ux-item-display-panel-content'
})
export class ItemDisplayPanelContentDirective { }

@Directive({
    selector: 'ux-item-display-panel-footer'
})
export class ItemDisplayPanelFooterDirective { }