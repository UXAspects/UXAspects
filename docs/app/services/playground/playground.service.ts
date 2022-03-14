import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IFiles } from 'codesandbox-import-utils/lib/api/define';
import { getParameters } from 'codesandbox/lib/api/define';
import { IPlayground } from '../../interfaces/IPlayground';
import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { SiteThemeService } from '../site-theme/site-theme.service';
import { DocumentationType, DOCUMENTATION_TOKEN } from './tokens/documentation.token';

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
        packageJson.description = 'UX Aspects example from https://uxaspects.github.io/UXAspects',
        packageJson.license = 'Apache-2.0';
        packageJson.dependencies['@ux-aspects/ux-aspects'] = 'latest';
        files['package.json'].content = JSON.stringify(packageJson, null, 2);

        for (const playgroundFile in playground.files) {
            files[`src/app/${playgroundFile}`] = {
                content: playground.files[playgroundFile],
                isBinary: false,
            };
        }
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
