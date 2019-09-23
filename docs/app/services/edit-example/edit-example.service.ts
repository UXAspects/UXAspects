import { Injectable } from '@angular/core';
import { IPlayground } from '../../interfaces/IPlayground';
import { PlaygroundService } from '../playground/playground.service';

@Injectable({
    providedIn: 'root'
})
export class EditExampleService {

    constructor(private _playgroundService: PlaygroundService) { }

    launchEditor(title: string, content: IPlayground) {
        this._playgroundService.launch(title, content);
    }

}