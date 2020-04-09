import { BadgeHorizontalPosition, BadgeSize, BadgeVerticalPosition } from '../../../../src/directives/badge';

export const anchorData: BadgeTestComponentData = {
    content: '1475',
    maxValue: null,
    ariaDescription: null,
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
    ariaDescription: 'Action required on these items in your task list',
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
    ariaDescription: string;
    overlap: boolean;
    verticalPosition: BadgeVerticalPosition;
    horizontalPosition: BadgeHorizontalPosition;
    badgeHidden: boolean;
    size: BadgeSize;
    badgeColor: string;
}
