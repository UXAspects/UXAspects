import { IndexHtmlWebpackPlugin } from '@angular-devkit/build-angular/src/webpack/plugins/index-html-webpack-plugin.js';
import { generateEntryPoints } from '@angular-devkit/build-angular/src/utils/package-chunk-sort.js';

export async function getIndexConfig(wco) {
    return {
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|otf|mp4|mp3|vtt)$/,
                    type: 'asset/resource',
                }
            ]
        },
        plugins: [
            new IndexHtmlWebpackPlugin({
                indexPath: wco.buildOptions.index,
                outputPath: 'index.html',
                entrypoints: generateEntryPoints({
                    styles: wco.buildOptions.styles,
                    scripts: wco.buildOptions.scripts
                }),
                sri: false,
            }),
        ]
    }
}
