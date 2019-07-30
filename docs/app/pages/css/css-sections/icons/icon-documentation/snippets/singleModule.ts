import { IconModule } from '@ux-aspects/ux-aspects';
import { NgModule } from "@angular/core";

@NgModule({
    imports: [
        IconModule.forChild({
            icons: [
                { name: '3d', icon: 'ux-icon-3d', iconset: 'ux-icon', size: '14px' },
                { name: 'alert', icon: 'ux-icon-alert', iconset: 'ux-icons', size: '14px' }
            ]
        })
    ],
})

export class AppComponent {

}
