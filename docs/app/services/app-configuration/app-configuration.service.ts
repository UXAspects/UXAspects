import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const jsonTemplate = require('json-templater/object');

declare const VERSION: string;

@Injectable()
export class AppConfiguration {

    private _data = {};

    public documentationPages = ['components-page', 'css-page', 'charts-page'];

    constructor() {

        const vars = {
            'VERSION': VERSION
        };

        this._data['config'] = jsonTemplate(require('../../data/config.json'), vars);
        this._data['config.dev'] = jsonTemplate(require('../../data/config.dev.json'), vars);
        this._data['footer-navigation'] = jsonTemplate(require('../../data/footer-navigation.json'), vars);
        this._data['landing-page'] = jsonTemplate(require('../../data/landing-page.json'), vars);
        this._data['team-page'] = require('../../data/team-page.json');
        this._data['top-navigation'] = require('../../data/top-navigation.json');
        this._data['components-page'] = require('../../data/components-page.json');
        this._data['css-page'] = require('../../data/css-page.json');
        this._data['charts-page'] = require('../../data/charts-page.json');
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

    private getConfig() {
        return environment.production ? this._data['config'] : this._data['config.dev'];
    }
}
