import { Injectable } from '@angular/core';
import 'chance';

@Injectable()
export class TreeViewService {

    /**
     * Get a list of all the files
     */
    getFiles(): TreeViewExampleNode[] {
        return [
            {
                name: 'src',
                children: [
                    { name: 'main.ts' },
                    { name: 'polyfills.ts' },
                    { name: 'styles.less' },
                    { name: 'vendor.ts' }
                ]
            },
            { name: 'index.html' },
            { name: 'package.json' },
            { name: 'README.md' },
            { name: 'tsconfig.json' }
        ];
    }

    /**
     * Get a list of all the files - simulate server delay
     */
    getRemoteFiles(): Promise<TreeViewExampleNode[]> {
        return new Promise<TreeViewExampleNode[]>(resolve => setTimeout(() => resolve(this.getFiles()), 1000));
    }

    /**
     * Get a large list of files used for virtual scrolling
     */
    getManyFiles(): Promise<TreeViewExampleNode[]> {
        return new Promise<TreeViewExampleNode[]>(resolve => {

            let documents: TreeViewExampleNode[] = [];

            for (let idx = 0; idx < 100; idx++) {
                documents.push({
                    name: `Document ${idx}.${chance.pickone(['doc', 'pdf', 'rtf', 'txt'])}`
                });
            }

            setTimeout(() => resolve(documents), 1000);
        });
    }
}

export interface TreeViewExampleNode {
    name: string;
    children?: TreeViewExampleNode[];
}