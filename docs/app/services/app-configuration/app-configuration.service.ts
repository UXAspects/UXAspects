import { Injectable } from '@angular/core';

@Injectable()
export class AppConfiguration {

    private config = this.getConfig();

    public get(key: string): any {
        return key.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, this.config);
    }

    private getConfig() {
        switch (process.env.ENV) {
            case 'development':
                return require('../../data/config.dev.json');
        }
        return require('../../data/config.json');
    }
}
