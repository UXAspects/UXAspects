import { Injectable } from '@angular/core';

import { CodePenService } from '../codepen/codepen.service';
import { PlunkerService } from '../plunker/plunker.service';
import { ICodePen } from '../../interfaces/ICodePen';
import { IPlunk } from '../../interfaces/IPlunk';

@Injectable()
export class EditExampleService {

    constructor(private codePenService: CodePenService, private plunkerService: PlunkerService) {}

    public launchEditor(title: string, content: any, type: 'codepen' | 'plunker') {
        switch (type) {
            case 'codepen':
                this.codePenService.launch(title, <ICodePen>content);
                break;
            case 'plunker':
                this.plunkerService.launch(title, <IPlunk>content);
                break;
        }
    }

}