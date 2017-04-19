import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { IPlunk } from '../../interfaces/IPlunk';

const ASSETS_URL_PLACEHOLDER_REGEX = /\$\{assetsUrl\}/g;
const MODULES_PLACEHOLDER = /\$\{modules\}/g;
const IMPORTS_PLACEHOLDER = /\$\{imports\}/g;
const MAP_PLACEHOLDER = /\$\{map\}/g;

@Injectable()
export class PlunkerService {

    private assetsUrl = this.appConfig.get('assetsUrl');
    private plunkerPostUrl = this.appConfig.get('plunker');

    constructor(@Inject(DOCUMENT) private document: Document, private appConfig: AppConfiguration) {}

    public launch(title: string, plunk: IPlunk) {

        const form = this.initForm(title, plunk);

        this.document.body.appendChild(form);

        form.submit();

        this.document.body.removeChild(form);
    }

    private initForm(title: string, plunk: IPlunk): HTMLFormElement {

        let modules = (plunk.modules && plunk.modules.imports) ? plunk.modules.imports: '';
        let library = (plunk.modules && plunk.modules.library) ? plunk.modules.library: '';
        let imports = (modules && library) ? 'import { ' + modules + ' } from \'' + library + '\';': '';
        let map = (plunk.modules && plunk.modules.map) ? '\'' + plunk.modules.map.alias + '\': \'' + plunk.modules.map.source + '\'': '';
        let indexHtml = require('./templates/index_html.txt').replace(ASSETS_URL_PLACEHOLDER_REGEX, this.assetsUrl);
        let mainTs = require('./templates/main_ts.txt').replace(MODULES_PLACEHOLDER, modules).replace(IMPORTS_PLACEHOLDER, imports);
        let configJs = require('./templates/config_js.txt').replace(MAP_PLACEHOLDER, map);

        const postData = {
            'description': title,
            'private': true,
            'files[index.html]': indexHtml,
            'files[config.js]': configJs,
            'files[src/main.ts]': mainTs
        };

        for (let key in plunk.files) {
            postData[`files[src/${key}]`] = plunk.files[key];
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