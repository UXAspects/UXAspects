import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ThemeService {

    theme$ = new BehaviorSubject<Theme>(Theme.Keppel);

    setTheme(theme: Theme): void {
        if (this.getTheme() !== theme) {
            this.theme$.next(theme);
        }
    }

    getTheme(): Theme {
        return this.theme$.getValue();
    }
}

export enum Theme {
    Keppel,
    MicroFocus
}