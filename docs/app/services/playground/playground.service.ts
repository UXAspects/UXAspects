import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { IFiles } from 'codesandbox-import-utils/lib/api/define';
import { getParameters } from 'codesandbox/lib/api/define';
import { IPlayground } from '../../interfaces/IPlayground';
import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { SiteThemeService } from '../site-theme/site-theme.service';
import { PlaygroundContext } from './playground-context';
import { PlaygroundTree } from './playground-tree';
import {
    PlaygroundTransformer,
    PLAYGROUND_TRANSFORMER
} from './transformer/playground-transformer';

@Injectable({
    providedIn: 'root',
})
export class PlaygroundService {
    constructor(
        @Inject(DOCUMENT) private _document: Document,
        @Inject(PLAYGROUND_TRANSFORMER) private _transformers: PlaygroundTransformer[],
        private _appConfig: AppConfiguration,
        private _siteThemeService: SiteThemeService
    ) {}

    /** Launch the code playground */
    launch(title: string, playground: IPlayground) {
        const context = this.getContext(title, playground);
        const tree = this.loadTree(playground);
        this.applyTransforms(tree, context);

        const parameters = this.getPostData(tree, context);
        this.postData('https://codesandbox.io/api/v1/sandboxes/define', { parameters });
    }

    /** Generate a context object to be used by the playground transformers. */
    private getContext(title: string, playground: IPlayground): PlaygroundContext {
        return {
            title,
            playground,
            theme: this._siteThemeService.theme$.getValue(),
            appConfig: this._appConfig,
        };
    }

    /** Load a project with files from the playground. */
    private loadTree(playground: IPlayground): PlaygroundTree {
        let tree: PlaygroundTree;

        if (playground.framework === 'angular') {
            tree = this.loadAngularTemplate();
        }

        if (playground.framework === 'css') {
            tree = this.loadCssTemplate(playground);
        }

        Object.entries(playground.files).forEach(([fileName, content]) => {
            tree.setContent(`src/app/${fileName}`, content);
        });

        return tree;
    }

    /** Transform the template project using the configured transformers. */
    private applyTransforms(tree: PlaygroundTree, context: PlaygroundContext): void {
        this._transformers.forEach(transformer => {
            transformer.transform(tree, context);
        });
    }

    /** Get the  */
    private getPostData(tree: PlaygroundTree, context: PlaygroundContext): string {
        const files = this.getIFiles(tree);
        const template = context.playground.framework === 'angular' ? 'angular-cli' : 'static';

        return getParameters({ files, template });
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

    private loadAngularTemplate(): PlaygroundTree {
        const template = require.context('./templates/angular', true, /\.(ts|html|css|json)$/);
        const paths = template.keys();
        const contents = paths.map(template);

        const tree = new PlaygroundTree();
        paths.forEach((path, index) => {
            if (path.startsWith('./')) {
                tree.setContent(path.substr(2), contents[index] as string);
            }
        });

        return tree;
    }

    private loadCssTemplate(playground: IPlayground): PlaygroundTree {
        throw new Error('Method not implemented.');
    }

    private getIFiles(tree: PlaygroundTree): IFiles {
        const files: IFiles = {};
        tree.forEach((content, path) => {
            files[path] = {
                content,
                isBinary: false,
            };
        });

        return files;
    }
}
