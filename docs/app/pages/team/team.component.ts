import { Component } from '@angular/core';

import { ITeam } from '../../interfaces/ITeam';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
    selector: 'uxd-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.less']
})
export class TeamPageComponent {

    data: ITeam;

    constructor(private _appConfig: AppConfiguration) {
        this.data = this._appConfig.getConfigurationData('team-page');
    }

}