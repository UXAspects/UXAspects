import { Component, inject } from '@angular/core';
import { AccessibilityModule, FlippableCardModule, IconModule } from '@ux-aspects/ux-aspects';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { ITeam } from '../../interfaces/ITeam';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
  selector: 'uxd-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.less'],
  imports: [PageHeaderComponent, FlippableCardModule, AccessibilityModule, IconModule],
})
export class TeamPageComponent {
  private readonly _appConfig = inject(AppConfiguration);

  data: ITeam;

  constructor() {
    this.data = this._appConfig.getConfigurationData('team-page');
  }
}
