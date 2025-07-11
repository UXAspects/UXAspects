import { Component } from '@angular/core';
import { HierarchyBarNode } from '@ux-aspects/ux-aspects';
import 'chance';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  managerIcon = 'https://uxaspects.github.io/UXAspects/assets/img/IconManagerColorized.png';
  userIcon = 'https://uxaspects.github.io/UXAspects/assets/img/IconUser.png';
  mode: string = 'standard';
  node: HierarchyBarNode = {
    title: chance.name(),
    icon: this.managerIcon,
    children: [
      {
        title: chance.name(),
        icon: this.managerIcon,
        children: Observable.create((observer: Observer<HierarchyBarNode[]>) => {
          // simulate server loading
          setTimeout(() => {
            observer.next([
              {
                icon: this.userIcon,
                title: chance.name(),
                children: [
                  {
                    icon: this.userIcon,
                    title: chance.name(),
                    children: [
                      {
                        icon: this.userIcon,
                        title: chance.name(),
                      },
                      {
                        title: chance.name(),
                        icon: this.userIcon,
                      },
                      {
                        title: chance.name(),
                        icon: this.userIcon,
                      },
                    ],
                  },
                  {
                    title: chance.name(),
                    icon: this.userIcon,
                  },
                  {
                    title: chance.name(),
                    icon: this.userIcon,
                  },
                ],
              },
              {
                title: chance.name(),
                icon: this.userIcon,
              },
            ]);

            observer.complete();
          }, 2000);
        }),
      },
      {
        title: chance.name(),
        icon: this.managerIcon,
        children: [
          {
            title: chance.name(),
            icon: this.userIcon,
          },
          {
            title: chance.name(),
            icon: this.userIcon,
          },
        ],
      },
    ],
  };

  selected: HierarchyBarNode = this.node.children[0];

  readonly: boolean = false;
}
