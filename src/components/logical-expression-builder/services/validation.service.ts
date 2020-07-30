import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    private _validationId: number = 0;
    private _validationStates: Map<number, boolean> = new Map<number, boolean>();
    private _valid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public getValidationId(): number {
        this._validationId++;
        return this._validationId - 1;
    }

    public setValidationState(validationId: number, valid: boolean) {
        this._validationStates.set(validationId, valid);
        this._valid.next(this._checkValidity());
    }

    public removeValidationState(validationId: number): void {
        this._validationStates.delete(validationId);
    }

    public getValid(): Observable<boolean> {
        return this._valid.asObservable();
    }

    private _checkValidity(): boolean {
        let valid = true;

        // forEach for IE support
        this._validationStates.forEach((value, _) => {
            if (!value) {
                valid = false;
            }
        });

        return valid;
    }
}
