import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { load } from 'cheerio';
import { IFiles } from 'codesandbox-import-utils/lib/api/define';
import { getParameters } from 'codesandbox/lib/api/define';
import { format } from 'prettier';
import * as prettierHtml from 'prettier/parser-html';
import * as ts from 'typescript';
import { IPlayground } from '../../interfaces/IPlayground';
import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { SiteThemeService } from '../site-theme/site-theme.service';
import { DocumentationType, DOCUMENTATION_TOKEN } from './tokens/documentation.token';

const PACKAGE_DEPENDENCIES = {
    '@angular/cdk': '^12.0.0',
    'bootstrap-css': '^3.3.7',
    'chart.js': '~3.7.1',
    'ng2-charts': '~3.0.8',
    'ngx-bootstrap': '^6.0.0',
};

@Injectable({
    providedIn: 'root',
})
export class PlaygroundService {
    constructor(
        /** Access the document element */
        @Inject(DOCUMENT) private _document: Document,
        /** Determine if we are in a Keppel or MicroFocus documentation site */
        @Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType,
        /** Get the global configuation properties */
        private _appConfig: AppConfiguration,
        private _siteThemeService: SiteThemeService
    ) {}

    /** Launch the code playground */
    launch(title: string, playground: IPlayground) {
        const parameters = this.getSandboxParameters(title, playground);
        this.postData('https://codesandbox.io/api/v1/sandboxes/define', { parameters });
    }

    getSandboxParameters(title: string, playground: IPlayground): string {
        const template = require.context('./templates/angular', true, /\.(ts|html|css|json)$/);
        const paths = template.keys();
        const contents = paths.map(template);

        const files = paths.reduce<IFiles>((_files, path, index) => {
            if (path.startsWith('./')) {
                _files[path.substr(2)] = {
                    content: contents[index] as string,
                    isBinary: false,
                };
            }
            return _files;
        }, {});

        this.transformFiles(files, title, playground);

        return getParameters({
            files,
            template: 'angular-cli',
        });
    }

    transformFiles(files: IFiles, title: string, playground: IPlayground): void {
        const packageJson = JSON.parse(files['package.json'].content);
        packageJson.name = `${title} (UX Aspects)`;
        packageJson.description = 'UX Aspects example from https://uxaspects.github.io/UXAspects';
        packageJson.license = 'Apache-2.0';
        packageJson.dependencies['@ux-aspects/ux-aspects'] =
            'http://localhost:8090/ux-aspects-ux-aspects.tgz';
        packageJson.dependencies = { ...packageJson.dependencies, ...PACKAGE_DEPENDENCIES };
        files['package.json'].content = JSON.stringify(packageJson, null, 2);

        for (const playgroundFile in playground.files) {
            files[`src/app/${playgroundFile}`] = {
                content: playground.files[playgroundFile],
                isBinary: false,
            };
        }

        this.addStyles(files);
        this.addFonts(files);
        this.addIconSet(files);
        this.updateAppModule(files, playground);
        this.renameAngularJson(files);
    }

    private addIconSet(files: IFiles): void {
        files['src/styles.css'].content += `
@font-face {
  font-family: "ux-icons";
  src: url(https://unpkg.com/@ux-aspects/ux-aspects@latest/fonts/ux-icons.woff)
    format("woff");
  font-weight: normal;
  font-style: normal;
}`;
    }

    private addStyles(files: IFiles): void {
        const angularJson = JSON.parse(files['angular.json'].content);
        angularJson.apps[0].styles.unshift(
            'node_modules/bootstrap-css',
            'node_modules/@ux-aspects/ux-aspects/styles/ux-aspects.css'
        );
        files['angular.json'].content = JSON.stringify(angularJson, null, 2);
    }

    private addFonts(files: IFiles): void {
        const $ = load(files['src/index.html'].content);
        $('head').append(
            '<link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap" rel="stylesheet" />'
        );
        files['src/index.html'].content = format($.root().html(), {
            parser: 'html',
            plugins: [prettierHtml],
        });
    }

    private updateAppModule(files: IFiles, playground: IPlayground): void {
        const source = ts.createSourceFile(
            'src/app/app.module.ts',
            files['src/app/app.module.ts'].content,
            ts.ScriptTarget.Latest,
            true
        );

        const output = ts.transform(source, [
            addImportsTransformer(this.getImports(playground)),
            ngModuleMetadataTransformer('imports', this.getModuleImports(playground)),
            ngModuleMetadataTransformer('declarations', this.getModuleDeclarations(playground)),
        ]);

        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

        const sourceOutput = printer.printFile(output.transformed[0]);

        files['src/app/app.module.ts'].content = sourceOutput;
    }

