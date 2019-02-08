import { FocusMonitor } from '@angular/cdk/a11y';
import { Inject, Injectable, Optional, Renderer2, RendererFactory2 } from '@angular/core';
import { AccessibilityOptions } from '../options/accessibility-options.interface';
import { AccessibilityOptionsService } from '../options/accessibility-options.service';
import { ACCESSIBILITY_OPTIONS_TOKEN } from '../options/accessibility-options.token';
import { FocusIndicator } from './focus-indicator';
import { FocusIndicatorOptions } from './focus-indicator-options.interface';

@Injectable()
export class FocusIndicatorService {

    /** We need the renderer to add and remove classes */
    private _renderer: Renderer2;

    constructor(
        private _focusMonitor: FocusMonitor,
        private _globalOptions: AccessibilityOptionsService,
        @Optional() @Inject(ACCESSIBILITY_OPTIONS_TOKEN) private _localOptions: AccessibilityOptions,
        rendererFactory: RendererFactory2) {

        // programmatically create a renderer as it can't be injected into a service
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    /** This is essentially just a factory method to prevent the user having to pass in focus monitor, renderer and global options each time */
    monitor(element: HTMLElement, options: FocusIndicatorOptions = { ...this._globalOptions.options, ...this._localOptions, checkChildren: false }): FocusIndicator {
        return new FocusIndicator(element, this._focusMonitor, this._renderer, { ...this._globalOptions.options, ...this._localOptions, ...options });
    }

}