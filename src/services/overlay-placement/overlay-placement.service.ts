import {
    ConnectedPosition,
    FlexibleConnectedPositionStrategy,
    HorizontalConnectionPos,
    OriginConnectionPosition,
    OverlayConnectionPosition,
    OverlayRef,
    VerticalConnectionPos
} from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { AnchorPlacement } from '../../common/overlay/index';

@Injectable({
    providedIn: 'root',
})
export class OverlayPlacementService {

    /** Updates the position of the current menu. */
    updatePosition(
        overlayRef: OverlayRef,
        placement: string,
        alignment: string,
        customFallbackPlacement?: AnchorPlacement,
        isSubMenu?: boolean
    ): void {
        const position = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
        const origin = this.getOrigin(placement, alignment);
        const overlay = this.getOverlayPosition(placement, alignment);

        position.withPositions(this.addPositions(origin, overlay, isSubMenu, customFallbackPlacement));
    }

    /** Apply position to position strategy */
    private addPositions(
        origin: OriginConnectedPositions,
        overlay: OverlayConnectedPositions,
        isSubMenu: boolean,
        customFallbackPlacement: AnchorPlacement
    ): ConnectedPosition[] {
        if (customFallbackPlacement) {
            return [
                this.addOffset({ ...origin.main, ...overlay.main }),
                this.addOffset(this.getFallbackPosition(customFallbackPlacement)),
            ];
        } else if (isSubMenu) {
            return [
                this.addOffset({ ...origin.main, ...overlay.main }),
                this.addOffset({ ...origin.fallback, ...overlay.fallback }),
                this.addOffset({ ...{ originX: 'end', originY: 'bottom' }, ...{ overlayX: 'start', overlayY: 'bottom' } }),
                this.addOffset({ ...{ originX: 'start', originY: 'bottom' }, ...{ overlayX: 'end', overlayY: 'bottom' } })
            ];
        } else {
            return [
                this.addOffset({ ...origin.main, ...overlay.main }),
                this.addOffset({ ...origin.fallback, ...overlay.fallback })
            ];
        }
    }

    /** Get the origin position based on the specified tooltip placement */
    private getOrigin(
        initialPlacement: string,
        alignment: string
    ): { main: OriginConnectionPosition; fallback: OriginConnectionPosition } {
        // ensure placement is defined
        const placement = initialPlacement || 'bottom';
        let originPosition: OriginConnectionPosition;

        if (placement === 'top' || placement === 'bottom') {
            originPosition = { originX: alignment as HorizontalConnectionPos, originY: placement };
        }

        if (placement === 'left') {
            originPosition = { originX: 'start', originY: this.getVerticalAlignment(alignment) };
        }

        if (placement === 'right') {
            originPosition = { originX: 'end', originY: this.getVerticalAlignment(alignment) };
        }

        const { x, y } = this.invertPosition(placement, originPosition!.originX, originPosition!.originY);

        return {
            main: originPosition,
            fallback: { originX: x, originY: y },
        };
    }

    /** Calculate the overlay position based on the specified tooltip placement */
    private getOverlayPosition(
        initialPlacement: string,
        alignment: string
    ): { main: OverlayConnectionPosition; fallback: OverlayConnectionPosition } {
        // ensure placement is defined
        const placement = initialPlacement || 'top';
        let overlayPosition: OverlayConnectionPosition;

        if (placement === 'top') {
            overlayPosition = { overlayX: alignment as HorizontalConnectionPos, overlayY: 'bottom' };
        }

        if (placement === 'bottom') {
            overlayPosition = { overlayX: alignment as HorizontalConnectionPos, overlayY: 'top' };
        }

        if (placement === 'left') {
            overlayPosition = { overlayX: 'end', overlayY: this.getVerticalAlignment(alignment) };
        }

        if (placement === 'right') {
            overlayPosition = { overlayX: 'start', overlayY: this.getVerticalAlignment(alignment) };
        }

        const { x, y } = this.invertPosition(placement, overlayPosition!.overlayX, overlayPosition!.overlayY);

        return {
            main: overlayPosition!,
            fallback: { overlayX: x, overlayY: y },
        };
    }

    /** Adds the configured offset to a position. Used as a hook for child classes. */
    private addOffset(position: ConnectedPosition): ConnectedPosition {
        return position;
    }

    /** Convert the alignment property to a valid CDK alignment value */
    private getVerticalAlignment(alignment: string): VerticalConnectionPos {
        switch (alignment) {
            case 'start':
                return 'top';

            case 'end':
                return 'bottom';

            default:
                return alignment as VerticalConnectionPos;
        }
    }

    /** Inverts an overlay position. */
    private invertPosition(placement: string, x: HorizontalConnectionPos, y: VerticalConnectionPos) {
        if (placement === 'top' || placement === 'bottom') {
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

    private getFallbackPosition(fallbackPlacement: string): ConnectedPosition {
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

interface OriginConnectedPositions {
    main: OriginConnectionPosition;
    fallback: OriginConnectionPosition;
}

interface OverlayConnectedPositions {
    main: OverlayConnectionPosition;
    fallback: OverlayConnectionPosition;
}