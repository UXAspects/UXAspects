import { Component, Input, EventEmitter } from '@angular/core';

@Component({
    selector: 'ux-wizard-step',
    templateUrl: './wizard-step.component.html'
})
export class WizardStepComponent {
    
    @Input() header: string;
    @Input() valid: boolean = true;
    @Input() visitedChange = new EventEmitter<boolean>();

    private _active: boolean = false;
    private _visited: boolean = false;

    @Input() 
    get visited(): boolean {
        return this._visited;
    }

    set visited(value: boolean) {
        this._visited = value;
        this.visitedChange.next(value);
    }

    set active(value: boolean) {
        
        // store the active state of the step
        this._active = value;

        // if the value is true then the step should also be marked as visited
        if (value === true) {
            this.visited = true;
        }
    }

    get active(): boolean {
        return this._active;
    }

}