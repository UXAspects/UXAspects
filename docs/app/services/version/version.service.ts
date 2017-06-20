import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class VersionService {

    version: BehaviorSubject<Version> = new BehaviorSubject<Version>(Version.Angular);

    constructor() {
        this.setVersion(this.toVersion(window.localStorage.getItem('version')));
    }

    setVersion(version: Version): void {
        if (this.version.getValue() !== version) {
            window.localStorage.setItem('version', version.toString());
            this.version.next(version);
        }
    }

    toVersion(version: string): Version {
        let value = parseInt(version);
        if (!value) {
            value = 1;
        }
        return value === Version.AngularJS ? Version.AngularJS : Version.Angular;
    }

}

export enum Version {
    AngularJS,
    Angular
}