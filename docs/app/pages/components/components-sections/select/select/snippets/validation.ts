import {
    AbstractControl, FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

export class AppComponent {

    public formGroup: FormGroup;
    public options: string[] | Function;

    get select(): AbstractControl {
        return this.formGroup.get('select');
    }

    get checkbox(): AbstractControl {
        return this.formGroup.get('checkbox');
    }

    constructor() {

        this.options = ['Option1', 'Option2'];

        this.formGroup = new FormGroup({
            checkbox: new FormControl(false, [Validators.required]),
            select: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
        });

        this.formGroup.get('checkbox').valueChanges.subscribe((value: boolean) => {
            if (value) {
                this.select.enable();
            } else {
                this.select.disable();
            }
        });
    }
}
