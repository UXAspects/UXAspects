export declare class ProgressBarComponent {
    value: number;
    min: number;
    max: number;
    indeterminate: boolean;
    trackColor: string;
    barColor: string;
    /** When indeteminate we should omit the valuenow label */
    readonly valueNow: number;
}
