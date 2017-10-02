import { Injectable } from '@angular/core';
import 'chance';

@Injectable()
export class TreeViewService {

    getDocuments(): Promise<TreeViewExampleNode[]> {
        return new Promise<TreeViewExampleNode[]>(resolve => {
            setTimeout(() => {

                let output: TreeViewExampleNode[] = [];

                for (let idx = 0; idx < 50; idx++) {
                    output.push({ name: `Document ${idx}` });
                }

                resolve(output);
            }, 1000);
        });
    }

    getPictures(): Promise<TreeViewExampleNode[]> {
        return new Promise<TreeViewExampleNode[]>(resolve => {
            setTimeout(() => {

                let output: TreeViewExampleNode[] = [];

                for (let idx = 0; idx < 50; idx++) {
                    output.push({ name: `IMG_${chance.pad(idx, 4)}` });
                }

                resolve(output);
            }, 1000);
        });
    }
}

export interface TreeViewExampleNode {
    name: string;
    children?: TreeViewExampleNode[];
}