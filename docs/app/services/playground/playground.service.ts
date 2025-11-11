import { Injectable, DOCUMENT, inject } from '@angular/core';
import { IFiles } from 'codesandbox-import-utils/lib/api/define';
import { getParameters } from 'codesandbox/lib/api/define';
import { IPlayground } from '../../interfaces/IPlayground';
import { AppConfiguration } from '../app-configuration/app-configuration.service';
import { SiteThemeService } from '../site-theme/site-theme.service';
import { PlaygroundContext } from './playground-context';
import { PlaygroundTree } from './playground-tree';
import {
  PLAYGROUND_TRANSFORMER,
  PlaygroundTransformer,
} from './transformers/playground-transformer';

@Injectable({
  providedIn: 'root',
})
export class PlaygroundService {
  private readonly _document = inject<Document>(DOCUMENT);
  private readonly _transformers = inject(PLAYGROUND_TRANSFORMER);
  private readonly _appConfig = inject(AppConfiguration);
  private readonly _siteThemeService = inject(SiteThemeService);


  /** Launch the code playground */
  async launch(title: string, playground: IPlayground) {
    const context = this.getContext(title, playground);
    const tree = this.loadTree(playground);
    await this.applyTransforms(tree, context);

    const data = this.getPostData(tree, context);
    this.post(this._appConfig.playgroundUrl, data);
  }

  /** Generate a context object to be used by the playground transformers. */
  private getContext(title: string, playground: IPlayground): PlaygroundContext {
    return {
      title,
      playground,
      theme: this._siteThemeService.theme$.getValue(),
      appConfig: this._appConfig,
      htmlEntryPoint: playground.framework === 'angular' ? 'src/index.html' : 'index.html',
      cssEntryPoint: playground.framework === 'angular' ? 'src/styles.css' : 'styles.css',
    };
  }

  /** Load a project with files from the playground. */
  private loadTree(playground: IPlayground): PlaygroundTree {
    switch (playground.framework) {
      case 'angular':
        return this.createTreeWithTemplate(
          import.meta.webpackContext('./templates/angular', {
            recursive: true,
            regExp: /\.(ts|js|html|css|json)$/,
          })
        );
      case 'css':
        return this.createTreeWithTemplate(
          import.meta.webpackContext('./templates/css', {
            recursive: true,
            regExp: /\.(ts|js|html|css|json)$/,
          })
        );
    }
  }

  /** Transform the template project using the configured transformers. */
  private async applyTransforms(tree: PlaygroundTree, context: PlaygroundContext): Promise<void> {
    for (const transformer of this._transformers) {
      await transformer.transform(tree, context);
    }
  }

  /** Get the serialized data to post to the codesandbox API. */
  private getPostData(tree: PlaygroundTree, context: PlaygroundContext): Record<string, string> {
    const files = this.getIFiles(tree);
    const template = context.playground.framework === 'angular' ? 'angular-cli' : 'parcel';
    const initialFile =
      context.playground.framework === 'angular' ? '/src/app/app.component.html' : '/index.html';

    return {
      parameters: getParameters({ files, template }),
      query: `file=${initialFile}`,
    };
  }

  private post(action: string, data: Record<string, string>): void {
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

  private createTreeWithTemplate(template: __WebpackModuleApi.RequireContext): PlaygroundTree {
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
