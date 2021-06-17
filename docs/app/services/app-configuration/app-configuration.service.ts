import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const jsonTemplate = require('json-templater/object');
const { major, minor, patch, prerelease } = require('semver');

@Injectable({
    providedIn: 'root'
})
export class AppConfiguration {

    public documentationPages = ['components-page', 'css-page', 'charts-page'];

    get version(): string {
        return this.config['version'];
    }

    get baseUrl(): string {
        if (!this.config['baseUrl']) {
            this.config['baseUrl'] = this.getBaseUrl();
        }
        return this.config['baseUrl'];
    }

    get assetsUrl(): string {
        if (!this.config['assetsUrl']) {
            // If not configured, derive from the application's base URL.
            this.config['assetsUrl'] = Location.joinWithSlash(this.baseUrl, 'assets');
        }
        return this.config['assetsUrl'];
    }

    get plunker(): string {
        return this.config['plunker'];
    }

    get config(): { [key: string]: any } {
        return environment.production ? this._data['config'] : this._data['config.dev'];
    }

    private _data = {};

    private _templateVars: { [key: string]: any };

    constructor(private _location: Location) {

        this._templateVars = {
            VERSION: this.getVersion(environment.version),
            BUILD: this.getBuild(environment.version)
        };

        this.setConfigurationTemplateData('config', require('../../data/config.json'));
        this.setConfigurationTemplateData('config.dev', require('../../data/config.dev.json'));
        this.setConfigurationTemplateData('footer-navigation', require('../../data/footer-navigation.json'));
        this.setConfigurationTemplateData('landing-page', require('../../data/landing-page.json'));
        this.setConfigurationData('team-page', require('../../data/team-page.json'));
        this.setConfigurationData('top-navigation', require('../../data/top-navigation.json'));
        this.setConfigurationData('components-page', require('../../data/components-page.json'));
        this.setConfigurationData('css-page', require('../../data/css-page.json'));
        this.setConfigurationData('charts-page', require('../../data/charts-page.json'));
    }

    get(key: string): any {
        return this.config[key];
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

    private getVersion(v: string): string {
        return `${major(v)}.${minor(v)}.${patch(v)}`;
    }

    private getBuild(v: string): string {
        const pre = prerelease(v);
        return pre ? pre.join('.') : null;
    }
}
