import { Injectable } from '@angular/core';

@Injectable()
export class AppConfiguration {

    private _data = {
        'config': require('../../data/config.json'),
        'config.dev': require('../../data/config.dev.json'),
        'footer-navigation': require('../../data/footer-navigation.json'),
        'landing-page': require('../../data/landing-page.json'),
        'team-page': require('../../data/team-page.json'),
        'top-navigation': require('../../data/top-navigation.json'),
        'components-page': require('../../data/components-page.json'),
        'css-page': require('../../data/css-page.json'),
        'charts-page': require('../../data/charts-page.json'),
    };

    public documentationPages = ['components-page', 'css-page', 'charts-page'];

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
        switch (process.env.ENV) {
            case 'development':
                return this._data['config.dev'];
        }
        return this._data['config'];
    }
}
