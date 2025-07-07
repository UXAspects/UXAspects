import { Injectable } from '@angular/core';
import { PlaygroundContext, PlaygroundTree } from '../index';
import { PlaygroundTransformer } from './playground-transformer';

/**
 * Add the ux-icons font to the playground.
 * Although UX Aspects embeds this font, the way we are importing it triggers santization.
 * Since the icon set doesn't change much, and can be live previewed in the doc site, this is
 * always imported from the latest release for simplicity
 */
@Injectable()
export class IconSetPlaygroundTransformer implements PlaygroundTransformer {
  // eslint-disable-next-line @typescript-eslint/require-await
  async transform(tree: PlaygroundTree, context: PlaygroundContext): Promise<void> {
    tree.appendContent(
      context.cssEntryPoint,
      `
@font-face {
  font-family: "ux-icons";
  src: url(https://unpkg.com/@ux-aspects/ux-aspects@latest/fonts/ux-icons.woff)
    format("woff");
  font-weight: normal;
  font-style: normal;
}`
    );
  }
}
