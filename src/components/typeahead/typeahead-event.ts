import { FocusOrigin } from '@angular/cdk/a11y';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TypeaheadOptionEvent<T = any> {
    constructor(public option: T, public origin?: FocusOrigin) { }
}