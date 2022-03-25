import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import jsonTemplate from 'json-templater/object';
import { major, minor, patch, prerelease } from 'semver';
import * as config from '../../data/config.json';
import * as configDev from '../../data/config.dev.json';
import * as footerNavigation from '../../data/footer-navigation.json';
import * as landingPage from '../../data/landing-page.json';
import * as teamPage from '../../data/team-page.json';
import * as topNavigation from '../../data/top-navigation.json';
import * as componentsPage from '../../data/components-page.json';
import * as cssPage from '../../data/css-page.json';
import * as chartsPage from '../../data/charts-page.json';

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

    get isProduction(): boolean {
        return environment.production;
    }

    get isPreRelease(): boolean {
        return prerelease(this.version) === null ? false : true;
    }

    private _data = {};

    private _templateVars: { [key: string]: any };

    constructor(private _location: Location) {

        this._templateVars = {
            VERSION: this.getVersion(environment.version),
            BUILD: this.getBuild(environment.version)
        };

        this.setConfigurationTemplateData('config', config);
        this.setConfigurationTemplateData('config.dev', configDev);
        this.setConfigurationTemplateData('footer-navigation', footerNavigation);
        this.setConfigurationTemplateData('landing-page', landingPage);
        this.setConfigurationData('team-page', teamPage);
        this.setConfigurationData('top-navigation', topNavigation);
        this.setConfigurationData('components-page', componentsPage);
        this.setConfigurationData('css-page', cssPage);
        this.setConfigurationData('charts-page', chartsPage);
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
