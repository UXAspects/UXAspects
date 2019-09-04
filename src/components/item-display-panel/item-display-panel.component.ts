import { Component, ContentChild, Directive, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FocusIndicatorOriginService } from '../../directives/accessibility/index';
import { sidePanelStateAnimation } from '../side-panel/side-panel-animations';
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
    animations: [sidePanelStateAnimation],
    host: {
        'class': 'ux-side-panel ux-item-display-panel'
    }
})
export class ItemDisplayPanelComponent extends SidePanelComponent implements OnInit {

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

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ContentChild(ItemDisplayPanelFooterDirective, { static: false }) footer: ItemDisplayPanelFooterDirective;

    @ViewChild('panel', { static: true }) panel: ElementRef;

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

    constructor(service: SidePanelService, elementRef: ElementRef, focusOrigin: FocusIndicatorOriginService) {
        super(service, elementRef, focusOrigin);

        this.animate = false;
        this.closeOnExternalClick = true;
    }

    ngOnInit() {
        super.ngOnInit();
        this.service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(isVisible => this.visibleChange.emit(isVisible));
    }

    focus(): void {
        if (this.panel) {
            this.panel.nativeElement.focus();
        }
    }
}