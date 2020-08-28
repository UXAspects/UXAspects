import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ValidationService {
    private valid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private validationStates: Map<string, boolean> = new Map<string, boolean>();

    getValidationStatus(): Observable<boolean> {
        return this.valid.asObservable();
    }

    setValidationState(path: number[], valid: boolean): void {
        this.validationStates.set(path.join('-'), valid);

        this.checkValidity();
    }

    getValidationStates(): Map<string, boolean> {
        return this.validationStates;
    }

    removeValidationState(path: number[]): void {
        this.validationStates.forEach((_value: boolean, key: string, map: Map<string, boolean>) => {
            if (key.lastIndexOf(path.join('-'), 0) === 0) {
                map.delete(key);
            }
        });

        this.checkValidity();
    }

    private checkValidity(): void {
        if (this.validationStates.size < 1) {
            // if the expression is empty, it is invalid
            this.valid.next(false);
        } else {
            // if any condition or group is invalid, the whole expression is invalid
            let valid = true;

            this.validationStates.forEach((value: boolean) => {
                if (!value) {
                    valid = false;
                }
            });

            this.valid.next(valid);
        }
    }
}
