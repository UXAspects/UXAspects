import { Component, Directive, Input, SimpleChange, Output, EventEmitter } from '@angular/core';

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

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    height: string;

    ngOnChanges(changes: {[top: number]: SimpleChange}) {
        this.height = 'calc(100% - ' + this.top + 'px)';
    }

    clickOff(event: any) {
       
        // dont do anything if the panel is hidden
        if (this.visible) {
            let target = event.target;

            // if the target node is the HTML tag, then this was triggered by scrolling and we should not close the panel
            if (target.nodeName === 'HTML') {
                return;
            }

            let hidePanel = true;

            while (target && target.nodeName !== 'BODY') {
                if (target.classList.contains('ux-item-display-panel')) {
                    hidePanel = false;
                    break;
                } else {
                    target = target.parentElement;
                }
            }

            if (hidePanel) {
                this.hide();
            }
        }
    }

    show() {
        this.visible = true;

        // update the two way binding
        this.visibleChange.emit(this.visible);
    }

    hide() {
        this.visible = false;

        // update the two way binding
        this.visibleChange.emit(this.visible);
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