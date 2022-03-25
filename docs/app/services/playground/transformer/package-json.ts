import { Injectable } from '@angular/core';
import { SiteThemeId } from 'docs/app/interfaces/SiteTheme';
import { PlaygroundContext } from '../playground-context';
import { PlaygroundTree } from '../playground-tree';
import { PlaygroundTransformer } from './playground-transformer';

/**
 * Add dependencies and other metadata to the playground's package.json file.
 */
@Injectable()
export class PackageJsonPlaygroundTransformer implements PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void {
        tree.updateJsonFile('package.json', packageJson => {
            packageJson.name = this.getName(context);
            packageJson.description = this.getDescription(context);
            packageJson.keywords = this.getKeywords(context);
            packageJson.license = 'Apache-2.0';
            packageJson.dependencies = {
                ...packageJson.dependencies,
                ...this.getExternalDependencies(context),
                ...this.getProjectDependencies(context),
            };

            return packageJson;
        });
    }

    getName(context: PlaygroundContext): string {
        return `${context.title} (UX Aspects)`;
    }

    getDescription(context: PlaygroundContext): string {
        return 'UX Aspects example from https://uxaspects.github.io/UXAspects';
    }

    getKeywords(context: PlaygroundContext): string[] {
        return [SiteThemeId[context.theme]];
    }

    getExternalDependencies(context: PlaygroundContext): { [key: string]: string } {
        return {
            '@angular/cdk': '^12.0.0',
            'bootstrap-css': '^3.3.7',
            'chart.js': '~3.7.1',
            'ng2-charts': '~3.0.8',
            'ngx-bootstrap': '^6.0.0',
        };
    }

    getProjectDependencies(context: PlaygroundContext): { [key: string]: string } {
        return {
            '@ux-aspects/ux-aspects': this.getPackageVersion(context),
        };
    }

    private getPackageVersion(context: PlaygroundContext): string {
        if (context.appConfig.isProduction) {
            return context.appConfig.version;
        }

        if (context.appConfig.isPreRelease) {
            // TODO: load from Artifactory
            throw new Error('Not yet implemented');
        }

        return 'http://localhost:8090/ux-aspects-ux-aspects.tgz';
    }
}
