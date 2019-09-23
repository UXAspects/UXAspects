import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconModuleOptions } from './icon-options.interface';
import { ICON_OPTIONS_TOKEN } from './icon-options.token';
import { IconComponent } from './icon.component';
import { IconService } from './icon.service';

@NgModule({
    declarations: [
        IconComponent
    ],
    exports: [
        IconComponent
    ],
    providers: [
        IconService
    ]
})
export class IconModule {

    /** Allow configuration at AppModule level */
    static forRoot(options?: IconModuleOptions): ModuleWithProviders {
        return {
            ngModule: IconModule,
            providers: [
                { provide: ICON_OPTIONS_TOKEN, useValue: options }
            ]
        };
    }

    /** Allow configuration at a child module level */
    static forChild(options?: IconModuleOptions): ModuleWithProviders {
        // the `forChild` does the same as `forRoot` however this having
        // `forChild` follows the correct conventions as we should never
        // import `forRoot` in a child module
        return IconModule.forRoot(options);
    }
}
