// Import Stylesheets
import './styles.css';

// Import application
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

// enable angular production mode to simulate real environment
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);