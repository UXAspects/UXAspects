import { Component, Directive, Input, SimpleChange, Output, EventEmitter, ContentChild, ViewEncapsulation } from '@angular/core';

@Directive({
    selector: '[uxItemDisplayPanelContent]'
})
export class ItemDisplayPanelContentDirective { }

@Directive({
    selector: '[uxItemDisplayPanelFooter]'
})
export class ItemDisplayPanelFooterDirective { }

@Component({
    selector: 'ux-item-display-panel',
    templateUrl: './item-display-panel.component.html',
    styleUrls: ['./item-display-panel.component.less'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document:click)': 'clickOff($event)',
        '(document:keyup.escape)': 'visible = false',
        '[class.inline-host]': 'inline',
        '[class.visible-host]': 'visible'
    }
})
export class ItemDisplayPanelComponent {

    @Input() header: string;
    @Input() top: number;
    @Input() boxShadow: boolean = true;
    @Input() closeVisible: boolean = true;
    @Input() preventClose: boolean = false;
    @Input() inline: boolean = false;
    @Input() animate: boolean = false;
    @Input() shadow: boolean = false;
    @Input() width: number;

    @ContentChild(ItemDisplayPanelFooterDirective) footer: ItemDisplayPanelFooterDirective;

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /**
     * @deprecated
     * Title used for adding tooltips and shouldn't be used as an input
     * instead header will be used. This is here to support backward compatibility only
     * this property should not be used.
     */
    @Input()
    set title(value: string) {
        this.header = value;
    }

    get title() {
        return this.header;
    }

    @Input()
    set visible(visible: boolean) {

        this._visible = visible;

        // invoke change event
        this.visibleChange.emit(this._visible);

    }
    
    get visible() {
        return this._visible;
    }

    private _visible: boolean = false;

    clickOff(event: MouseEvent) {

        // dont close
        if (this.preventClose) {
            return;
        }

        // dont do anything if the panel is hidden
        if (this._visible) {

            let target = event.target as HTMLElement;

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
                this._visible = false;
                this.visibleChange.emit(this._visible);
            }
        }
    }

}