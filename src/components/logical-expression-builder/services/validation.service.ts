import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    private _validationId: number = 0;
    private _groupStates: Map<number, boolean> = new Map<number, boolean>();
    private _conditionStates: Map<number, ConditionState[]> = new Map<number, ConditionState[]>();
    private _valid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public getValidationId(): number {
        this._validationId++;
        return this._validationId - 1;
    }

    public setValidationState(validationId: number, valid: boolean) {
        this._groupStates.set(validationId, valid);
        this._valid.next(this._checkValidity());
    }

    public setConditionValidationState(groupId: number, conditionId: number, valid: boolean) {
        if (this._conditionStates.has(groupId)) {
            let temp = this._conditionStates.get(groupId);
            let toReplace = temp.find((entry: ConditionState) => entry.id === conditionId);

            if (toReplace) {
                toReplace.valid = valid;
                temp = [...temp.filter((entry: ConditionState) => entry.id !== conditionId), toReplace];
            } else {
                temp = [...temp, { id: conditionId, valid }];
            }

            this._conditionStates.set(groupId, temp);
        } else {
            this._conditionStates.set(groupId, [{ id: conditionId, valid }]);
        }

        this._valid.next(this._checkValidity());
    }

    public removeConditionValidationState(groupId: number, conditionId: number) {
        let temp = this._conditionStates.get(groupId).filter((entry: ConditionState) => entry.id !== conditionId);
        this._conditionStates.set(groupId, temp);

        if (this._conditionStates.get(groupId).length === 0) {
            this._conditionStates.delete(groupId);
        }

        this._valid.next(this._checkValidity());
    }

    public removeValidationState(validationId: number): void {
        this._groupStates.delete(validationId);
        this._conditionStates.delete(validationId);

        this._valid.next(this._checkValidity());
    }

    public getValidationStatus(): Observable<boolean> {
        return this._valid.asObservable();
    }

    private _checkValidity(): boolean {
        let valid = true;

        // forEach for IE support
        this._groupStates.forEach((value, _) => {
            if (!value) {
                valid = false;
            }
        });

        this._conditionStates.forEach((conditionStates: ConditionState[], groupId: number) => {
            conditionStates.map((value: ConditionState) => {
                if (!value.valid) {
                    valid = false;
                }
            });
        });

        return valid;
    }
}

type ConditionState = { id: number, valid: boolean };
