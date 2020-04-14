import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '../../../../src/directives/badge';

export const iconData: BadgeTestComponentData = {
    content: '2',
    maxValue: null,
    overlap: true,
    verticalPosition: 'above',
    horizontalPosition: 'after',
    badgeHidden: false,
    size: 'medium',
    badgeColor: 'ok',
};

export const anchorData: BadgeTestComponentData = {
    content: '1475',
    maxValue: null,
    overlap: true,
    verticalPosition: 'above',
    horizontalPosition: 'after',
    badgeHidden: false,
    size: 'medium',
    badgeColor: 'primary',
};

export const buttonData: BadgeTestComponentData = {
    content: 'Action required on these items',
    maxValue: null,
    overlap: true,
    verticalPosition: 'below',
    horizontalPosition: 'before',
    badgeHidden: false,
    size: 'small',
    badgeColor: 'alternate2',
};

export interface BadgeTestComponentData {
    content: string;
    maxValue: number;
    overlap: boolean;
    verticalPosition: BadgeVerticalPosition;
    horizontalPosition: BadgeHorizontalPosition;
    badgeHidden: boolean;
    size: BadgeSize;
    badgeColor: string;
}
