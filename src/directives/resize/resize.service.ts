import { Injectable, NgZone, OnDestroy, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs/observable/fromEvent';


@Injectable()
export class ResizeService implements OnDestroy {

    private _renderer: Renderer2;
    private _subscription = new Subscription();

    constructor(rendererFactory: RendererFactory2, private _ngZone: NgZone) {
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    addResizeListener(nativeElement: HTMLElement): BehaviorSubject<ResizeDimensions> {

        // create a behavior subject subject
        const subject = new BehaviorSubject<ResizeDimensions>({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight });

        // determine the style of the element
        const displayMode = window.getComputedStyle(nativeElement).getPropertyValue('display');

        // create the iframe element
        const iframe: HTMLIFrameElement = this._renderer.createElement('iframe');

        // style the iframe to be invisible but fill containing element
        this._renderer.setStyle(iframe, 'position', 'absolute');
        this._renderer.setStyle(iframe, 'width', '100%');
        this._renderer.setStyle(iframe, 'height', '100%');
        this._renderer.setStyle(iframe, 'top', '0');
        this._renderer.setStyle(iframe, 'right', '0');
        this._renderer.setStyle(iframe, 'bottom', '0');
        this._renderer.setStyle(iframe, 'left', '0');
        this._renderer.setStyle(iframe, 'z-index', '-1');
        this._renderer.setStyle(iframe, 'opacity', '0');
        this._renderer.setStyle(iframe, 'border', 'none');
        this._renderer.setStyle(iframe, 'margin', '0');
        this._renderer.setStyle(iframe, 'pointer-events', 'none');
        this._renderer.setStyle(iframe, 'overflow', 'hidden');

        // ensure the iframe ignores any tabbing
        this._renderer.setAttribute(iframe, 'tabindex', '-1');

        // statically positioned elements need changed to relative for this method to work
        if (displayMode !== 'relative' && displayMode !== 'absolute' && displayMode !== 'fixed') {
            this._renderer.setStyle(nativeElement, 'position', 'relative');
        }

        // add the iframe to the container element
        this._renderer.appendChild(nativeElement, iframe);

        this.waitUntilReady(iframe, () => {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document as Document;

            const attachListener = () => {

                // watch for any future resizes - run inside ngzone as an iframe event listener is not patched
                this._subscription.add(fromEvent(iframe.contentWindow, 'resize').subscribe((event: ResizeDimensions) =>
                    this._ngZone.run(() => subject.next({ width: nativeElement.offsetWidth, height: nativeElement.offsetHeight }))
                ));
            };

            if (iframeDoc.readyState === 'complete') {
                attachListener();
            } else {

                // wait for iframe to load
                iframe.addEventListener('load', () => attachListener());
            }
        });


        return subject;
    }

    private waitUntilReady(iframe: HTMLIFrameElement, callback: () => void) {
        if (iframe.contentDocument || iframe.contentWindow) {
            callback.call(this);
        } else {
            setTimeout(() => this.waitUntilReady(iframe, callback));
        }
    }
}

export interface ResizeDimensions {
    width: number;
    height: number;
}