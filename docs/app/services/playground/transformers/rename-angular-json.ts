import { Injectable } from '@angular/core';
import { PlaygroundContext } from '../playground-context';
import { PlaygroundTree } from '../playground-tree';
import { PlaygroundTransformer } from './playground-transformer';

/**
 * Renames angular.json to .angular-cli.json.
 * See https://github.com/codesandbox/codesandbox-client/issues/6243, remove when resolved.
 * The file can't be .angular-cli.json on disk because webpack doesn't load dot-prefix files.
 */
 @Injectable()
 export class RenameAngularJsonPlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        if (context.playground.framework === 'angular') {
            tree.setContent('.angular-cli.json', tree.getContent('angular.json'));
            tree.delete('angular.json');
        }
    }
}
