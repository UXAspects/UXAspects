import { Component } from '@angular/core';
import { TreeGridItem, TreeGridLoadFunction } from '@ux-aspects/ux-aspects';
import 'chance';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    selected: FileNode[] = [];

    set selectAll(selectAll: boolean | -1) {
        if (selectAll === false) {
            this.selected = [];
        } else if (selectAll === true) {
            // Tip: pass `this.rows` instead to select only visible rows
            this.selected = [...this.itemsFlat];
        }
    }

    get selectAll(): boolean | -1 {
        if (this.selected.length === 0) {
            return false;
        }
        if (this.selected.length === this.itemsFlat.length) {
            return true;
        }
        return -1;
    }

    rows: FileNode[] = [];

    /** The raw nested data source */
    items: FileNode[] = [
        {
            title: 'Documents',
            date: new Date('2013-02-16'),
            type: 'folder',
            children: [
                {
                    title: 'Pictures',
                    date: new Date('2013-05-28'),
                    type: 'folder',
                    children: [
                        {
                            title: 'Alcazar',
                            date: new Date('2014-05-15'),
                            type: 'file'
                        },
                        {
                            title: 'Citadel',
                            date: new Date('2015-09-02'),
                            type: 'file'
                        },
                        {
                            title: 'Donjon',
                            date: new Date('2014-04-10'),
                            type: 'file'
                        }
                    ]
                },
                {
                    title: 'Word files',
                    date: new Date('2013-09-25'),
                    type: 'folder',
                    children: [
                        {
                            title: 'Accounts',
                            date: new Date('2013-10-04'),
                            type: 'folder',
                            children: [
                                {
                                    title: 'Castle',
                                    date: new Date('2014-05-15'),
                                    type: 'file'
                                },
                                {
                                    title: 'Estate',
                                    date: new Date('2015-08-03'),
                                    type: 'file'
                                },
                                {
                                    title: 'Manor',
                                    date: new Date('2014-05-30'),
                                    type: 'file'
                                },
                                {
                                    title: 'Mansion',
                                    date: new Date('2014-04-23'),
                                    type: 'file'
                                },
                                {
                                    title: 'Villa',
                                    date: new Date('2015-09-21'),
                                    type: 'file'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'Emails',
            date: new Date('2013-03-17'),
            type: 'folder',
            children: [
                {
                    title: 'Inbox',
                    date: new Date('2013-03-17'),
                    type: 'folder'
                },
                {
                    title: 'Outbox',
                    date: new Date('2013-03-17'),
                    type: 'folder'
                }
            ]
        },
        {
            title: 'Empty',
            date: new Date('2016-06-02'),
            type: 'folder'
        }
    ];

    itemsFlat = this.flatten(this.items);

    asyncSelected: FileNode[] = [];

    asyncRows: FileNode[] = [];

    asyncItems: FileNode[] = [
        {
            title: 'Folder 1',
            type: 'folder'
        },
        {
            title: 'Folder 2',
            type: 'folder'
        },
        {
            title: 'Folder 3',
            type: 'folder'
        }
    ];

    loadChildrenFn: TreeGridLoadFunction = this.loadChildren.bind(this);

    select(row: FileNode): void {

        // if the row is not currently selected then select it
        if (this.selected.indexOf(row) === -1) {
            this.selected = [...this.selected, row];
        }

        // if the row has any children select them also
        if (row.children) {
            row.children.forEach(child => this.select(child));
        }
    }

    deselect(row: FileNode): void {

        // deselect the current row
        this.selected = this.selected.filter(_row => _row !== row);

        // if the row has any children deselect them also
        if (row.children) {
            row.children.forEach(child => this.deselect(child));
        }
    }

    isSelected(row: FileNode): boolean {
        return this.selected.indexOf(row) !== -1;
    }

    loadChildren(parent: FileNode): Promise<FileNode[]> {
        return new Promise<FileNode[]>(resolve => {
            setTimeout(() => {
                const index = this.asyncItems.indexOf(parent);
                const result: FileNode[] = [];
                for (let i = 0; i < 10; i += 1) {
                    result.push({
                        title: `Document ${(index * 10) + i + 1}`,
                        author: chance.name(),
                        date: chance.date(),
                        type: 'file'
                    });
                }
                resolve(result);
            }, 2000);
        });
    }

    flatten(items: FileNode[]): FileNode[] {
        return items.reduce((previous, item) => {
            const children = item.children ? this.flatten(item.children) : [];
            return [...previous, item, ...children];
        }, []);
    }

    clearChildren(): void {
        for (let item of this.asyncItems) {
            item.expanded = false;
            delete item.children;
        }
    }

    setExpanded(items: FileNode[], expanded: boolean): void {
        for (let item of items) {
            item.expanded = expanded;
        }
    }

    getIcon(item: FileNode): string {
        if (item.type === 'folder' && !item.expanded) {
            return 'folder';
        }

        if (item.type === 'folder' && item.expanded) {
            return 'folder-open';
        }

        if (item.type === 'file') {
            return 'document';
        }
    }
}

interface FileNode extends TreeGridItem {
    title: string;
    author?: string;
    date?: Date;
    type: 'folder' | 'file';
    children?: FileNode[];
    selected?: boolean;
}
