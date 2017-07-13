import { Component, Directive, Input, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'ux-item-display-panel',
    templateUrl: './item-display-panel.component.html',
    host: {
        '(document:click)': 'clickOff($event)',
        '(document:keyup.escape)': 'visible = false',
        '[class.inline-host]' : 'inline', 
        '[class.visible-host]' : 'visible'
    }
})
export class ItemDisplayPanelComponent {
    @Input() title: string;
    
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    get top(): number {
        return this._top;
    }

    set top(top: number) {
        this._top = typeof top === 'string' ? parseFloat(top) : top;
    }

    @Input()
    get visible() {
        return this._visible;
    }

    set visible(visible: boolean) {

        this._visible = visible;

        // invoke change event
        this.visibleChange.emit(this._visible);
 
    }

    @Input()
    get footer() {
        return this._footer;
    }

    set footer(footer: boolean) {
        this._footer = typeof footer === 'string' ? !(footer === 'false') : footer;
    }

    @Input()
    get boxShadow() {
        return this._boxShadow;
    }

    set boxShadow(boxShadow: boolean) {
        this._boxShadow = typeof boxShadow === 'string' ? !(boxShadow === 'false') : boxShadow;
    }

    @Input()
    get closeVisible() {
        return this._closeVisible;
    }

    set closeVisible(closeVisible: boolean) {
        this._closeVisible = typeof closeVisible === 'string' ? !(closeVisible === 'false') : closeVisible;
    }

    @Input()
    get preventClose() {
        return this._preventClose;
    }

    set preventClose(preventClose: boolean) {
        this._preventClose = typeof preventClose === 'string' ? preventClose === 'true' : preventClose;
    }

    @Input()
    get inline() {
        return this._inline;
    }

    set inline(inline: boolean) {
        this._inline = typeof inline === 'string' ? inline === 'true' : inline;
    }

    @Input()
    get animate() {
        return this._animate;
    }

    set animate(animate: boolean) {
        this._animate = typeof animate === 'string' ? animate === 'true' : animate;
    }

    @Input()
    get shadow() {
        return this._shadow;
    }

    set shadow(shadow: boolean) {
        this._shadow = typeof shadow === 'string' ? shadow === 'true' : shadow;
    }

    private _top: number;
    private _visible: boolean = false;
    private _boxShadow: boolean = true;
    private _closeVisible: boolean = true;
    private _preventClose: boolean = false;
    private _inline: boolean = false;
    private _animate: boolean = false;
    private _shadow: boolean = false;
    private _footer: boolean = true;

    clickOff(event: any) {

        // dont close
        if (this.preventClose) {
            return;
        }
       
        // dont do anything if the panel is hidden
        if (this._visible) {
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
                this._visible = false;
                this.visibleChange.emit(this._visible);
            }
        }
    }

}

@Directive({
    selector: '[uxItemDisplayPanelContent]'
})
export class ItemDisplayPanelContentDirective { }

@Directive({
    selector: '[uxItemDisplayPanelFooter]'
})
export class ItemDisplayPanelFooterDirective { }