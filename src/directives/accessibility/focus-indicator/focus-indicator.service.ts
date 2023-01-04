import { FocusMonitor } from '@angular/cdk/a11y';
import { inject, Inject, Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { AccessibilityOptions } from '../options/accessibility-options.interface';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { ACCESSIBILITY_OPTIONS_TOKEN } from '../options/accessibility-options.token';
import { FocusIndicator } from './focus-indicator';
import { FocusIndicatorOptions } from './focus-indicator-options.interface';
import { FocusIndicatorOriginService } from './focus-indicator-origin/focus-indicator-origin.service';

@Injectable()
export class FocusIndicatorService {
    readonly rendererFactory = inject(RendererFactory2);
    private readonly _focusMonitor = inject(FocusMonitor);
    private readonly _globalOptions = inject(AccessibilityOptionsService);
    private readonly _focusIndicatorOrigin = inject(FocusIndicatorOriginService);

    /** We need the renderer to add and remove classes */
    private _renderer: Renderer2;

    constructor(@Optional() @Inject(ACCESSIBILITY_OPTIONS_TOKEN) private _localOptions: AccessibilityOptions) {
        // programmatically create a renderer as it can't be injected into a service
        this._renderer = this.rendererFactory.createRenderer(null, null);
    }

    /** This is essentially just a factory method to prevent the user having to pass in focus monitor, renderer and global options each time */
    monitor(element: HTMLElement, options: FocusIndicatorOptions = { ...this._globalOptions.options, ...this._localOptions, checkChildren: false }): FocusIndicator {
        return new FocusIndicator(element, this._focusMonitor, this._renderer, { ...this._globalOptions.options, ...this._localOptions, ...options }, this._focusIndicatorOrigin);
    }

}