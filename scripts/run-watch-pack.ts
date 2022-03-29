import { exit } from 'process';
import { err, Package, WatchPack } from './watch-pack';

(async () => {
    const packages: Package[] = [
        { dir: './dist/library', outputPath: './target/playground/ux-aspects-ux-aspects.tgz' },
    ];
    await new WatchPack(packages).run();
})().catch(error => {
    err(error);
    exit(1);
});
