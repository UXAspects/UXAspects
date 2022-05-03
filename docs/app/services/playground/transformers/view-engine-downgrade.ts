import { Injectable } from '@angular/core';
import { IPlaygroundModule } from '../../../interfaces/IPlayground';
import { PlaygroundContext, PlaygroundTree } from '../index';
import { PlaygroundTransformer } from './playground-transformer';

/**
 * Downgrade to Angular 12 if the playground requires a ViewEngine library.
 * See https://github.com/codesandbox/codesandbox-client/issues/6533.
 * Remove when retiring Angular 12.
 */
@Injectable()
export class ViewEngineDowngradeTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        if (context.playground.modules?.find(isViewEngineModule)) {
            tree.updateJsonFile('package.json', json => {
                Object.keys(json.dependencies)
                    .filter(name => name.startsWith('@angular/'))
                    .forEach(name => (json.dependencies[name] = '^12.0.0'));
            });
        }
    }
}

function isViewEngineModule(playgroundModule: IPlaygroundModule): boolean {
    const imports = Array.isArray(playgroundModule.imports)
        ? playgroundModule.imports
        : [playgroundModule.imports];
    return (
        playgroundModule.library === 'angular-split' ||
        playgroundModule.library === 'ng2-file-upload' ||
        imports.findIndex(_import => _import === 'MarqueeWizardModule') >= 0
    );
}
