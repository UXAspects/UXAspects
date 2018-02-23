import { Injectable, Inject, Injector } from '@angular/core';
import { ITimeAgoService, TimeAgoLocalizedTimes } from './time-ago.interface';

@Injectable()
export class TimeAgoService implements ITimeAgoService {

    constructor(@Inject('timeAgoService') private _timeAgoService: ITimeAgoService) { }

    setStrings(strings: TimeAgoLocalizedTimes): void {
        this._timeAgoService.setStrings(strings);
    }

    timeSince(past: Date, present: Date): string {
        return this._timeAgoService.timeSince(past, present);
    }

    timeSinceNow(moment: Date): string {
        return this._timeAgoService.timeSinceNow(moment);
    }

}

export function timeAgoServiceFactory(injector: Injector) {
    return injector.get('timeAgoService');
}

export const timeAgoServiceProvider = {
    provide: 'timeAgoService',
    useFactory: timeAgoServiceFactory,
    deps: ['$injector']
};