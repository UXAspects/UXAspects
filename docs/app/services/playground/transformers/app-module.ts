import { Injectable } from '@angular/core';
import * as ts from 'typescript';
import { IPlaygroundModule } from '../../../interfaces/IPlayground';
import { PlaygroundContext, PlaygroundTree } from '../index';
import {
    addImportsTransformer,
    getColorServiceImport,
    getImportDeclaration,
    getModuleImportStatement,
    ngModuleMetadataTransformer,
} from '../utilities/typescript';
import { PlaygroundTransformer } from './playground-transformer';

const DEFAULT_MODULES: IPlaygroundModule[] = [
    {
        imports: ['FormsModule', 'ReactiveFormsModule'],
        library: '@angular/forms',
    },
    {
        imports: ['BrowserAnimationsModule'],
        library: '@angular/platform-browser/animations',
    },
    {
        imports: ['AccessibilityModule', 'IconModule'],
        library: '@ux-aspects/ux-aspects',
    },
];

/** Add imports and declarations to the playground AppModule. */
@Injectable()
export class AppModulePlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        if (context.playground.framework === 'angular') {
            tree.updateTypeScriptFile(
                'src/app/app.module.ts',
                addImportsTransformer(this.getImports(context)),
                ngModuleMetadataTransformer('imports', this.getModuleImports(context)),
                ngModuleMetadataTransformer('declarations', this.getModuleDeclarations(context))
            );
        }
    }

    getColorSetName(): string {
        return 'keppel';
    }

    getImports(context: PlaygroundContext): ts.ImportDeclaration[] {
        const imports = this.getPlaygroundModules(context)
            .filter(module => module.library)
            .map(module => getImportDeclaration(module.library, module.imports, module.importAs));
        const colorServiceImport = getImportDeclaration('@ux-aspects/ux-aspects', [
            'ColorServiceModule',
            'colorSets',
        ]);

        return [colorServiceImport, ...imports];
    }

    getModuleDeclarations(context: PlaygroundContext): ts.Expression[] {
        return this.getPlaygroundModules(context)
            .filter(module => module.declaration)
            .reduce((declarations, module) => {
                const imports = ensureArray(module.imports);
                return [...declarations, ...imports.map(ts.factory.createIdentifier)];
            }, [] as ts.Expression[]);
    }

    getModuleImports(context: PlaygroundContext): ts.Expression[] {
        const moduleImports = this.getPlaygroundModules(context)
            .filter(module => !module.declaration)
            .reduce((declarations, module) => {
                const imports = module.providers
                    ? ensureArray(module.providers)
                    : ensureArray(module.imports);
                return [
                    ...declarations,
                    ...imports.map(_import => getModuleImportStatement(_import, module.forRoot)),
                ];
            }, [] as ts.Expression[]);
        const colorServiceModuleImport = getColorServiceImport(this.getColorSetName());

        return [colorServiceModuleImport, ...moduleImports];
    }

    getPlaygroundModules(context: PlaygroundContext): IPlaygroundModule[] {
        return [...DEFAULT_MODULES, ...context.playground.modules];
    }
}

function ensureArray(objectOrArray?: string | string[]): string[] {
    if (!objectOrArray) {
        return [];
    }

    return objectOrArray instanceof Array ? objectOrArray : [objectOrArray];
}
