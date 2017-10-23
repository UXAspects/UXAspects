import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ISection } from '../../interfaces/ISection';
import { PersistentDataService } from '../../../../src/index';

@Injectable()
export class VersionService {

    version: BehaviorSubject<Version> = new BehaviorSubject<Version>(Version.Angular);

    constructor(private _persistentDataService: PersistentDataService) {
        this.setVersion(this.toVersion(this._persistentDataService.getItem('version')));
    }

    setVersion(version: Version): void {
        if (this.version.getValue() !== version) {
            this._persistentDataService.setItem('version', version.toString());
            this.version.next(version);
        }
    }

    toVersion(version: string): Version {
        let value = parseInt(version);
        if (isNaN(value)) {
            value = Version.Angular;
        }
        return value === Version.AngularJS ? Version.AngularJS : Version.Angular;
    }

    isSectionVersionMatch(section: ISection): boolean {
        switch (this.version.getValue()) {
            case Version.AngularJS:
                return section.version === 'AngularJS' || section.version === undefined;
            case Version.Angular:
                return section.version === 'Angular' || !section.deprecated;
        }
        return true;
    }

}

export enum Version {
    AngularJS,
    Angular
}

export function versionFromString(value: string) {
    switch (value) {
        case 'AngularJS':
            return Version.AngularJS;
        case 'Angular':
            return Version.Angular;
    }

    return null;
}