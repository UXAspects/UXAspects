import { Injectable } from '@angular/core';
import { PlaygroundContext, PlaygroundTree } from '../index';
import { PlaygroundTransformer } from './playground-transformer';

/** Add the playground content to a CSS template. */
@Injectable()
export class CssFilesPlaygroundTransformer implements PlaygroundTransformer {
  async transform(tree: PlaygroundTree, context: PlaygroundContext): Promise<void> {
    if (context.playground.framework === 'css') {
      // insert CSS content
      tree.appendContent(context.cssEntryPoint, context.playground.files['app.css']);

      // insert HTML content
      await tree.updateHtmlFile(context.htmlEntryPoint, $ => {
        $('body').append(context.playground.files['app.html']);
      });
    }
  }
}
