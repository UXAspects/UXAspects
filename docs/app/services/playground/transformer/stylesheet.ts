import { Injectable } from '@angular/core';
import { PlaygroundContext } from '../playground-context';
import { PlaygroundTree } from '../playground-tree';
import { PlaygroundTransformer } from './playground-transformer';

/** Add the UX Aspects and Bootstrap stylesheet to the playground. */
@Injectable()
export class StylesheetPlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        if (context.playground.framework === 'angular') {
            tree.updateJsonFile('angular.json', angularJson => {
                angularJson.apps[0].styles.unshift(...this.getStylesheets(context));
                return angularJson;
            });
        } else if (context.playground.framework === 'css') {
            // TODO: import stylesheet in HTML
        }
    }

    getStylesheets(context: PlaygroundContext): string[] {
        return [
            'node_modules/bootstrap-css',
            'node_modules/@ux-aspects/ux-aspects/styles/ux-aspects.css',
        ];
    }
}
