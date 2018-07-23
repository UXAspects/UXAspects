// Import application
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// enable angular production mode to simulate real environment
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);