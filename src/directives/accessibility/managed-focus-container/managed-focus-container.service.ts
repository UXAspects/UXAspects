import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ManagedFocusContainerService {

    private _renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2) {
        // programmatically create a renderer as it can't be injected into a service
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    createContainer(element: HTMLElement): ManagedFocusContainer {
        return new ManagedFocusContainer(element, this._renderer);
    }
}

export class ManagedFocusContainer {

    /** Whether the container or one of its descendants has focus. */
    hasFocus$ = new BehaviorSubject<boolean>(false);

    private _modifiedElements: ManagedFocusElementInfo[] = [];
    private _unlisten: (() => void)[] = [];

    constructor(private _element: HTMLElement, private _renderer: Renderer2) {}

    /** Start managing the focus of child elements. */
    register(): void {
        this._unlisten.push(this._renderer.listen(this._element, 'focusin', this.onFocusIn.bind(this)));
        this._unlisten.push(this._renderer.listen(this._element, 'focusout', this.onFocusOut.bind(this)));

        // Check if the container already has focus
        setTimeout(() => {
            if (!this._element.contains(document.activeElement)) {
                this.removeTabFocus();
            }
        });
    }

    /** Stop managing the focus of child elements. */
    unregister(): void {
        // Dispose the event handlers
        this._unlisten.forEach(unlisten => unlisten());

        // Undo any tabindex modifications
        this.restoreTabFocus();
    }

    private onFocusIn(): void {
        this.restoreTabFocus();
    }

    private onFocusOut(): void {
        this.removeTabFocus();
    }

    private removeTabFocus(): void {

        this.hasFocus$.next(false);

        // Clear the list of affected elements
        this._modifiedElements = [];

        // Get all focusable children
        const focusable = this._element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Remove focusable children from the tab ring
        focusable.forEach(element => {
            const originalTabIndex = element.getAttribute('tabindex');
            this._renderer.setAttribute(element, 'tabindex', '-1');
            this._modifiedElements.push({
                element: element,
                tabindex: originalTabIndex
            });
        });
    }

    private restoreTabFocus(): void {

        this.hasFocus$.next(true);

        // Restore tab focus ability by removing the custom `tabindex` attribute
        this._modifiedElements.forEach(elementInfo => {
            if (elementInfo.tabindex === null) {
                this._renderer.removeAttribute(elementInfo.element, 'tabindex');
            } else {
                this._renderer.setAttribute(elementInfo.element, 'tabindex', elementInfo.tabindex);
            }
        });

        // Clear the list of affected elements
        this._modifiedElements = [];
    }

    private isFocusWithin(): boolean {
        return this._element.contains(document.activeElement);
    }
}

interface ManagedFocusElementInfo {
    element: Element;
    tabindex: string;
}