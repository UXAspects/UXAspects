import { EventEmitter } from '@angular/core';
export declare class WizardStepComponent {
    header: string;
    valid: boolean;
    visitedChange: EventEmitter<boolean>;
    private _active;
    private _visited;
    visited: boolean;
    active: boolean;
}
