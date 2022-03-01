import { Injectable } from '@angular/core';
import { Chance } from 'chance';
import { ScatterDataPoint } from 'chart.js';

const chance = new Chance();

@Injectable()
export class TimelineChartService {

    private _dataset: ScatterDataPoint[] = [];

    constructor() {
        const date = new Date(2014, 1, 0);
        console.log('file: timeline-chart.service.ts ~ line 14 ~ TimelineChartService ~ constructor ~ date', date);

        for (let idx = 0; idx < 63; idx++) {

            let value: number;

            if (date.getFullYear() === 2014) {
                value = chance.integer({ min: 10, max: 100 });
            }

            if (date.getFullYear() === 2015) {
                value = chance.integer({ min: 10, max: 150 });
            }

            if (date.getFullYear() === 2016) {
                value = chance.integer({ min: 50, max: 300 });
            }

            if (date.getFullYear() === 2017) {
                value = chance.integer({ min: 100, max: 400 });
            }

            if (date.getFullYear() === 2018) {
                value = chance.integer({ min: 450, max: 800 });
            }

            if (date.getFullYear() === 2019) {
                value = chance.integer({ min: 250, max: 600 });
            }

            this._dataset.push({ x: new Date(date) as any, y: value });
            date.setMonth(date.getMonth() + 1);
        }
    }

    getDataset(): ScatterDataPoint[] {
        return [...this._dataset];
    }

}