/*
  Import Angular modules
*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/*
  Configure Settings for Specific Build Modes
*/

if (environment.production) {
  enableProdMode();
}

/*
  Bootstrap Angular
*/
platformBrowserDynamic().bootstrapModule(AppModule);
