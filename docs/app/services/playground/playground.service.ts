import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IPlayground } from '../../interfaces/IPlayground';
import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { AngularPlaygroundStrategy } from './strategies/angular-strategy';
import { CssPlaygroundStrategy } from './strategies/css-strategy';
import { PlaygroundStrategy } from './strategies/playground-strategy';
import { DocumentationType, DOCUMENTATION_TOKEN } from './tokens/documentation.token';
import { PlaygroundHelper } from './utilities/playground-helper';

@Injectable({
    providedIn: 'root'
})
export class PlaygroundService {

    constructor(
        /** Access the document element */
        @Inject(DOCUMENT) private _document: Document,
        /** Determine if we are in a Keppel or MicroFocus documentation site */
        @Inject(DOCUMENTATION_TOKEN) private _documentationType: DocumentationType,
        /** Get the global configuation properties */
        private _appConfig: AppConfiguration
    ) { }

    /** Launch the code playground */
    launch(title: string, playground: IPlayground) {
        const form = this.initForm(title, playground);
        this._document.body.appendChild(form);
        form.submit();
        this._document.body.removeChild(form);
    }

    /** Create a form for a post submission */
    private initForm(title: string, playground: IPlayground): HTMLFormElement {

        // determine the strategy to use
        const strategy = this.createPlaygroundStrategy(playground);

        // create the index page
        const files = PlaygroundHelper.create(strategy, this._appConfig.assetsUrl, playground);

        const playgroundData = { 'description': title, 'private': true };

        for (const file in files) {
            playgroundData[`files[${file}]`] = files[file];
        }

        const form = this._document.createElement('form');

        form.action = this._appConfig.plunker;
        form.method = 'POST';
        form.target = '_blank';

        for (const field in playgroundData) {

            const input = this._document.createElement('input');

            input.type = 'hidden';
            input.name = field;
            input.value = playgroundData[field];

            form.appendChild(input);
        }

        return form;
    }

    private createPlaygroundStrategy(playground: IPlayground): PlaygroundStrategy {
        switch (playground.framework) {
            case 'css':
                return new CssPlaygroundStrategy(this._documentationType);
            case 'angular':
            default:
                return new AngularPlaygroundStrategy(this._documentationType);
        }
    }
}

export interface Library {
    path: string;
    url: string;
    asset?: boolean;
}
