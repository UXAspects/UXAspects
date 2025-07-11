import { Component, OnDestroy } from '@angular/core';
import {
  Breadcrumb,
  HelpCenterItem,
  HelpCenterService,
  PageHeaderIconMenu,
} from '@ux-aspects/ux-aspects';
import 'chance';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  repositories: HelpCenterTableData[] = [];
  crumbs: Breadcrumb[] = [{ title: 'Overview' }];
  loading: boolean = false;

  menus: PageHeaderIconMenu[] = [
    {
      icon: 'help',
      dropdown: [],
    },
  ];

  refreshHelpCenterItem: HelpCenterItem = {
    icon: 'refresh',
    title: 'Refresh Repositories',
    select: this.loadData.bind(this),
  };

  private readonly _helpCenter$: Subscription;

  constructor(private readonly _helpCenterService: HelpCenterService) {
    // update the menu items when new ones are added
    this._helpCenter$ = this._helpCenterService.items.subscribe(
      items => (this.menus[0].dropdown = items)
    );

    // load table data
    this.loadData();
  }

  loadData(): void {
    this.repositories = [];
    this.loading = true;

    const types = ['File System', 'Exchange', 'Other'];

    // add delay to simulate loading
    setTimeout(() => {
      // generate some sample data
      for (let idx = 0; idx < 5; idx++) {
        this.repositories.push({
          name: `Repository ${chance.integer({ min: 1, max: 100 })}`,
          type: types[chance.integer({ min: 0, max: 2 })],
          items: chance.integer({ min: 0, max: 1000000 }),
          location: chance.country({ full: true }),
          size: chance.floating({ fixed: 1, min: 1, max: 20 }),
        });
      }

      this.loading = false;
    }, 2000);
  }

  ngOnDestroy(): void {
    this._helpCenter$.unsubscribe();
  }
}

interface HelpCenterTableData {
  name: string;
  type: string;
  location: string;
  items: number;
  size: number;
}
