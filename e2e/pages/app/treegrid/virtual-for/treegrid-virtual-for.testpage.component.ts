import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeGridItem } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'treegrid-virtual-for-testpage',
    templateUrl: 'treegrid-virtual-for.testpage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeGridVirtualForTestPageComponent {
    items: FileNode[] = [
        {
            title: 'Documents',
            date: new Date('2013-02-16'),
            type: 'folder',
            children: [],
        },
    ];

    rows: FileNode[] = [];

    constructor() {
        for (let i = 0; i < 2000; i += 1) {
            this.items[0].children.push({
                title: `Document ${i}`,
                date: new Date(),
                type: 'file',
            });
        }
    }
}

interface FileNode extends TreeGridItem {
    title: string;
    date: Date;
    type: 'folder' | 'file';
    children?: FileNode[];
}
