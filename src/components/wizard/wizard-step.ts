export interface WizardStep {
    header: string;
    disableNextWhenInvalid: boolean | undefined;
    valid: boolean;
    visited: boolean;
    active: boolean;
    completed?: boolean;

    setVisited(value: boolean): void;
    validator: () => boolean | Promise<boolean>;
}
