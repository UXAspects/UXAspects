import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FrameExtractionService } from './frame-extraction.service';

/**
 * Note: This is a workaround for the Angular 8 providedIn: 'root'
 * issue.
 *
 * This provider allows us to have only a single instance
 * of the service throughout out entire application
 * regardless of how many times this module is imported.
 */
export function FRAME_EXTRACTION_SERVICE_PROVIDER_FACTORY(parentService: FrameExtractionService) {
    return parentService || new FrameExtractionService();
}

export const FRAME_EXTRACTION_SERVICE_PROVIDER = {
    provide: FrameExtractionService,
    deps: [[new Optional(), new SkipSelf(), FrameExtractionService]],
    useFactory: FRAME_EXTRACTION_SERVICE_PROVIDER_FACTORY
};

@NgModule({
    providers: [FRAME_EXTRACTION_SERVICE_PROVIDER]
})
export class FrameExtractionModule {}
