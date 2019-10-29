import { platform } from 'os';
import { browser } from 'protractor';

/**
 * Compare the screenshots to detect visual changes.
 *
 * We can only compare on a Linux environment, otherwise font rendering
 * is different and we will always have variations causing tests to fail.
 */
export async function imageCompare(name: string): Promise<number> {
    return platform() === 'linux' ? await browser.imageComparison.checkScreen(name) : 0;
}

/**
 * Compare the full page screenshots to detect visual changes.
 *
 * We can only compare on a Linux environment, otherwise font rendering
 * is different and we will always have variations causing tests to fail.
 */
export async function imageCompareFullPageScreen(name: string): Promise<number> {
    return platform() === 'linux' ? await browser.imageComparison.checkFullPageScreen(name) : 0;
}