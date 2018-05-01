import { Component } from '@angular/core';
import { HierarchyBarNode } from '@ux-aspects/ux-aspects';
import { Chance } from 'chance';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

const chance = new Chance();

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
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
                icon: 'https://uxaspects.github.io/UXAspects/assets/IconManagerColorized.png',
                title: chance.name(),
                children: [
                  {
                    icon: 'https://uxaspects.github.io/UXAspects/assets/IconManagerColorized.png',
                    title: chance.name(),
                    children: [
                      {
                        icon: 'https://uxaspects.github.io/UXAspects/assets/IconManagerColorized.png',
                        title: chance.name(),
                      }
                    ]
                  }
                ]
              }
            ]);

            observer.complete();
          }, 2000);
        })
      }
    ]
  };

  selected: HierarchyBarNode = this.node.children[0];

}
