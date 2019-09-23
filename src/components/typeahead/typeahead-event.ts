import { FocusOrigin } from '@angular/cdk/a11y';

export class TypeaheadOptionEvent<T = any> {
    constructor(public option: T, public origin?: FocusOrigin) { }
}