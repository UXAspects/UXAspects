import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const jsonTemplate = require('json-templater/object');

@Injectable()
export class AppConfiguration {

    public documentationPages = ['components-page', 'css-page', 'charts-page'];

    get version(): string {
        return this._config['version'];
    }

    get baseUrl(): string {
        if (!this._config['baseUrl']) {
            this._config['baseUrl'] = this.getBaseUrl();
        }
        return this._config['baseUrl'];
    }

    get assetsUrl(): string {
        if (!this._config['assetsUrl']) {
            // If not configured, derive from the application's base URL.
            this._config['assetsUrl'] = Location.joinWithSlash(this.baseUrl, 'assets');
        }
        return this._config['assetsUrl'];
    }

    get codePen(): string {
        return this._config['codePen'];
    }

    get plunker(): string {
        return this._config['plunker'];
    }

    private _data = {};
    private _config: {[key: string]: any};

    private _templateVars = {
        VERSION: environment.version
    };

    constructor(private _location: Location) {
        this.setConfigurationTemplateData('config', require('../../data/config.json'));
        this.setConfigurationTemplateData('config.dev', require('../../data/config.dev.json'));
        this.setConfigurationTemplateData('footer-navigation', require('../../data/footer-navigation.json'));
        this.setConfigurationTemplateData('landing-page', require('../../data/landing-page.json'));
        this.setConfigurationData('team-page', require('../../data/team-page.json'));
        this.setConfigurationData('top-navigation', require('../../data/top-navigation.json'));
        this.setConfigurationData('components-page', require('../../data/components-page.json'));
        this.setConfigurationData('css-page', require('../../data/css-page.json'));
        this.setConfigurationData('charts-page', require('../../data/charts-page.json'));

        this._config = environment.production ? this._data['config'] : this._data['config.dev'];
    }

    get(key: string): any {
        return this._config[key];
    }

    getConfigurationData(key: string): any {
        return this._data[key];
    }

    setConfigurationData(key: string, data: any): void {
        this._data[key] = data;
    }

    setConfigurationTemplateData(key: string, data: any): void {
        this._data[key] = jsonTemplate(data, this._templateVars);
    }

    private getBaseUrl(): string {
        const path = this._location.prepareExternalUrl(this._location.path());
        return window.location.href.substr(0, window.location.href.lastIndexOf(path)).replace(/\/+$/, '');
    }
}
