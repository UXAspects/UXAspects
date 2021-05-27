const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { ngPackagr } = require("ng-packagr");
const webpackConfig = require("../configs/webpack.dev.config");
const { join } = require("path");
const { cwd } = require("process");
const express = require("express");
const https = require("https");
const { readFileSync } = require("fs");
const cors = require("cors");

/**
 * This script will:
 *
 * 1) Run Webpack Dev Server to host the documentation site
 * 2) Build and Watch the Angular Library
 * 3) Start an express server to host all plunker assets on https
 *    (this means we don't rely on webpack to build our plunker Angular bundle we can use the proper tool ng-packagr,
 *     however we still rely on Webpack to build the library for our documentation site as it is much quicker)
 */
serveDocumentation();
buildAndWatchAngularLibrary();
servePlunkerAssets();

function serveDocumentation() {
  const compiler = webpack(webpackConfig);

  // Start Webpack after the library has initially compiled
  const server = new WebpackDevServer(compiler, {
    writeToDisk: true,
    historyApiFallback: true,
    stats: "minimal",
    overlay: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/1604
  });

  // begin dev server
  server.listen(8080, "127.0.0.1");
}

function buildAndWatchAngularLibrary() {
  // build and watch the Angular library for Plunker
  ngPackagr()
    .forProject("src/ng-package.json")
    .withTsConfig("src/tsconfig-build.json")
    .watch()
    .subscribe();
}

function servePlunkerAssets() {
  // start a very basic express server to access the plunker library
  const plunkerServer = express();
  plunkerServer.use(cors());

  plunkerServer.get("/assets/lib/index.js", (req, res) =>
    res.sendFile(
      join(cwd(), "dist", "library", "fesm2015", "ux-aspects-ux-aspects.js")
    )
  );

  // serve the contents of the docs assets folder
  plunkerServer.use("/assets", express.static(join("dist", "docs", "assets")));

  https
    .createServer(
      {
        pfx: readFileSync(join(cwd(), "configs", "webpack.docs.dev.pfx")),
      },
      plunkerServer
    )
    .listen(7999, () =>
      console.log("Serving plunker assets at https://localhost:7999")
    );
}
