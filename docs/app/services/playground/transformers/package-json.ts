import { Injectable } from '@angular/core';
import { SiteThemeId } from '../../../interfaces/SiteTheme';
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

    protected getName(context: PlaygroundContext): string {
        return `${context.title} (UX Aspects)`;
    }

    protected getDescription(context: PlaygroundContext): string {
        return 'UX Aspects example from https://uxaspects.github.io/UXAspects';
    }

    protected getKeywords(context: PlaygroundContext): string[] {
        // add site theme and build type as keywords for reference during QA
        const keywords: string[] = [dasherize(SiteThemeId[context.theme])];
        if (!context.appConfig.isProduction) {
            keywords.push('dev');
        } else if (context.appConfig.isPreRelease) {
            keywords.push(context.appConfig.branchName ?? 'master');
        }

        return keywords;
    }

    protected getExternalDependencies(context: PlaygroundContext): { [key: string]: string } {
        const commonDependencies = {
            'bootstrap-css': '^3.3.7',
        };

        if (context.playground.framework === 'css') {
            return commonDependencies;
        }

        return {
            ...commonDependencies,
            '@angular/cdk': '^13.0.0',
            'chart.js': '~3.7.1',
            'ng2-charts': '~3.0.8',
            'ngx-bootstrap': '^8.0.0',
        };
    }

    protected getProjectDependencies(context: PlaygroundContext): { [key: string]: string } {
        const dependencies = {};
        this.getProjectPackageNames().forEach(pkg => {
            dependencies[pkg] = this.getVersionForPackage(
                getPackageScope(pkg),
                getPackageName(pkg),
                context
            );
        });

        return dependencies;
    }

    protected getProjectPackageNames(): string[] {
        return ['@ux-aspects/ux-aspects'];
    }

    private getVersionForPackage(
        packageScope: string,
        packageName: string,
        context: PlaygroundContext
    ): string {
        if (context.appConfig.isPreRelease) {
            // packages in a CI build load from Artifactory
            return this.getArtifactoryUrl(
                context.appConfig.devRepositoryUrl,
                packageScope,
                packageName,
                context.appConfig.version
            );
        }

        if (context.appConfig.isProduction) {
            // TODO: internal packages need to come from artifactory
            return context.appConfig.version;
        }

        // packages in a dev build load from localhost
        return `${context.appConfig.packagesUrl}/${packageScope}-${packageName}.tgz`;
    }

    private getArtifactoryUrl(
        repositoryUrl: string,
        packageScope: string,
        packageName: string,
        version: string
    ): string {
        return `${repositoryUrl}/%40${packageScope}/${packageName}/-/%40${packageScope}/${packageScope}-${packageName}-${version}.tgz`;
    }
}

function getPackageScope(name: string): string {
    return name.split('/')[0].substr(1);
}

function getPackageName(name: string): string {
    return name.split('/')[1];
}

function dasherize(input: string): string {
    return input.replace(/([a-z\d])([A-Z]+)/g, '$1-$2').toLowerCase();
}
