import { Injectable } from '@angular/core';
import * as ts from 'typescript';
import { IPlaygroundModule } from '../../../interfaces/IPlayground';
import { PlaygroundContext, PlaygroundTree } from '../index';
import {
    addImportsTransformer,
    getColorServiceImport,
    getImportDeclaration,
    getModuleImportStatement,
    mergeImports,
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
                ngModuleMetadataTransformer('declarations', this.getModuleDeclarations(context)),
                ngModuleMetadataTransformer('providers', this.getProvidersDeclarations(context))
            );
        }
    }

    protected getColorSetName(): string {
        return 'keppel';
    }

    private getImports(context: PlaygroundContext): ts.ImportDeclaration[] {
        const colorServiceImport = getImportDeclaration('@ux-aspects/ux-aspects', [
            'ColorServiceModule',
            'colorSets',
        ]);
        const imports = this.getPlaygroundModules(context)
            .filter(module => module.library)
            .map(module => getImportDeclaration(module.library, module.imports, module.importAs, module.providers));

        return mergeImports(colorServiceImport, ...imports);
    }

    private getModuleDeclarations(context: PlaygroundContext): ts.Expression[] {
        return this.getPlaygroundModules(context)
            .filter(module => module.declaration)
            .reduce((declarations, module) => {
                const imports = ensureArray(module.imports);
                return [...declarations, ...imports.map(ts.factory.createIdentifier)];
            }, [] as ts.Expression[]);
    }

    private getModuleImports(context: PlaygroundContext): ts.Expression[] {
        const moduleImports = this.getPlaygroundModules(context)
            .filter(module => !module.declaration)
            .reduce((declarations, module) => {
                const imports = module.importsWithProviders
                    ? ensureArray(module.importsWithProviders)
                    : ensureArray(module.imports);

                return [
                    ...declarations,
                    ...imports.map(_import => getModuleImportStatement(_import, module.forRoot)),
                ];
            }, [] as ts.Expression[]);
        const colorServiceModuleImport = getColorServiceImport(this.getColorSetName());

        return [colorServiceModuleImport, ...moduleImports];
    }

    private getProvidersDeclarations(context: PlaygroundContext): ts.CallExpression[] {
        return this.getPlaygroundModules(context)
            .filter(module => module.providers)
            .reduce((providers, module) => {
                // we need to convert the strings into ts.Nodes so we can add them to the array
                const nodes = module.providers.map(provider => {
                    const sourceFile = ts.createSourceFile('temp.ts', provider, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

                    if (!ts.isExpressionStatement(sourceFile.statements[0]) || !ts.isCallExpression(sourceFile.statements[0].expression)) {
                        throw new Error('Invalid provider specified for playground');
                    }

                    return sourceFile.statements[0].expression;
                });

                return [...providers, ...nodes];
            }, [] as ts.CallExpression[]);
    }

    private getPlaygroundModules(context: PlaygroundContext): IPlaygroundModule[] {
        return [...DEFAULT_MODULES, ...context.playground.modules];
    }
}

function ensureArray(objectOrArray?: string | string[]): string[] {
    if (!objectOrArray) {
        return [];
    }

    return objectOrArray instanceof Array ? objectOrArray : [objectOrArray];
}
