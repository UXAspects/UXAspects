import { Injectable } from '@angular/core';
import { PlaygroundContext, PlaygroundTree } from '../index';
import { PlaygroundTransformer } from './playground-transformer';

/** Add the playground content to an Angular template. */
@Injectable()
export class AngularFilesPlaygroundTransformer implements PlaygroundTransformer {
    // eslint-disable-next-line @typescript-eslint/require-await
    async transform(tree: PlaygroundTree, context: PlaygroundContext): Promise<void> {
        if (context.playground.framework === 'angular') {
            Object.entries(context.playground.files).forEach(([fileName, content]) => {
                tree.setContent(`src/app/${fileName}`, content);
            });
        }
    }
}
