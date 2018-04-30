import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class HelpCenterService {
    items: BehaviorSubject<HelpCenterItem[]>;
    registerItem(item: HelpCenterItem): void;
    unregisterItem(item: HelpCenterItem): void;
}
export interface HelpCenterItem {
    icon?: string;
    title: string;
    select?: () => void;
}
