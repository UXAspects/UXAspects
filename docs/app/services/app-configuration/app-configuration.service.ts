import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import jsonTemplate from 'json-templater/object';
import { major, minor, patch, prerelease } from 'semver';
import { environment } from '../../../environments/environment';
import * as chartsPage from '../../data/charts-page.json';
import * as componentsPage from '../../data/components-page.json';
import * as configDev from '../../data/config.dev.json';
import * as config from '../../data/config.json';
import * as cssPage from '../../data/css-page.json';
import * as footerNavigation from '../../data/footer-navigation.json';
import * as landingPage from '../../data/landing-page.json';
import * as teamPage from '../../data/team-page.json';
import * as topNavigation from '../../data/top-navigation.json';

@Injectable({
    providedIn: 'root'
})
export class AppConfiguration {

    public documentationPages = ['components-page', 'css-page', 'charts-page'];

    get version(): string {
        return environment.version;
    }

    get baseUrl(): string {
        if (!this.config.baseUrl) {
            this.config.baseUrl = this.getBaseUrl();
        }
        return this.config.baseUrl;
    }

    get devRepositoryUrl(): string {
        return this.config.devRepositoryUrl;
    }

    get packagesUrl(): string {
        return this.config.packagesUrl;
    }

    get playgroundUrl(): string {
        return this.config.playgroundUrl;
    }

    get universalUrl(): string {
        return this.config.universal;
    }

    get isProduction(): boolean {
        return environment.production;
    }

    get isPreRelease(): boolean {
        return prerelease(this.version) === null ? false : true;
    }

    get branchName(): string | null {
        const pre = prerelease(this.version)?.join('.');
        return pre?.replace(/-?SNAPSHOT$/, '');
    }


    get config(): { [key: string]: unknown } {
        return environment.production ? this._data['config'] : this._data['config.dev'];
    }

    private _data = {};

    private readonly _templateVars: { [key: string]: unknown };

    constructor(private readonly _location: Location) {

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

    get(key: string): unknown {
        return this.config[key];
    }

    getConfigurationData(key: string): unknown {
        return this._data[key];
    }

    setConfigurationData(key: string, data: unknown): void {
        this._data[key] = data;
    }

    setConfigurationTemplateData(key: string, data: unknown): void {
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
