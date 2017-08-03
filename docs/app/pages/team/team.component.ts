import { Component } from '@angular/core';

import { ITeam } from '../../interfaces/ITeam';

@Component({
    selector: 'uxd-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.less']
})
export class TeamPageComponent {

    data: ITeam;

    constructor() {
        this.data = require('../../data/team-page.json');
    }

}