import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconModule } from './icon.module';
import { IconService } from './icon.service';
import { hpeIconset } from './iconsets/hpe-iconset';

@Component({
    selector: 'ux-icon-test',
    template: `<ux-icon [name]="name" [size]="size" [rotate]="rotate" [flipHorizontal]="flipHorizontal" [flipVertical]="flipVertical"></ux-icon>`
})
export class IconTestComponent {
    @Input() name: string;
    @Input() size: string;
    @Input() rotate: 90 | 180 | 270;
    @Input() flipHorizontal: boolean;
    @Input() flipVertical: boolean;
}

describe('Icon Component', () => {
    let component: IconTestComponent;
    let fixture: ComponentFixture<IconTestComponent>;
    let iconElement: HTMLElement;
    let service: IconService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IconModule],
            declarations: [IconTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IconTestComponent);
        component = fixture.componentInstance;
        iconElement = fixture.elementRef.nativeElement.querySelector('ux-icon');
        service = TestBed.get(IconService);

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    /**
     * Use Case 1
     * Allow icons to be looked up from iconset by name
     */
    it('should assign the correct classes based on the specified icon name', () => {
        component.name = 'alert';
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeTruthy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeTruthy();
    });

    it('should not override any user defined classes', () => {
        component.name = 'alert';
        iconElement.classList.add('custom-class');
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeTruthy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeTruthy();
        expect(iconElement.classList.contains('custom-class')).toBeTruthy();
    });

    /**
     * Use Case 2
     * Allow substitution of icon class and iconset class
     */
    it('should assign the correct classes based on the specified icon name', () => {
        component.name = 'alert';

        // perform an override using the service
        service.setIcon({ name: 'alert', icon: 'qtm-icon-error', iconset: 'qtm-font-icon' });

        fixture.detectChanges();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeTruthy();
    });

    it('should update existing icons if the definition changes after initialisation', () => {
        component.name = 'alert';
        fixture.detectChanges();

        expect(iconElement.classList.contains('ux-icon')).toBeTruthy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeTruthy();

        // perform an override using the service
        service.setIcon({ name: 'alert', icon: 'qtm-icon-error', iconset: 'qtm-font-icon' });

        fixture.detectChanges();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeTruthy();
    });

    /**
     * Use Case 3
     * Allow transformation of an icon
     */
    it('should assign the correct classes based on the specified rotation', () => {
        component.name = 'alert';
        component.rotate = 90;
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-rotate-90')).toBeTruthy();

        component.rotate = 180;
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-rotate-180')).toBeTruthy();

        component.rotate = 270;
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-rotate-270')).toBeTruthy();
    });

    it('should assign the correct classes based on the specified flip', () => {
        component.name = 'alert';
        component.flipHorizontal = true;
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-flip-horizontal')).toBeTruthy();

        component.flipVertical = true;
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-flip-vertical')).toBeTruthy();
    });

    it('should assign the correct style based on the specified size', () => {
        component.name = 'alert';
        component.size = '24px';
        fixture.detectChanges();
        expect(iconElement.style.fontSize).toBe('24px');

        component.size = '3rem';
        fixture.detectChanges();
        expect(iconElement.style.fontSize).toBe('3rem');

        component.size = '2em';
        fixture.detectChanges();
        expect(iconElement.style.fontSize).toBe('2em');
    });

    /**
     * Use Case 4
     * Allow alternate glyphs for different font sizes.
     */
    it('should allow alternate glyphs for different font sizes', () => {
        component.name = 'alert';

        // perform an override using the service
        service.setIcon({ name: 'alert', icon: 'qtm-icon-error', iconset: 'qtm-font-icon', size: '24px' });

        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeTruthy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeFalsy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeFalsy();

        component.size = '24px';
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeFalsy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeFalsy();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeTruthy();
    });

    it('should allow alternate glyphs for different font sizes (array)', () => {
        component.name = 'alert';

        // perform an override using the service
        service.setIcon({ name: 'alert', icon: 'qtm-icon-error', iconset: 'qtm-font-icon', size: ['24px', '32px'] });

        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeTruthy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeFalsy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeFalsy();

        component.size = '24px';
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeFalsy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeFalsy();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeTruthy();

        component.size = '28px';
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeTruthy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeFalsy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeFalsy();

        component.size = '32px';
        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeFalsy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeFalsy();
        expect(iconElement.classList.contains('qtm-icon-error')).toBeTruthy();
        expect(iconElement.classList.contains('qtm-font-icon')).toBeTruthy();
    });

    /**
     * Use Case 5
     * Allow batch config
     */
    it('should assign the correct classes based on the specified icon name', () => {
        component.name = 'alert';

        // perform an override using the service
        service.setIcons(hpeIconset);

        fixture.detectChanges();
        expect(iconElement.classList.contains('ux-icon')).toBeFalsy();
        expect(iconElement.classList.contains('ux-icon-alert')).toBeFalsy();
        expect(iconElement.classList.contains('hpe-icon')).toBeTruthy();
        expect(iconElement.classList.contains('hpe-alert')).toBeTruthy();
    });
});
