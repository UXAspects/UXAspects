import { InjectionToken } from '@angular/core';
import { PlaygroundContext, PlaygroundTree } from '../index';

export const PLAYGROUND_TRANSFORMER = new InjectionToken('PLAYGROUND_TRANSFORMER');

export interface PlaygroundTransformer {
    transform(tree: PlaygroundTree, context: PlaygroundContext): void;
}
