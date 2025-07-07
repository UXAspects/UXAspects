import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FullPageLayoutComponent } from '../../components/full-page-layout/full-page-layout.component';
import { LandingPageFeatureListComponent } from '../../components/landing-page-feature-list/landing-page-feature-list.component';
import { LandingPageFeatureComponent } from '../../components/landing-page-feature/landing-page-feature.component';
import { LandingPageHeaderComponent } from '../../components/landing-page-header/landing-page-header.component';
import { ILandingPage } from '../../interfaces/ILandingPage';
import { AppConfiguration } from '../../services/app-configuration/app-configuration.service';

@Component({
  selector: 'uxd-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  imports: [
    LandingPageHeaderComponent,
    FullPageLayoutComponent,
    LandingPageFeatureListComponent,
    NgFor,
    LandingPageFeatureComponent,
  ],
})
export class LandingPageComponent {
  landingPage: ILandingPage;

  constructor(private readonly _appConfig: AppConfiguration) {
    // load the landing page data file
    this.landingPage = this._appConfig.getConfigurationData('landing-page');
  }
}
