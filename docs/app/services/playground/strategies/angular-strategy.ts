import { IPlayground } from '../../../interfaces/IPlayground';
import { DocumentationType } from '../tokens/documentation.token';
import { SystemJSHelper } from '../utilities/system-helper';
import { PlaygroundStrategy } from './playground-strategy';

export class AngularPlaygroundStrategy extends PlaygroundStrategy {

    getGlobalExternalScripts(): string[] {
        return [
            `https://cdnjs.cloudflare.com/ajax/libs/typescript/2.7.2/typescript.min.js`,
            `https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.min.js`,
            `https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.8.26/zone.min.js`,
            `https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.47/system.js`,
            'systemjs.config.js'
        ];
    }

    getGlobalScripts(assetsUrl: string): string[] {
        return [
            `window.uxdAssetsUrl = '${assetsUrl}';`
        ];
    }

    getBodyScripts(): string[] {
        return [`System.import('main.ts').catch(console.error.bind(console));`];
    }

    getGlobalExternalStyles(assetsUrl: string): string[] {
        const stylesheets = [
            SystemJSHelper.getPackageUrl({ name: 'bootstrap', path: 'bootstrap@3.3.7/dist/css/bootstrap.min.css' }),
        ];

        if (this.documentationType === DocumentationType.Keppel) {
            stylesheets.push(`${assetsUrl}/css/ux-aspects.css`);
        } else {
            stylesheets.push(`${assetsUrl}/styles/ux-aspects.css`);
            stylesheets.push(`${assetsUrl}/styles/quantum-ux-aspects.css`);
        }

        return stylesheets;
    }

    getGlobalStyles(): string[] {
        return [`body { padding: 15px; background-color: #fff; }`];
    }

    getBody(): string {
        return `<app>Loading...</app>`;
    }

    /** Get the files to include in the playground */
    getFiles(playground: IPlayground, assetsUrl: string): { [filename: string]: string } {
        return {
            'main.ts': this.createAppModule(playground),
            'systemjs.config.js': SystemJSHelper.getSystemJSConfig(this.documentationType, assetsUrl),
            ...playground.files
        };
    }

    private createAppModule(playground: IPlayground): string {
        const modules = ['BrowserModule', 'FormsModule', 'ReactiveFormsModule', 'BrowserAnimationsModule'];
        const declarations = ['AppComponent'];
        const imports: string[] = [];

        if (playground.modules) {
            // create list of declarations
            playground.modules.filter(dependency => dependency.declaration).forEach(dependency => {
                if (dependency.imports instanceof Array) {
                    declarations.push(...dependency.imports);
                } else {
                    declarations.push(dependency.imports);
                }
            });

            // create list of module imports
            playground.modules.filter(module => !module.declaration).forEach(module => {

                let moduleImports: string | string[];

                if (module.forRoot) {
                    moduleImports = Array.isArray(module.imports) ? module.imports.map(imp => `${imp}.forRoot()`) : `${module.imports}.forRoot()`;
                }

                const moduleImportProviders = module.providers || moduleImports || module.imports;

                if (moduleImportProviders instanceof Array) {
                    modules.push(...moduleImportProviders);
                } else {
                    modules.push(moduleImportProviders);
                }
            });

            // generate the import statements
            playground.modules.forEach(dependency => {

                if (dependency.library) {

                    if (!dependency.imports) {
                        imports.push(`import '${dependency.library}';`);
                    } else if (dependency.imports instanceof Array) {
                        imports.push(`import { ${dependency.imports.join(', ')} } from '${dependency.library}';`);
                    } else if (dependency.importAs) {
                        imports.push(`import * as ${dependency.imports} from '${dependency.library}';`);
                    } else {
                        imports.push(`import ${dependency.imports} from '${dependency.library}';`);
                    }
                }
            });

            return [
                `import { NgModule } from '@angular/core';`,
                `import { BrowserModule } from '@angular/platform-browser';`,
                `import { FormsModule, ReactiveFormsModule } from '@angular/forms';`,
                `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';`,
                `import { AppComponent } from './app.component';`,
                `import { BrowserAnimationsModule } from '@angular/platform-browser/animations';`,
                `import { AccessibilityModule, ColorServiceModule, colorSets } from '@ux-aspects/ux-aspects';`,
                `${imports.join(';\n')}`,
                ``,
                `@NgModule({`,
                `    imports: [`,
                `      AccessibilityModule,`,
                `      ColorServiceModule.forRoot(${this.documentationType === DocumentationType.Keppel ? 'colorSets.keppel' : 'colorSets.microFocus'}),`,
                `${modules.filter(module => module !== undefined).map(module => `\t\t\t${module},`).join('\n')}`,
                `    ],`,
                `    declarations: [`,
                `${declarations.map(declaration => `\t\t\t${declaration},`).join('\n')}`,
                `    ],`,
                `    bootstrap: [AppComponent]`,
                `})`,
                `export class AppModule {`,
                `}`,
                ``,
                `platformBrowserDynamic().bootstrapModule(AppModule);`,
            ].join('\n');
        }
    }
}