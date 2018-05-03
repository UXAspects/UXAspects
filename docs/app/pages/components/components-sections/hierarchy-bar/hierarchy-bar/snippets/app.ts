import { Component } from '@angular/core';
import { HierarchyBarNode } from '@ux-aspects/ux-aspects';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'chance';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  node: HierarchyBarNode = {
    title: chance.name(),
    icon: 'https://uxaspects.github.io/UXAspects/assets/IconManagerColorized.png',
    children: [
      {
        title: chance.name(),
        icon: 'https://uxaspects.github.io/UXAspects/assets/IconManagerColorized.png',
        children: Observable.create((observer: Observer<HierarchyBarNode[]>) => {

          // simulate server loading
          setTimeout(() => {

            observer.next([
              {
                icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
                title: chance.name(),
                children: [
                  {
                    icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
                    title: chance.name(),
                    children: [
                      {
                        icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
                        title: chance.name(),
                      },
                      {
                        title: chance.name(),
                        icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
                      },
                      {
                        title: chance.name(),
                        icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
                      }
                    ]
                  },
                  {
                    title: chance.name(),
                    icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
                  },
                  {
                    title: chance.name(),
                    icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
                  }
                ]
              },
              {
                title: chance.name(),
                icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
              }
            ]);

            observer.complete();
          }, 2000);
        })
      },
      {
        title: chance.name(),
        icon: 'https://uxaspects.github.io/UXAspects/assets/IconManagerColorized.png',
        children: [
          {
            title: chance.name(),
            icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
          },
          {
            title: chance.name(),
            icon: 'https://uxaspects.github.io/UXAspects/assets/IconUser.png',
          }
        ]
      }
    ]
  };

  selected: HierarchyBarNode = this.node.children[0];

}
