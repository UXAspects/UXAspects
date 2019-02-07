/**
 * This is a type definition for a constructor to save us having to
 * type out (or remember) the longer syntax
 */
export type Constructor<T> = new (...args: any[]) => T;