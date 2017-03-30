import { Injectable } from '@angular/core';

@Injectable()
export class AppConfiguration {

    private config = require('../../data/config.json');

    public get(key: string): any {
        return key.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, this.config);
    }
}
