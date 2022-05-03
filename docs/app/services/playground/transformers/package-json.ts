import { Injectable } from '@angular/core';
import { SiteThemeId } from '../../../interfaces/SiteTheme';
import { PlaygroundContext, PlaygroundTree } from '../index';
import { PlaygroundTransformer } from './playground-transformer';

const COMMON_DEPENDENCIES = {
    bootstrap: '^3.3.7',
};

const ANGULAR_DEPENDENCIES = {
    ...COMMON_DEPENDENCIES,
    '@angular/cdk': '^13.0.0',
    chance: '^1.0.0',
    'chart.js': '~3.7.1',
    'ng2-charts': '~3.0.8',
};

const OPTIONAL_DEPENDENCIES = {
    'chartjs-adapter-moment': '^1.0.0',
    moment: '^2.0.0',
    'ng2-file-upload': '^1.3.0',
    'ngx-bootstrap': '^8.0.0',
    'ngx-mask': '^13.0.0',
};

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

    protected getExternalDependencies(context: PlaygroundContext): Record<string, string> {
        if (context.playground.framework === 'angular') {
            return {
                ...ANGULAR_DEPENDENCIES,
                ...this.getOptionalDependencies(context),
            };
        }

        return COMMON_DEPENDENCIES;
    }

    protected getProjectDependencies(context: PlaygroundContext): Record<string, string> {
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

    private getOptionalDependencies(context: PlaygroundContext): Record<string, string> {
        // some dependencies aren't needed in all examples
        return context.playground.modules.reduce<Record<string, string>>((dependencies, module) => {
            const library = module.library?.split('/')[0];
            if (library && OPTIONAL_DEPENDENCIES[library]) {
                return { ...dependencies, [library]: OPTIONAL_DEPENDENCIES[library] };
            }
            return dependencies;
        }, {});
    }

    private getVersionForPackage(
        packageScope: string,
        packageName: string,
        context: PlaygroundContext
    ): string {
        if (context.appConfig.isPreRelease) {
            return `${context.appConfig.baseUrl}/assets/lib/${packageScope}-${packageName}.tgz`;
        }

        if (context.appConfig.isProduction) {
            // TODO: internal packages need to come from artifactory
            return context.appConfig.version;
        }

        // packages in a dev build load from localhost
        return `${context.appConfig.packagesUrl}/${packageScope}-${packageName}.tgz`;
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
