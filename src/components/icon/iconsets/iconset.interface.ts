export interface IconDefinition {
    name: string;
    iconset: string;
    icon: string;
    size?: string | string[];
}

/**
 * This is an internal interface that ensures size is a string
 * and not an array as internally we will store an individual record
 * for each size but we allow the user to pass us definitions with an
 * array for convenience.
 */
export interface SingleIconDefinition extends IconDefinition {
    size?: string;
}
