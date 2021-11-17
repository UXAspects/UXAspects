import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../configs/webpack.e2e.config.mjs';

const compiler = webpack(webpackConfig);
const devServerOptions = {
    ...webpackConfig.devServer,
    port: 4000,
    host: '127.0.0.1',
};
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
    console.log('Successfully started server on http://localhost:4000');
});
