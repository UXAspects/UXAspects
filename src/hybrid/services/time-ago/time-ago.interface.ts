export interface ITimeAgoService {

    setStrings(strings: TimeAgoLocalizedTimes): void;    
    timeSince(past: Date, present: Date): string;
    timeSinceNow(moment: Date): string;
}

export interface TimeAgoLocalizedTimes {
    lessThanSecond: string;
    second: string;
    seconds: string;
    minute: string;
    minutes: string;
    hour: string;
    hours: string;
    day: string;
    days: string;
    week: string;
    weeks: string;
    month: string;
    months: string;
    year: string;
    years: string;
}