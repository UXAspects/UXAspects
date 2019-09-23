import { IconService } from '@ux-aspects/ux-aspects';

export class AppComponent {

    constructor(iconService: IconService) {

        // replace single icon
        iconService.setIcon({ name: '3d', icon: 'qtm-icon-ci', iconset: 'qtm-font-icon', size: '14px' });

        // replace array of icons
        iconService.setIcons([
            { name: '3d', icon: 'qtm-icon-ci', iconset: 'qtm-font-icon', size: '14px' },
            { name: 'alert', icon: 'qtm-icon-error', iconset: 'qtm-font-icon', size: '14px' }
        ]);
    }

}