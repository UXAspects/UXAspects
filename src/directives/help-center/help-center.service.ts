import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HelpCenterService {

    items: BehaviorSubject<HelpCenterItem[]> = new BehaviorSubject<HelpCenterItem[]>([]);

    registerItem(item: HelpCenterItem): void {

        // get the current items
        let items = this.items.getValue();

        // add the new item to the list
        items.push(item);

        // update the observable
        this.items.next(items);
    }

    unregisterItem(item: HelpCenterItem): void {

        // get the current items
        let items = this.items.getValue();

        // remove the item being unregistered
        items = items.filter(itm => itm !== item);

        // update the observable
        this.items.next(items);
    }
}

export interface HelpCenterItem {
    icon?: string;
    title: string;
    select?: () => void;
}