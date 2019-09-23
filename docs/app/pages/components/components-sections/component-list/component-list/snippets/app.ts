import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent {

    form = new FormGroup({
        items: new FormArray([
            new FormControl(null, [Validators.required])
        ])
    });

    get items(): FormArray {
        return this.form.get('items') as FormArray;
    }

    add(): void {
        if (this.form.valid) {
            this.items.push(new FormControl(null, [Validators.required]));
        }
    }

    remove(index: number): void {
        if (this.items.length > 1) {
            this.items.removeAt(index);
        }
    }
}