import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class VersionService {

    version: BehaviorSubject<Version> = new BehaviorSubject<Version>(Version.Angular);

    constructor() {
        this.toggle(this.toVersion(window.localStorage.getItem('version')));
    }

    toggle(version: Version): void {
        if (this.version.getValue() !== version) {
            window.localStorage.setItem('version', version.toString());
            this.version.next(version);
        }
    }

    toVersion(version: string): Version {
        return version.toLowerCase() === '0' ? Version.AngularJS : Version.Angular;
    }

}

export enum Version {
    AngularJS,
    Angular
}