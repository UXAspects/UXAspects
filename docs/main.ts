/*
  Import Angular 1 Components and their dependencies
*/
import '../src/ng1/ux-aspects-ng1.module';

/*
  Import Document Specific Stylesheets
*/
import './styles.less';

/*
  Import Angular 4+ modules
*/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app/app.module';

/*
  Configure Settings for Specific Build Modes
*/
if (process.env.ENV === 'production') {
  enableProdMode();
}

/*
  Bootstrap Angular 4+
*/
platformBrowserDynamic().bootstrapModule(AppModule);
