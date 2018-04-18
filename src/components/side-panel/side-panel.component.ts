import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, HostBinding, HostListener, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SidePanelService } from './side-panel.service';

@Component({
    selector: 'ux-side-panel',
    exportAs: 'ux-side-panel',
    templateUrl: 'side-panel.component.html',
    providers: [SidePanelService]
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

    get position() {
        if (this.inline) {
            return 'static';
        }
        if (this.attachTo === 'container') {
            return 'absolute';
        }
        return 'fixed';
    }

    @HostBinding('style.width')
    get componentWidth(): string {
        if (this.inline) {
            return this.open ? this.width : '0';
        }
        return null;
    }

    get hostWidth() {
        return this.inline ? '100%' : this.width;
    }

    private _subscription: Subscription;

    constructor(
        private _service: SidePanelService,
        private _elementRef: ElementRef
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

    @HostListener('document:keyup.escape')
    closePanel() {
        this._service.close();
    }

    @HostListener('document:click', ['$event'])
    clickHandler() {
        if (!this.open || !this.closeOnExternalClick) {
            return;
        }

        const target = event.target as HTMLElement;

        if (!this._elementRef.nativeElement.contains(target) ||
            (target && target.classList.contains('modal-backdrop'))) {
            this.closePanel();
        }
    }
}