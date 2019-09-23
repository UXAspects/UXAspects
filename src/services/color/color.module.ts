import { ModuleWithProviders, NgModule } from '@angular/core';
import { ColorSet, colorSets, COLOR_SET_TOKEN } from './color-sets/index';

@NgModule({})
export class ColorServiceModule {

    /**
     * The function allows the consuming applications to specify the applications
     * color set once in the app module, eg:
     * ```
     * ColorServiceModule.forRoot(colorSets.microFocus);
     * ```
     * @param colorSet The color set the application should use
     */
    static forRoot(colorSet: ColorSet): ModuleWithProviders {
        return {
            ngModule: ColorServiceModule,
            providers: [
                { provide: COLOR_SET_TOKEN, useValue: colorSet ? colorSet : colorSets.keppel }
            ]
        };
    }
}
