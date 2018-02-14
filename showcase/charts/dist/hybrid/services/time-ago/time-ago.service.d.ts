import { ITimeAgoService, TimeAgoLocalizedTimes } from './time-ago.interface';
export declare class TimeAgoService implements ITimeAgoService {
    private _timeAgoService;
    constructor(_timeAgoService: ITimeAgoService);
    setStrings(strings: TimeAgoLocalizedTimes): void;
    timeSince(past: Date, present: Date): string;
    timeSinceNow(moment: Date): string;
}
