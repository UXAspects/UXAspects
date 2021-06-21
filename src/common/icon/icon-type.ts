/**
 * Determine the type of icon based upon the identifier.
 *
 * We support the following iconset:
 *
 * - `ux-icon` - UX Icon Set
 * - `component` - Component icon not tied to a specific set
 *
 * @param identifier - The name of the icon
 */
export function getIconType(identifier: string | null): IconType {
    if (identifier && identifier.trim().indexOf('ux-') === 0) {
        return IconType.UxIcon;
    }

    return IconType.Component;
}

export enum IconType {
    UxIcon = 'ux-icon',
    Component = 'component'
}
