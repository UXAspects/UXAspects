import { IconService } from '@ux-aspects/ux-aspects';

export class AppComponent {

    constructor(iconService: IconService) {

        // replace single icon
        iconService.setIcon({ name: '3d', icon: 'ux-icon-3d', iconset: 'ux-icons', size: '14px' });

        // replace array of icons
        iconService.setIcons([
            { name: '3d', icon: 'ux-icon-3d', iconset: 'ux-icons', size: '14px' },
            { name: 'alert', icon: 'ux-icon-alert', iconset: 'ux-icons', size: '14px' }
        ]);
    }

}