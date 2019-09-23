import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export enum SidePanelAnimationState {
    Closed = 'closed',
    Open = 'open',
    OpenImmediate = 'openImmediate'
}

export const sidePanelStateAnimation: AnimationTriggerMetadata = trigger('panelState', [
    state(
        SidePanelAnimationState.Closed,
        style({ visibility: 'hidden' })
    ),
    state(
        `${SidePanelAnimationState.Open}, ${SidePanelAnimationState.OpenImmediate}`,
        style({ visibility: 'visible', transform: 'none' })
    ),
    transition(
        `void <=> ${SidePanelAnimationState.Open}`,
        animate('0.2s cubic-bezier(0.49, 1, 0.38, 0.98)')
    ),
    transition(
        `void <=> ${SidePanelAnimationState.OpenImmediate}`,
        animate('0s')
    )
]);
