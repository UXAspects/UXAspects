import { Injectable } from '@angular/core';
import { IPlayground } from '../../interfaces/IPlayground';
import { PlaygroundService } from '../playground/playground.service';

@Injectable({
  providedIn: 'root',
})
export class EditExampleService {
  constructor(private readonly _playgroundService: PlaygroundService) {}

  launchEditor(title: string, content: IPlayground) {
    content.framework = content.framework ?? 'angular';
    content.modules = content.modules ?? [];
    this._playgroundService.launch(title, content);
  }
}
