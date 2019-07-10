/**
 * This is used to avoid having to do an `instanceof` check
 * which would cause a circular dependency between the
 * `MenuComponent` and `MenuItemComponent`
 */
export enum MenuItemType {
    Default,
    Custom
}