/**
 * Determine the type of icon based upon the identifier.
 *
 * We support the following iconset:
 *
 * - `hpe-icons` - HPE Icon Set
 * - `ux-icon` - UX Icon Set
 * - `component` - Component icon not tied to a specific set
 *
 * @param identifier - The name of the icon
 */
export function getIconType(identifier: string): IconType {
    if (identifier.trim().indexOf('hpe-') === 0) {
        return IconType.HpeIcon;
    }

    if (identifier.trim().indexOf('ux-') === 0) {
        return IconType.UxIcon;
    }

    return IconType.Component;
}

export enum IconType {
    HpeIcon = 'hpe-icon',
    UxIcon = 'ux-icon',
    Component = 'component'
}