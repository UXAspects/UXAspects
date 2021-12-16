import { OnDestroy, OnInit } from '@angular/core';
import {
	AbstractControl, FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class AppComponent implements OnInit, OnDestroy {

	formGroup: FormGroup = new FormGroup({
		checkbox: new FormControl(false, [Validators.required]),
		select: new FormControl({ value: undefined, disabled: true }, [Validators.required]),
	});

	options: string[] = ['Option1', 'Option2'];

	private _onDestroy$ = new Subject<void>();

	get select(): AbstractControl {
		return this.formGroup.get('select');
	}

	get checkbox(): AbstractControl {
		return this.formGroup.get('checkbox');
	}

	ngOnInit(): void {

		this.checkbox.valueChanges
			.pipe(takeUntil(this._onDestroy$))
			.subscribe((value: boolean) => {
				value ? this.select.enable() : this.select.disable();
			});
	}

	ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}