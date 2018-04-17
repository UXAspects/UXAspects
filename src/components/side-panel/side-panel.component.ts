import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostBinding, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SidePanelService } from './side-panel.service';

@Component({
    selector: 'ux-side-panel',
    exportAs: 'ux-side-panel',
    templateUrl: 'side-panel.component.html'
})
export class SidePanelComponent implements OnInit, OnDestroy {

    @Input()
    @HostBinding('class.open')
    get open(): boolean {
        return this._service.open$.value;
    }

    set open(value: boolean) {
        this._service.open$.next(value);
    }

    @Input()
    @HostBinding('class.inline')
    inline = false;

    @Input()
    attachTo: 'window' | 'container' = 'window';

    @Input()
    width = '50%';

    @Input()
    @HostBinding('style.top')
    top = '0';

    @Input()
    @HostBinding('attr.aria-modal')
    modal = false;

    @Input()
    @HostBinding('class.animate')
    animate = false;

    @Input()
    closeOnExternalClick = false;

    @Output()
    openChange = new EventEmitter<boolean>();

    @HostBinding('style.position')
    get stylePosition() {
        if (this.inline) {
            return 'static';
        }
        if (this.attachTo === 'container') {
            return 'absolute';
        }
        return 'fixed';
    }

    @HostBinding('style.width')
    get styleWidth(): string {
        if (this.inline) {
            return this.open ? this.width : '0';
        }
        return this.width;
    }

    private _subscription: Subscription;

    constructor(
        private _service: SidePanelService
    ) { }

    ngOnInit() {
        this._subscription = this._service.open$.subscribe((next) => {
            this.openChange.emit(next);
        });
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    openPanel() {
        this._service.open();
    }

    closePanel() {
        this._service.close();
    }

    @HostListener('document:click', ['$event'])
    clickHandler() {
        if (!this.open || !this.closeOnExternalClick) {
            return;
        }

        console.log('document:click');

        let target = event.target as HTMLElement;

        // if the target node is the HTML tag, then this was triggered by scrolling and we should not close the panel
        if (target.nodeName === 'HTML') {
            return;
        }

        let hidePanel = true;

        while (target && target.nodeName !== 'BODY') {
            if (target.nodeName === 'ux-side-panel') {
                hidePanel = false;
                break;
            } else {
                target = target.parentElement;
            }
        }

        if (hidePanel) {
            this.closePanel();
        }
    }

    @HostListener('document:keyup.escape')
    escHandler() {
        this.closePanel();
    }
}