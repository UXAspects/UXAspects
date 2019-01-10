import { FocusMonitor } from '@angular/cdk/a11y';
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AccessibilityConfigurationService } from '../configuration/accessibility-configuration.service';
import { FocusIndicator } from './focus-indicator';
import { FocusIndicatorOptions } from './focus-indicator-options.interface';

@Injectable()
export class FocusIndicatorService {

    private _renderer: Renderer2;

    constructor(private _focusMonitor: FocusMonitor, private _config: AccessibilityConfigurationService, rendererFactory: RendererFactory2) {
        // programmatically create a renderer as it can't be injected into a service
        this._renderer = rendererFactory.createRenderer(null, null);
    }

    /** This is essentially just a factory method to prevent the user having to pass in focus monitor, renderer and global config each time */
    monitor(element: HTMLElement, options: FocusIndicatorOptions): FocusIndicator {
        return new FocusIndicator(element, this._focusMonitor, this._renderer, { ...this._config, ...options });
    }

}