    private renameAngularJson(files: IFiles): void {
        // See https://github.com/codesandbox/codesandbox-client/issues/6243, remove when resolved
        files['.angular-cli.json'] = files['angular.json'];
        delete files['angular.json'];
    }

    private getImports(playground: IPlayground): ts.ImportDeclaration[] {
        return playground.modules
            .filter(module => module.library)
            .map(module => getImportDeclaration(module.library, module.imports, module.importAs));
    }

    private getModuleDeclarations(playground: IPlayground): ts.Expression[] {
        return playground.modules
            .filter(module => module.declaration)
            .reduce((declarations, module) => {
                const imports = module.imports instanceof Array ? module.imports : [module.imports];
                return [...declarations, ...imports.map(ts.factory.createIdentifier)];
            }, [] as ts.Expression[]);
    }

    private getModuleImports(playground: IPlayground): ts.Expression[] {
        return playground.modules
            .filter(module => !module.declaration)
            .reduce((declarations, module) => {
                const imports = module.imports instanceof Array ? module.imports : [module.imports];
                return [
                    ...declarations,
                    ...imports.map(_import => getModuleImportStatement(_import, module.forRoot)),
                ];
            }, [] as ts.Expression[]);
    }

    private postData(action: string, data: Record<string, string>): void {
        const form = this._document.createElement('form');

        form.action = action;
        form.method = 'POST';
        form.target = '_blank';

        for (const field in data) {
            const input = this._document.createElement('input');

            input.type = 'hidden';
            input.name = field;
            input.value = data[field];

            form.appendChild(input);
        }

        this._document.body.appendChild(form);
        form.submit();
        this._document.body.removeChild(form);
    }
}

function getImportDeclaration(
    path: string,
    imports?: string | string[],
    isAlias?: boolean
): ts.ImportDeclaration {
    if (!imports) {
        return ts.factory.createImportDeclaration(
            undefined,
            undefined,
            undefined,
            ts.factory.createStringLiteral(path)
        );
    }

    if (imports instanceof Array) {
        const importSpecifiers = imports.map(_import =>
            ts.factory.createImportSpecifier(undefined, ts.factory.createIdentifier(_import))
        );

        return ts.factory.createImportDeclaration(
            undefined,
            undefined,
            ts.factory.createImportClause(
                false,
                undefined,
                ts.factory.createNamedImports(importSpecifiers)
            ),
            ts.factory.createStringLiteral(path)
        );
    }

    if (isAlias) {
        return ts.factory.createImportDeclaration(
            undefined,
            undefined,
            ts.factory.createImportClause(
                false,
                undefined,
                ts.factory.createNamespaceImport(ts.factory.createIdentifier(imports))
            ),
            ts.factory.createStringLiteral(path)
        );
    }

    return ts.factory.createImportDeclaration(
        undefined,
        undefined,
        ts.factory.createImportClause(false, ts.factory.createIdentifier(imports), undefined),
        ts.factory.createStringLiteral(path)
    );
}

function getModuleImportStatement(moduleName: string, forRoot: boolean): ts.Expression {
    const moduleIdentifier = ts.factory.createIdentifier(moduleName);
    return forRoot
        ? ts.factory.createCallExpression(
              ts.factory.createPropertyAccessExpression(
                  moduleIdentifier,
                  ts.factory.createIdentifier('forRoot')
              ),
              undefined,
              []
          )
        : moduleIdentifier;
}

function addImportsTransformer(
    imports: ts.ImportDeclaration[]
): ts.TransformerFactory<ts.SourceFile> {
    return () => {
        const visitor: ts.Visitor = node => {
            if (ts.isSourceFile(node)) {
                return ts.factory.updateSourceFile(node, [...imports, ...node.statements]);
            }
        };

        return node => ts.visitNode(node, visitor);
    };
}

function ngModuleMetadataTransformer(
    property: 'imports' | 'declarations',
    expressions: ts.Expression[]
): ts.TransformerFactory<ts.SourceFile> {
    return context => {
        const visitor: ts.Visitor = node => {
            if (
                ts.isArrayLiteralExpression(node) &&
                node.parent &&
                ts.isPropertyAssignment(node.parent) &&
                node.parent.name.getText() === property
            ) {
                return ts.factory.createArrayLiteralExpression(
                    [...node.elements, ...expressions],
                    true
                );
            }
            return ts.visitEachChild(node, visitor, context);
        };

        return node => ts.visitNode(node, visitor);
    };
}
