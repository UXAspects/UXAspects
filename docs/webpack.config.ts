import { CustomWebpackBrowserSchema, TargetOptions } from '@angular-builders/custom-webpack';
import * as webpack from 'webpack';
import * as pkg from '../src/package.json';

export default (
    config: webpack.Configuration,
    options: CustomWebpackBrowserSchema,
    targetOptions: TargetOptions
) => {
    // Add NodeJS fallbacks
    config.resolve ??= {};
    config.resolve.fallback = {
        perf_hooks: false,
    };

    config.resolveLoader = {
        ...config.resolveLoader,
        alias: {
            'code-snippet-loader': './configs/loaders/code-snippet-loader.js',
            'markdown-highlighter-loader': './configs/loaders/markdown-highlighter-loader.js',
        },
    };

    // the list of file types that may be used by snippets
    const extensions = ['.html', '.js', '.css', '.ts'];

    // find any rules that match the extensions and exclude the snippets and templates folders
    for (const rule of config.module.rules ?? []) {
        const webpackRule = rule as webpack.RuleSetRule;

        // check if rule.test is a regex
        if (webpackRule.test instanceof RegExp) {
            const test = webpackRule.test as RegExp;
            // check if the regex matches any of the extensions
            if (extensions.some(ext => test.test(ext))) {
                // exclude the snippets and templates folders
                webpackRule.exclude = /(snippets|templates)/;
            }
        }
    }

    config.module.rules.push({
        test: /\.(html|js|css|ts)$/,
        include: /snippets/,
        use: 'code-snippet-loader',
    });

    config.module.rules.push({
        test: /\.txt$/,
        type: 'asset/source',
    });

    config.module.rules.push({
        test: /\.md$/,
        use: [
            {
                loader: 'html-loader',
                options: { esModule: false },
            },
            'markdown-highlighter-loader',
        ],
    });

    config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf|mp4|mp3|vtt)$/,
        type: 'asset/resource',
    });

    config.module.rules.push({
        test: /playground[/\\]templates/,
        type: 'asset/source',
    });

    config.plugins.push(
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pkg.version),
            PRODUCTION: targetOptions.configuration === 'production',
        })
    );

    return config;
};
