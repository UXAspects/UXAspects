import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { IPlunk } from '../../interfaces/IPlunk';

const ASSETS_URL_PLACEHOLDER_REGEX = /\$\{assetsUrl\}/g;
const MODULES_PLACEHOLDER = /\$\{modules\}/g;
const DECLARATIONS_PLACEHOLDER = /\$\{declarations\}/g;
const IMPORTS_PLACEHOLDER = /\$\{imports\}/g;

@Injectable()
export class PlunkerService {

    indexTemplate: string;
    mainTs: string;
    private assetsUrl = this.appConfig.get('assetsUrl');
    private plunkerPostUrl = this.appConfig.get('plunker');

    constructor( @Inject(DOCUMENT) private document: Document, private appConfig: AppConfiguration) { }

    launch(title: string, plunk: IPlunk) {

        const form = this.initForm(title, plunk);

        this.document.body.appendChild(form);

        form.submit();

        this.document.body.removeChild(form);
    }

    private initForm(title: string, plunk: IPlunk): HTMLFormElement {

        let modules = ['BrowserModule', 'FormsModule', 'ReactiveFormsModule', 'BrowserAnimationsModule'];
        let declarations = ['AppComponent'];
        let imports: string[] = [];

        if (plunk.modules) {
            // create list of declarations
            plunk.modules.filter(dependency => dependency.declaration).forEach(dependency => {
                if (dependency.imports instanceof Array) {
                    declarations = declarations.concat(dependency.imports);
                } else {
                    declarations.push(dependency.imports);
                }
            });

            // create list of module imports
            plunk.modules.filter(module => !module.declaration).forEach(module => {

                let moduleImports: string | string[];

                if (module.forRoot) {
                    moduleImports = Array.isArray(module.imports) ? module.imports.map(imp => `${imp}.forRoot()`) : `${module.imports}.forRoot()`;
                }

                const moduleImportProviders = module.providers || moduleImports || module.imports;
                if (moduleImportProviders instanceof Array) {
                    modules = modules.concat(moduleImportProviders);
                } else {
                    modules.push(moduleImportProviders);
                }
            });

            // generate the import statements
            plunk.modules.forEach(dependency => {

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
        }

        if (!this.indexTemplate) {
            this.indexTemplate = require('./templates/index_html.txt')
                .replace(ASSETS_URL_PLACEHOLDER_REGEX, this.assetsUrl);
        }

        if (!this.mainTs) {
            this.mainTs = require('./templates/main_ts.txt');
        }

        const mainTs = this.mainTs
            .replace(MODULES_PLACEHOLDER, modules.filter(module => module !== undefined).join(`, \n${' '.repeat(8)}`))
            .replace(MODULES_PLACEHOLDER, (modules.filter(module => module !== undefined).join(`, \n${' '.repeat(8)}`)))
            .replace(DECLARATIONS_PLACEHOLDER, (declarations.join(`, \n${' '.repeat(8)}`)))
            .replace(IMPORTS_PLACEHOLDER, imports.join('\n'));

        const configJs = require('./templates/config_js.txt');

        const postData = {
            'description': title,
            'private': true,
            'files[index.html]': this.indexTemplate,
            'files[systemjs.config.js]': configJs,
            'files[main.ts]': mainTs
        };

        for (let key in plunk.files) {
            postData[`files[${key}]`] = plunk.files[key];
        }

        const form = this.document.createElement('form');

        form.action = this.plunkerPostUrl;
        form.method = 'POST';
        form.target = '_blank';

        for (let field in postData) {

            const input = this.document.createElement('input');

            input.type = 'hidden';
            input.name = field;
            input.value = postData[field];

            form.appendChild(input);
        }

        return form;
    }
}