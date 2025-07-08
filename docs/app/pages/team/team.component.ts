import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { AccessibilityModule, FlippableCardModule, IconModule } from '@ux-aspects/ux-aspects';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ITeam } from '../../interfaces/ITeam';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
  selector: 'uxd-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less'],
  imports: [PageHeaderComponent, NgFor, FlippableCardModule, AccessibilityModule, IconModule],
})
export class TeamPageComponent {
  data: ITeam;

  constructor(private readonly _appConfig: AppConfiguration) {
    this.data = this._appConfig.getConfigurationData('team-page');
  }
}
