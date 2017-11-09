import { EventEmitter } from '@angular/core';
export declare class FacetHeaderComponent {
    header: string;
    canExpand: boolean;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    toggleExpand(): void;
}
