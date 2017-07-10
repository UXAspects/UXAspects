import { Component, Directive, Input, SimpleChange, Output, EventEmitter, Renderer2, ElementRef, Host } from '@angular/core';

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
    @Input() top: number;
    @Input() title: string;
    
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    get visible() {
        return this._visible;
    }

    set visible(visible: boolean) {
        this._visible = visible;

        // invoke change event
        this.visibleChange.emit(this._visible);

        // call callback
        this.onChangeCallback(this._visible);  
    }

    @Input()
    get boxShadow() {
        let value: any = this._boxShadow;
        if (value === 'false') {
            this._boxShadow = false;
        }
        return this._boxShadow;
    }

    set boxShadow(boxShadow: boolean) {
        this._boxShadow = boxShadow;
    }

    @Input()
    get closeVisible() {
        let value: any = this._closeVisible;
        if (value === 'false') {
            this._closeVisible = false;
        }
        return this._closeVisible;
    }

    set closeVisible(closeVisible: boolean) {
        this._closeVisible = closeVisible;
    }

    @Input()
    get preventClose() {
        let value: any = this._preventClose;
        if (value === 'true') {
            this._preventClose = true;
        }
        return this._preventClose;
    }

    set preventClose(preventClose: boolean) {
        this._preventClose = preventClose;
    }

    @Input()
    get inline() {
        let value: any = this._inline;
        if (value === 'true') {
            this._inline = true;
        }
        return this._inline;
    }

    set inline(inline: boolean) {
        this._inline = inline;
    }

    @Input()
    get animate() {
        let value: any = this._animate;
        if (value === 'true') {
            this._animate = true;
        }
        return this._animate;
    }

    set animate(animate: boolean) {
        this._animate = animate;
    }

    @Input()
    get shadow() {
        let value: any = this._shadow;
        if (value === 'true') {
            this._shadow = true;
        }
        return this._shadow;
    }

    set shadow(shadow: boolean) {
        this._shadow = shadow;
    }

    private _visible: boolean = false;
    private _boxShadow: boolean = true;
    private _closeVisible: boolean = true;
    private _preventClose: boolean = false;
    private _inline: boolean = false;
    private _animate: boolean = false;
    private _shadow: boolean = false;

    // private onTouchedCallback: () => void = () => { };
    private onChangeCallback: (_: boolean) => void = () => { };

    height: string;

    ngOnChanges(changes: {[top: number]: SimpleChange}) {
        this.height = 'calc(100% - ' + this.top + 'px)';
    }

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