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
    get boxShadow() {
        return this._boxShadow;
    }

    set boxShadow(boxShadow: boolean) {
        let value: any = boxShadow;
        if (value === 'false') {
            this._boxShadow = false;
        } else {
            this._boxShadow = true;
        }
    }

    @Input()
    get closeVisible() {
        return this._closeVisible;
    }

    set closeVisible(closeVisible: boolean) {
        let value: any = closeVisible;
        if (value === 'false') {
            this._closeVisible = false;
        } else {
            this._closeVisible = true;
        }
    }

    @Input()
    get preventClose() {
        return this._preventClose;
    }

    set preventClose(preventClose: boolean) {
        let value: any = preventClose;
        if (value === 'true') {
            this._preventClose = true;
        } else {
            this._preventClose = false;
        }
    }

    @Input()
    get inline() {
        return this._inline;
    }

    set inline(inline: boolean) {
        let value: any = inline;
        if (value === 'true') {
            this._inline = true;
        } else {
            this._inline = false;
        }
    }

    @Input()
    get animate() {
        return this._animate;
    }

    set animate(animate: boolean) {
        let value: any = animate;
        if (value === 'true') {
            this._animate = true;
        } else {
            this._animate = false;
        }
    }

    @Input()
    get shadow() {
        return this._shadow;
    }

    set shadow(shadow: boolean) {
        let value: any = shadow;
        if (value === 'true') {
            this._shadow = true;
        } else {
            this._shadow = false;
        }
    }

    private _top: number;
    private _visible: boolean = false;
    private _boxShadow: boolean = true;
    private _closeVisible: boolean = true;
    private _preventClose: boolean = false;
    private _inline: boolean = false;
    private _animate: boolean = false;
    private _shadow: boolean = false;

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