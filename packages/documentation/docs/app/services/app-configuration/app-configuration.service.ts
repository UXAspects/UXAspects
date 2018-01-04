import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const jsonTemplate = require('json-templater/object');

@Injectable()
export class AppConfiguration {

    private _data = {};

    private _templateVars = {
        'VERSION': environment.version
    };

    public documentationPages = ['components-page', 'css-page', 'charts-page'];

    constructor() {

        this.setConfigurationTemplateData('config', require('../../data/config.json'));
        this.setConfigurationTemplateData('config.dev', require('../../data/config.dev.json'));
        this.setConfigurationTemplateData('footer-navigation', require('../../data/footer-navigation.json'));
        this.setConfigurationTemplateData('landing-page', require('../../data/landing-page.json'));
        this.setConfigurationData('team-page',  require('../../data/team-page.json'));
        this.setConfigurationData('top-navigation',  require('../../data/top-navigation.json'));
        this.setConfigurationData('components-page',  require('../../data/components-page.json'));
        this.setConfigurationData('css-page',  require('../../data/css-page.json'));
        this.setConfigurationData('charts-page',  require('../../data/charts-page.json'));
    }

    get(key: string): any {
        return key.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, this.getConfig());
    }

    getConfigurationData(key: string) {
        return this._data[key];
    }

    setConfigurationData(key: string, data: any) {
        this._data[key] = data;
    }

    setConfigurationTemplateData(key: string, data: any) {
        this._data[key] = jsonTemplate(data, this._templateVars);
    }

    private getConfig() {
        return environment.production ? this._data['config'] : this._data['config.dev'];
    }
}
