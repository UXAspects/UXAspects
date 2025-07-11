import {
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  OverlayConnectionPosition,
  OverlayRef,
  VerticalConnectionPos,
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
    customFallbackPlacement?: AnchorPlacement
  ): void {
    const position = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this.getOrigin(placement, alignment);
    const overlay = this.getOverlayPosition(placement, alignment);

    position.withPositions(this.addPositions(origin, overlay, customFallbackPlacement));
  }

  /** Apply position to position strategy */
  private addPositions(
    origin: OriginConnectedPositions,
    overlay: OverlayConnectedPositions,
    customFallbackPlacement: AnchorPlacement
  ): ConnectedPosition[] {
    if (customFallbackPlacement) {
      return [
        { ...origin.main, ...overlay.main },
        this.getFallbackPosition(customFallbackPlacement),
      ];
    } else {
      return [
        { ...origin.main, ...overlay.main },
        { ...origin.fallback, ...overlay.fallback },
        {
          ...{
            originX: origin.main.originX,
            originY: this.invertHorizontalPosition(origin.main.originY),
          },
          ...{
            overlayX: overlay.main.overlayX,
            overlayY: this.invertHorizontalPosition(overlay.main.overlayY),
          },
        },
        {
          ...{
            originX: origin.fallback.originX,
            originY: this.invertHorizontalPosition(origin.fallback.originY),
          },
          ...{
            overlayX: overlay.fallback.overlayX,
            overlayY: this.invertHorizontalPosition(overlay.fallback.overlayY),
          },
        },
      ];
    }
  }

  /** Get the origin position based on the specified tooltip placement */
  private getOrigin(initialPlacement: string, alignment: string): OriginConnectedPositions {
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

    const { x, y } = this.invertPosition(
      placement,
      originPosition!.originX,
      originPosition!.originY
    );

    return {
      main: originPosition,
      fallback: { originX: x, originY: y },
    };
  }

  /** Calculate the overlay position based on the specified tooltip placement */
  private getOverlayPosition(
    initialPlacement: string,
    alignment: string
  ): OverlayConnectedPositions {
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

    const { x, y } = this.invertPosition(
      placement,
      overlayPosition!.overlayX,
      overlayPosition!.overlayY
    );

    return {
      main: overlayPosition!,
      fallback: { overlayX: x, overlayY: y },
    };
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

  invertHorizontalPosition(y: string): 'top' | 'center' | 'bottom' {
    return y === 'top' ? 'bottom' : 'top';
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
