import { Component, Directive, Input, SimpleChange, Output, EventEmitter, Renderer2, ElementRef, Host } from '@angular/core';

@Component({
    selector: 'ux-item-display-panel',
    templateUrl: './item-display-panel.component.html',
    host: {
        '(document:click)': 'clickOff($event)',
        '(document:keyup.escape)': 'visible = false',
        '[class.inlineHost]' : 'inline', 
        '[class.visibleHost]' : 'visible' 
    }
})
export class ItemDisplayPanelComponent { 
    @Input() top: number;
    @Input() shadow: boolean;
    @Input() title: string;
    @Input() animate: boolean;
    @Input() inline: boolean;
    @Input() preventClose: boolean;
    @Input() hideCloseButton: boolean;
    @Input() boxShadow: boolean;

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    get visible() {
        return this._visible;
    }

    ngOnInit() {
        if (this.boxShadow === undefined) {
            this.boxShadow = true;
        }
    }

    set visible(visible: boolean) {
        this._visible = visible;

        // invoke change event
        this.visibleChange.emit(this._visible);

        // call callback
        this.onChangeCallback(this._visible);  
    }

    private _visible: boolean = false;

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