import { Component } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    form = new UntypedFormGroup({
        items: new UntypedFormArray([
            new UntypedFormControl(null, [Validators.required])
        ])
    });

    get items(): UntypedFormArray {
        return this.form.get('items') as UntypedFormArray;
    }

    add(): void {
        if (this.form.valid) {
            this.items.push(new UntypedFormControl(null, [Validators.required]));
        }
    }

    remove(index: number): void {
        if (this.items.length > 1) {
            this.items.removeAt(index);
        }
    }
}
