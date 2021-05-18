import { Component } from '@angular/core';
import { HierarchyBarNode } from '@ux-aspects/ux-aspects';
import { Observable, Observer } from 'rxjs';

@Component({
    selector: 'app-hierarchy-bar',
    templateUrl: './hierarchy-bar.testpage.component.html',
    styleUrls: ['./hierarchy-bar.testpage.component.css']
})
export class HierarchyBarTestPageComponent {

    showLeftAddon: boolean = false;
    showTrailingAddon: boolean = false;
    showRightAddon: boolean = false;
    mode: string = 'standard';
    readonly: boolean = false;

    managerIcon = require('../../assets/IconManagerColorized.png');
    userIcon = require('../../assets/IconUser.png');

    node: HierarchyBarNode = {
        title: 'Theresa Chandler',
        icon: this.managerIcon,
        children: [
            {
                title: 'Leroy Rose',
                icon: this.managerIcon,
                children: Observable.create((observer: Observer<HierarchyBarNode[]>) => {

                    // simulate server loading
                    setTimeout(() => {

                        observer.next([
                            {
                                icon: this.userIcon,
                                title: 'Christian Olson',
                                children: [
                                    {
                                        icon: this.userIcon,
                                        title: 'Jeff Floyd',
                                        children: [
                                            {
                                                icon: this.userIcon,
                                                title: 'Margaret Barber',
                                            },
                                            {
                                                title: 'Mike Jenkins',
                                                icon: this.userIcon,
                                            },
                                            {
                                                title: 'Ian Garza',
                                                icon: this.userIcon,
                                            }
                                        ]
                                    },
                                    {
                                        title: 'Jeremy Grant',
                                        icon: this.userIcon,
                                    },
                                    {
                                        title: 'Leo Hodges',
                                        icon: this.userIcon,
                                    }
                                ]
                            },
                            {
                                title: 'Ernest Foster',
                                icon: this.userIcon,
                            }
                        ]);

                        observer.complete();
                    }, 2000);
                })
            },
            {
                title: 'Lilly Shaw Lilly Shaw Lilly Shaw Lilly Shaw Lilly Shaw Lilly Shaw Lilly Shaw Lilly Shaw Lilly Shaw Lilly Shaw',
                icon: this.managerIcon,
                children: [
                    {
                        title: 'Lelia Fitzgerald',
                        icon: this.userIcon,
                        children: [
                            {
                                title: 'John Smith',
                                icon: this.userIcon,
                                children: [
                                    {
                                        title: 'Bob Collins',
                                        icon: this.userIcon,
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Lillie Ballard',
                        icon: this.userIcon,
                    }
                ]
            }
        ]
    };

    selected: HierarchyBarNode = this.node;

    setSelected(): void {
        this.selected = this.node.children[0];
    }
}
