import { Injector } from '@angular/core';
import { ITimeAgoService, TimeAgoLocalizedTimes } from './time-ago.interface';
export declare class TimeAgoService implements ITimeAgoService {
    private _timeAgoService;
    constructor(_timeAgoService: ITimeAgoService);
    setStrings(strings: TimeAgoLocalizedTimes): void;
    timeSince(past: Date, present: Date): string;
    timeSinceNow(moment: Date): string;
}
export declare function timeAgoServiceFactory(injector: Injector): any;
export declare const timeAgoServiceProvider: {
    provide: string;
    useFactory: (injector: Injector) => any;
    deps: string[];
};
