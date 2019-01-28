import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { ColorSet, colorSets, COLOR_SET_TOKEN } from './color-sets/index';
import { ColorService } from './color.service';

/**
 * This provider allows us to have only a single instance
 * of the color service throughout out entire application
 * regardless of how many times this module is imported.
 * Otherwise the user would have to set the colorSet every
 * time this is imported into a lazy loaded module
 *
 * Note: This can be removed once Angular 5 support can be dropped
 * and instead we should use `providedIn: 'root'`
 */
export function COLOR_SERVICE_PROVIDER_FACTORY(parentColorService: ColorService, colorSet: ColorSet) {
    return parentColorService || new ColorService(colorSet);
}

export const COLOR_SERVICE_PROVIDER = {
    provide: ColorService,
    deps: [[new Optional(), new SkipSelf(), ColorService], [new Optional(), COLOR_SET_TOKEN]],
    useFactory: COLOR_SERVICE_PROVIDER_FACTORY
};

@NgModule({
    providers: [COLOR_SERVICE_PROVIDER],
})
export class ColorServiceModule {

    /**
     * The function allows the consuming applications to specify the applications
     * color set once in the app module, eg:
     * ```
     * ColorServiceModule.forRoot(colorSets.microFocus);
     * ```
     * @param colorSet The color set the application should use
     */
    static forRoot(colorSet: ColorSet = colorSets.keppel): ModuleWithProviders {
        return {
            ngModule: ColorServiceModule,
            providers: [
                { provide: COLOR_SET_TOKEN, useValue: colorSet },
                COLOR_SERVICE_PROVIDER
            ]
        };
    }
}
