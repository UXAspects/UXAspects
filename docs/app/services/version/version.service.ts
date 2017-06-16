import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable()
export class VersionService {

    version: string = 'Angular';

    @Output() versionChange: EventEmitter<string> = new EventEmitter<string>();

    constructor() {}

    toggle(version: string): void {
        if (this.version !== version) {
            this.version = version;
            this.versionChange.emit(this.version);
        }
    }

}