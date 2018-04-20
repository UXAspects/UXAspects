import { Component, Directive, Input, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SidePanelService } from '../side-panel/side-panel.service';

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
    providers: [SidePanelService],
    host: {
        'class': 'ux-side-panel ux-item-display-panel'
    }
})
export class ItemDisplayPanelComponent extends SidePanelComponent {

    @Input() header: string;

    @Input() boxShadow: boolean = true;

    @Input() closeVisible: boolean = true;

    get preventClose(): boolean {
        return !this.closeOnExternalClick;
    }

    @Input()
    set preventClose(value: boolean) {
        this.closeOnExternalClick = !value;
    }

    @Input() shadow: boolean = false;

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
        this.open = visible;
    }

    get visible() {
        return this.open;
    }

    private _itemDisplayPanelSubscription: Subscription;

    constructor(service: SidePanelService, elementRef: ElementRef) {
        super(service, elementRef);

        this.animate = false;
        this.closeOnExternalClick = true;
    }

    ngOnInit() {
        this._itemDisplayPanelSubscription = this.service.open$.subscribe((next) => {
            this.visibleChange.emit(next);
        });
    }

    ngOnDestroy() {
        this._itemDisplayPanelSubscription.unsubscribe();
    }
}