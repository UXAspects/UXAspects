import { Component } from '@angular/core';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
    selector: 'uxd-getting-started',
    templateUrl: './getting-started.component.html'
})
export class GettingStartedPageComponent {
    
    private version = this.appConfig.get('version');

    constructor(private appConfig: AppConfiguration) {}
}