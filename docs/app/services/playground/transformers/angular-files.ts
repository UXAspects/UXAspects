import { Injectable } from '@angular/core';
import { PlaygroundContext } from '../playground-context';
import { PlaygroundTree } from '../playground-tree';
import { PlaygroundTransformer } from './playground-transformer';

@Injectable()
export class AngularFilesPlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        if (context.playground.framework === 'angular') {
            Object.entries(context.playground.files).forEach(([fileName, content]) => {
                tree.setContent(`src/app/${fileName}`, content);
            });
        }
    }
}
