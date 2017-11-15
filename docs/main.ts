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
import { environment } from './environments/environment';

/*
  Configure Settings for Specific Build Modes
*/

if (environment.production) {
  enableProdMode();
}

/*
  Bootstrap Angular 4+
*/
platformBrowserDynamic().bootstrapModule(AppModule);
