import { Injectable } from '@angular/core';
import { PlaygroundContext, PlaygroundTree } from '../index';
import { PlaygroundTransformer } from './playground-transformer';

/** Add the playground content to an Angular template. */
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
