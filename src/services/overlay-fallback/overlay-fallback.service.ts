import { ConnectedPosition, FlexibleConnectedPositionStrategy, HorizontalConnectionPos, OriginConnectionPosition, OverlayConnectionPosition, OverlayRef, VerticalConnectionPos } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AnchorPlacement } from '../../components/tooltip';

@Injectable()
export class OverlayFallbackService {

    placement: string;
    alignment: string;
    fallbackPlacement: AnchorPlacement;

    constructor() { }

    /** Updates the position of the current menu. */
    updatePosition(overlayRef: OverlayRef, placement: string, alignment: string, fallbackPlacement?: AnchorPlacement) {
        this.placement = placement;
        this.alignment = alignment;
        this.fallbackPlacement = fallbackPlacement;


        const position = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
        const origin = this.getOrigin();
        const overlay = this.getOverlayPosition();

        if (!this.fallbackPlacement) {
            position.withPositions([
                this.addOffset({ ...origin.main, ...overlay.main }),
                this.addOffset({ ...origin.fallback, ...overlay.fallback })
            ]);
        } else {
            position.withPositions([
                this.addOffset({ ...origin.main, ...overlay.main }),
                this.addOffset(this.getFallbackPosition(this.fallbackPlacement)),
            ]);
        }

    }

    /** Get the origin position based on the specified tooltip placement */
    private getOrigin(): {main: OriginConnectionPosition, fallback: OriginConnectionPosition} {

        // ensure placement is defined
        this.placement = this.placement || 'bottom';
        let originPosition: OriginConnectionPosition;

        if (this.placement === 'top' || this.placement === 'bottom') {
            originPosition = { originX: this.alignment as HorizontalConnectionPos, originY: this.placement };
        }

        if (this.placement === 'left') {
            originPosition = { originX: 'start', originY: this.getVerticalAlignment() };
        }

        if (this.placement === 'right') {
            originPosition = { originX: 'end', originY: this.getVerticalAlignment() };
        }

        const {x, y} = this.invertPosition(originPosition!.originX, originPosition!.originY);

        return {
            main: originPosition,
            fallback: {originX: x, originY: y}
        };
    }

    /** Calculate the overlay position based on the specified tooltip placement */
    private getOverlayPosition(): {main: OverlayConnectionPosition, fallback: OverlayConnectionPosition} {

        // ensure placement is defined
        this.placement = this.placement || 'top';
        let overlayPosition: OverlayConnectionPosition;

        if (this.placement === 'top') {
            overlayPosition = { overlayX: this.alignment as HorizontalConnectionPos, overlayY: 'bottom' };
        }

        if (this.placement === 'bottom') {
            overlayPosition = { overlayX: this.alignment as HorizontalConnectionPos, overlayY: 'top' };
        }

        if (this.placement === 'left') {
            overlayPosition = { overlayX: 'end', overlayY: this.getVerticalAlignment() };
        }

        if (this.placement === 'right') {
            overlayPosition = { overlayX: 'start', overlayY: this.getVerticalAlignment() };
        }

        const {x, y} = this.invertPosition(overlayPosition!.overlayX, overlayPosition!.overlayY);

        return {
            main: overlayPosition!,
            fallback: {overlayX: x, overlayY: y}
        };
    }

    /** Adds the configured offset to a position. Used as a hook for child classes. */
    private addOffset(position: ConnectedPosition): ConnectedPosition {
        return position;
    }

    /** Convert the alignment property to a valid CDK alignment value */
    private getVerticalAlignment(): VerticalConnectionPos {
        switch (this.alignment) {
            case 'start':
                return 'top';

            case 'end':
                return 'bottom';

            default:
                return this.alignment as VerticalConnectionPos;
        }
    }

    /** Inverts an overlay position. */

    // thisd is where we should change to fallback if given
    private invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {

        if (this.placement === 'top' || this.placement === 'bottom') {
            if (y === 'top') {
                y = 'bottom';
            } else if (y === 'bottom') {
                y = 'top';
            }
        } else {
            if (x === 'end') {
                x = 'start';
            } else if (x === 'start') {
                x = 'end';
            }
        }

        return { x, y };
    }

    getFallbackPosition(fallbackPlacement: string): ConnectedPosition {
        switch (fallbackPlacement) {
            case 'left':
                return { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' };
            case 'right':
                return { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' };
            case 'top':
                return { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' };
            case 'bottom':
                return { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' };
        }
    }

}
