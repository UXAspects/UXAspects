import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class NavigationService {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    public scrollToSection(id: string) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView(true);
            // Offset for fixed header unless scrolled to the bottom
            if ((this.document.body.scrollTop + window.innerHeight) < this.document.body.offsetHeight) {
                window.scrollBy(0, -50);
            }
        }
    }
}