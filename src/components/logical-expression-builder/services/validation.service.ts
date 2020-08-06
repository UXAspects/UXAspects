import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    private _valid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private _validationStates: Map<string, boolean> = new Map<string, boolean>();

    public getValidationStatus(): Observable<boolean> {
        return this._valid.asObservable();
    }

    public setValidationState(path: number[], valid: boolean): void {
        this._validationStates.set(path.join('-'), valid);

        this._checkValidity();
    }

    public getValidationStates(): Map<string, boolean> {
        return this._validationStates;
    }

    public removeValidationState(path: number[]): void {
        this._validationStates.forEach((_value: boolean, key: string, map: Map<string, boolean>) => {
            if (key.lastIndexOf(path.join('-'), 0) === 0) {
                map.delete(key);
            }
        });

        this._checkValidity();
    }

    private _checkValidity(): void {
        if (this._validationStates.size < 1) {
            this._valid.next(false);
        } else {
            let valid = true;

            this._validationStates.forEach((value: boolean) => {
                if (!value) {
                    valid = false;
                }
            });

            this._valid.next(valid);
        }
    }
}
