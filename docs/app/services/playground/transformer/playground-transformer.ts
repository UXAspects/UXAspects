import { InjectionToken } from '@angular/core';
import { PlaygroundContext } from '../playground-context';
import { PlaygroundTree } from '../playground-tree';

export const PLAYGROUND_TRANSFORMER = new InjectionToken('PLAYGROUND_TRANSFORMER');

export interface PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void;
}
