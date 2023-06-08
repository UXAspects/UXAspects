import { Injectable } from '@angular/core';
import { PlaygroundContext, PlaygroundTree } from '../index';
import { formatCss } from '../utilities/format';
import { PlaygroundTransformer } from './playground-transformer';

/** Add the UX Aspects and Bootstrap stylesheet to the playground. */
@Injectable()
export class StylesheetPlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        // add stylesheet imports
        if (context.playground.framework === 'angular') {
            tree.updateJsonFile('angular.json', angularJson => {
                angularJson.apps[0].styles.unshift(...this.getStylesheets(context));
                return angularJson;
            });
        } else if (context.playground.framework === 'css') {
            const stylesheets = this.getStylesheets(context);
            tree.appendContent(
                'index.js',
                stylesheets.map(stylesheet => `import "./${stylesheet}";`).join('\n')
            );
        }

        // add global playground styling
        tree.appendContent(
            context.cssEntryPoint,
            'body { padding: 16px; background-color: #fff; }',
            formatCss
        );
    }

    protected getStylesheets(context: PlaygroundContext): string[] {
        return [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/@ux-aspects/ux-aspects/styles/ux-aspects.css',
        ];
    }
}
