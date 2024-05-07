import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionModule } from './accordion.module';


@Component({
    selector: 'app-accordion',
    template: `<ux-accordion [collapseOthers]="true">

  @for (group of groups; track group) {
    <ux-accordion-panel
      class="accordion-chevron"
      [heading]="group.heading"
      [(expanded)]="group.open"
      [disabled]="group.disabled">
      <span>{{ group.content }}</span>
    </ux-accordion-panel>
  }

</ux-accordion>`
})
export class AccordionComponent {

    groups: AccordionGroup[] = [
        {
            heading: 'Accordion 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            open: true
        },
        {
            heading: 'Accordion 2',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            open: false
        },
        {
            heading: 'Accordion 3',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            open: false,
            disabled: true
        }
    ];
}

describe('Accordion', () => {
    let component: AccordionComponent;
    let fixture: ComponentFixture<AccordionComponent>;
    let nativeElement: HTMLElement;
    let accordionPanels: NodeListOf<Element>;


    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AccordionModule],
            declarations: [AccordionComponent],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccordionComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should have the correct aria-expanded label', () => {
        accordionPanels = nativeElement.querySelectorAll('.panel');
        expect(accordionPanels[0].querySelector('.panel-heading').getAttribute('aria-expanded')).toBe('true');
        expect(accordionPanels[1].querySelector('.panel-heading').getAttribute('aria-expanded')).toBe('false');
        expect(accordionPanels[2].querySelector('.panel-heading').getAttribute('aria-expanded')).toBe('false');
    });

    it('should have the correct aria-disabled label', () => {
        accordionPanels = nativeElement.querySelectorAll('.panel');
        expect(accordionPanels[2].querySelector('.panel-heading').getAttribute('aria-disabled')).toBe('true');
    });

});

interface AccordionGroup {
    heading: string;
    content: string;
    open: boolean;
    disabled?: boolean;
}