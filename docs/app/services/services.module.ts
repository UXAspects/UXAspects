import { NgModule } from '@angular/core';

import { AppConfiguration } from './app-configuration/app-configuration.service';
import { CodePenService } from './codepen/codepen.service';
import { EditExampleService } from './edit-example/edit-example.service';
// import { LessService } from './less/less.service';
import { NavigationService } from './navigation/navigation.service';
import { PlunkerService } from './plunker/plunker.service';
import { ResolverService } from './resolver/resolver.service';
import { VersionService } from './version/version.service';

const DOCUMENTATION_PROVIDERS = [
    AppConfiguration,
    CodePenService,
    EditExampleService,
    // LessService,
    NavigationService,
    PlunkerService,
    ResolverService,
    VersionService
];


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: DOCUMENTATION_PROVIDERS,
})
export class DocumentationProvidersModule { }
