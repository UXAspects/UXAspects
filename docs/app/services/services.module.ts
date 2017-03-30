import { NgModule } from '@angular/core';

import { AppConfiguration } from './app-configuration/app-configuration.service';
import { CodePenService } from './codepen/codepen.service';
import { EditExampleService } from './edit-example/edit-example.service';
import { LessService } from './less/less.service';
import { NavigationService } from './navigation/navigation.service';
import { PlunkerService } from './plunker/plunker.service';

/*
    Import External Services
*/

@NgModule({
    providers: [
        AppConfiguration,
        CodePenService,
        EditExampleService,
        LessService,
        NavigationService,
        PlunkerService
    ],
})
export class ServicesModule { }
