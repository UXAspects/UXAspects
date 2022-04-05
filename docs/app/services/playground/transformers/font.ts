import { Injectable } from '@angular/core';
import { PlaygroundContext } from '../playground-context';
import { PlaygroundTree } from '../playground-tree';
import { PlaygroundTransformer } from './playground-transformer';

/**
 * Add the Source Sans Pro font to the playground.
 * Although UX Aspects embeds this font, the way we are importing it triggers santization.
 */
@Injectable()
export class FontPlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        tree.updateHtmlFile('src/index.html', $ => {
            $('head').append(`<link href="${this.getFontHref(context)}" rel="stylesheet" />`);
        });
    }

    protected getFontHref(context: PlaygroundContext): string {
        return 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap';
    }
}
