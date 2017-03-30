import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
    selector: '[boldify-menu-item]',
    host: {
        '(click)': 'onClick($event)'
    }
})
export class BoldifyDirective {
    constructor( private elementRef: ElementRef, private renderer: Renderer2 ) {

    }

    onClick(event: MouseEvent) {

        let menuItems = this.elementRef.nativeElement.querySelectorAll('.selected-side-menu-item');

        for (let i = 0; i < menuItems.length; i++) {
            menuItems.get(i).classList.remove('selected-side-menu-item');
        }

        let target = event.target as HTMLElement;

        target.classList.add('selected-side-menu-item');

        let parent = target.parentElement;

        while (parent.classList.contains('selected') && parent.tagName === 'LI') {
            parent.querySelector('a').classList.add('selected-side-menu-item');
            parent = parent.parentElement;
        }
    }
}
