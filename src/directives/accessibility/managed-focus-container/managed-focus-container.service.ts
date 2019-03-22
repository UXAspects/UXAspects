import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ManagedFocusContainerService {

    private _containers: ManagedFocusContainerWithReferences[] = [];
    private _renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2) {
        // programmatically create a renderer as it can't be injected into a service
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    /**
     * Create or get an existing object which manages the tabindex of descendants.
     * @param element The element containing focusable descendants.
     * @param component The component requesting the managed focus container.
     */
    register(element: HTMLElement, component: any): void {

        // Only create a new instance if no other component has created a container on the same element
        let containerRef = this._containers.find(ref => ref.container.element.isEqualNode(element));
        if (!containerRef) {
            containerRef = new ManagedFocusContainerWithReferences(new ManagedFocusContainer(element, this._renderer));
            this._containers.push(containerRef);

            // Start listening for focus
            containerRef.container.register();
        }

        // Track references to dispose correctly
        if (component) {
            containerRef.addReference(component);
        }
    }

    /**
     * Remove the container object. This will call `unregister` on the container if `component` is the last reference
     * to it.
     * @param element The element containing focusable descendants.
     * @param component The component requesting the managed focus container.
     */
    unregister(element: HTMLElement, component: any): void {

        // Remove the container's reference to the source component
        const containerRef = this._containers.find(ref => ref.container.element.isEqualNode(element));

        // technically this function can be called before the register function if ngOnDestroy runs before it
        // is fully initialized so we should stop here if there is no containRef.
        if (!containerRef) {
            return;
        }

        containerRef.removeReference(component);

        if (!containerRef.isAlive()) {

            // Last reference was removed, so unregister the listeners
            containerRef.container.unregister();

            // Clean up the reference tracking array
            this._containers = this._containers.filter(c => c !== containerRef);
        }
    }

    /**
     * Get an observable which can be used to determine when the element or one of its descendants has focus.
     * @param element The element containing focusable descendants.
     */
    hasFocus(element: HTMLElement): Observable<boolean> {
        const container = this.getContainer(element);
        return container ? container.hasFocus$.asObservable() : null;
    }

    private getContainer(element: HTMLElement): ManagedFocusContainer {
        const containerRef = this._containers.find(ref => ref.container.element.isEqualNode(element));
        return containerRef ? containerRef.container : null;
    }
}

class ManagedFocusContainer {

    /** Whether the container or one of its descendants has focus. */
    readonly hasFocus$ = new BehaviorSubject<boolean>(false);

    private _modifiedElements: ManagedFocusElementInfo[] = [];
    private _unlisten: (() => void)[] = [];

    constructor(
        public readonly element: HTMLElement,
        private _renderer: Renderer2
    ) { }

    /** Start managing the focus of child elements. */
    register(): void {

        this._unlisten.push(this._renderer.listen(this.element, 'focusin', this.onFocusIn.bind(this)));
        this._unlisten.push(this._renderer.listen(this.element, 'focusout', this.onFocusOut.bind(this)));

        // Check if the container already has focus
        setTimeout(() => {
            if (!this.element.contains(document.activeElement)) {
                this.removeTabFocus();
            }
        });
    }

    /** Stop managing the focus of child elements. */
    unregister(): void {

        // Dispose the event handlers
        this._unlisten.forEach(unlisten => unlisten());
        this._unlisten = [];

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
        const focusable = this.element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        // Remove focusable children from the tab ring
        Array.from(focusable).forEach(element => {
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
}

interface ManagedFocusElementInfo {
    element: Element;
    tabindex: string;
}

class ManagedFocusContainerWithReferences {

    private _components: any[] = [];

    constructor(public container: ManagedFocusContainer) { }

    addReference(component: any): void {
        this._components.push(component);
    }

    removeReference(component: any): void {
        this._components = this._components.filter(c => c !== component);
    }

    isAlive(): boolean {
        return this._components.length > 0;
    }
}