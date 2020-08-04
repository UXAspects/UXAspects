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

    public resetValidationId(): void {
        this._validationId--;
    }

    public setGroupValidationState(validationId: number, valid: boolean) {
        this._groupStates.set(validationId, valid);
        this._valid.next(this._checkValidity());
    }

    public getGroupValidationStates(): Map<number, boolean> {
        return this._groupStates;
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

    public getConditionValidationStates(): Map<number, ConditionState[]> {
        return this._conditionStates;
    }

    public removeConditionValidationState(groupId: number, conditionId: number) {
        let temp = this._conditionStates.get(groupId).filter((entry: ConditionState) => entry.id !== conditionId);
        this._conditionStates.set(groupId, temp);

        if (this._conditionStates.get(groupId).length === 0) {
            this._conditionStates.delete(groupId);
        }

        this._valid.next(this._checkValidity());
    }

    public removeGroupValidationState(validationId: number): void {
        this._groupStates.delete(validationId);
        this._conditionStates.delete(validationId);

        this._valid.next(this._checkValidity());
    }

    public getValidationStatus(): Observable<boolean> {
        return this._valid.asObservable();
    }

    private _checkValidity(): boolean {
        let valid = true;

        // Expression is not valid if there is no condition
        if (!this._conditionStates.size) {
            return false;
        }

        // If one group is invalid, the whole expression is invalid
        this._groupStates.forEach((value, _) => {
            if (!value) {
                valid = false;
            }
        });

        // If one condition is invalid, the whole expression is invalid
        this._conditionStates.forEach((conditionStates: ConditionState[]) => {
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
