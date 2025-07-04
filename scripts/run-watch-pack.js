const { exit } = require('process');
const { err, WatchPack } = require('./lib/watch-pack');

(async () => {
  const packages = [
    { dir: './dist/library', outputPath: './target/playground/ux-aspects-ux-aspects.tgz' },
  ];
  await new WatchPack(packages).run();
})().catch(error => {
  err(error);
  exit(1);
});
