import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { IPlunk } from '../../interfaces/IPlunk';

const ASSETS_URL_PLACEHOLDER_REGEX = /\$\{assetsUrl\}/g;

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

        let indexHtml = require('./templates/index_html.txt').replace(ASSETS_URL_PLACEHOLDER_REGEX, this.assetsUrl);

        const postData = {
            'description': title,
            'private': true,
            'files[index.html]': indexHtml,
            'files[config.js]': require('./templates/config_js.txt'),
            'files[src/main.ts]': require('./templates/main_ts.txt')
        };

        for (let key in plunk) {
            postData[`files[src/${key}]`] = plunk[key];
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