import { Injectable } from '@angular/core';
import { PlaygroundContext } from '../playground-context';
import { PlaygroundTree } from '../playground-tree';
import { PlaygroundTransformer } from './playground-transformer';

@Injectable()
export class CssFilesPlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        if (context.playground.framework === 'css') {
            // insert CSS content
            tree.appendContent(context.cssEntryPoint, context.playground.files['app.css']);

            // insert HTML content
            tree.updateHtmlFile(context.htmlEntryPoint, $ => {
                $('body').append(context.playground.files['app.html']);
            });
        }
    }
}
