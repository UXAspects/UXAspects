import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessibilityModule, Color, ColorService, ColorServiceModule, colorSets } from '@ux-aspects/ux-aspects';
import { first } from 'rxjs/operators';
import { PartitionMapComponent, PartitionMapSegmentWithChildren } from './partition-map.component';

describe('Partition Map Component', () => {
    let component: PartitionMapComponent;
    let fixture: ComponentFixture<PartitionMapComponent>;
    let segments: NodeListOf<HTMLDivElement>;
    const colorService = new ColorService(colorSets.microFocus);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                AccessibilityModule,
                ColorServiceModule.forRoot(colorSets.microFocus),
            ],
            declarations: [PartitionMapComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartitionMapComponent);
        component = fixture.componentInstance;

        // supply the colorset
        component.colors = [
            [Color.Gray3],
            [Color.Gray4, Color.Gray5],
            [Color.Chart1, Color.Chart2, Color.Chart3]
        ];

        // supply an initial dataset
        component.dataset = {
            name: 'My Workspace',
            children: [
                {
                    name: 'Financial Data',
                    children: [
                        { name: 'Sensitive', value: 60 },
                        { name: 'Partially Sensitive', value: 60 },
                        { name: 'To be retained', value: 120 },
                        { name: 'Redundant', value: 30 },
                        { name: 'Obsolete', value: 30 },
                    ]
                },
                {
                    name: 'Identification Data',
                    children: [
                        { name: 'Sensitive', value: 60 },
                        { name: 'Partially Sensitive', value: 60 },
                        { name: 'To be retained', value: 60 },
                        { name: 'Redundant', value: 10 },
                        { name: 'Obsolete', value: 10 },
                    ]
                },
                {
                    name: 'Contact Data',
                    children: [
                        { name: 'Sensitive', value: 30 },
                        { name: 'Partially Sensitive', value: 30 },
                        { name: 'To be retained', value: 30 },
                        { name: 'Redundant', value: 5 },
                        { name: 'Obsolete', value: 5 },
                    ]
                }
            ]
        };

        fixture.detectChanges();

        // get the segment elements
        segments = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLDivElement>('.partition-map-segment');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initially have the correct segments', () => {
        expect(segments.length).toBe(19);
    });

    it('should display the correct labels', () => {
        expect(segments.item(0).innerText).toBe('My Workspace');
        expect(segments.item(1).innerText).toBe('Financial Data');
        expect(segments.item(2).innerText).toBe('Identification Data');
        expect(segments.item(3).innerText).toBe('Contact Data');
        expect(segments.item(4).innerText).toBe('Sensitive');
        expect(segments.item(5).innerText).toBe('Partially Sensitive');
        expect(segments.item(6).innerText).toBe('To be retained');
        expect(segments.item(7).innerText).toBe('Redundant');
        expect(segments.item(8).innerText).toBe('Obsolete');
        expect(segments.item(9).innerText).toBe('Sensitive');
        expect(segments.item(10).innerText).toBe('Partially Sensitive');
        expect(segments.item(11).innerText).toBe('To be retained');
        expect(segments.item(12).innerText).toBe('Redundant');
        expect(segments.item(13).innerText).toBe('Obsolete');
        expect(segments.item(14).innerText).toBe('Sensitive');
        expect(segments.item(15).innerText).toBe('Partially Sensitive');
        expect(segments.item(16).innerText).toBe('To be retained');
        expect(segments.item(17).innerText).toBe('Redundant');
        expect(segments.item(18).innerText).toBe('Obsolete');
    });

    it('should have the correct segment colors', () => {
        expect(segments.item(0).style.backgroundColor).toBe('rgb(101, 102, 104)');
        expect(segments.item(1).style.backgroundColor).toBe('rgb(220, 222, 223)');
        expect(segments.item(2).style.backgroundColor).toBe('rgb(241, 242, 243)');
        expect(segments.item(3).style.backgroundColor).toBe('rgb(220, 222, 223)');
        expect(segments.item(4).style.backgroundColor).toBe('rgb(57, 57, 198)');
        expect(segments.item(5).style.backgroundColor).toBe('rgb(67, 228, 255)');
        expect(segments.item(6).style.backgroundColor).toBe('rgb(255, 69, 79)');
        expect(segments.item(7).style.backgroundColor).toBe('rgb(255, 206, 0)');
        expect(segments.item(8).style.backgroundColor).toBe('rgb(186, 71, 226)');
        expect(segments.item(9).style.backgroundColor).toBe('rgb(57, 57, 198)');
        expect(segments.item(10).style.backgroundColor).toBe('rgb(67, 228, 255)');
        expect(segments.item(11).style.backgroundColor).toBe('rgb(255, 69, 79)');
        expect(segments.item(12).style.backgroundColor).toBe('rgb(255, 206, 0)');
        expect(segments.item(13).style.backgroundColor).toBe('rgb(186, 71, 226)');
        expect(segments.item(14).style.backgroundColor).toBe('rgb(57, 57, 198)');
        expect(segments.item(15).style.backgroundColor).toBe('rgb(67, 228, 255)');
        expect(segments.item(16).style.backgroundColor).toBe('rgb(255, 69, 79)');
        expect(segments.item(17).style.backgroundColor).toBe('rgb(255, 206, 0)');
        expect(segments.item(18).style.backgroundColor).toBe('rgb(186, 71, 226)');
    });

    it('should collapse root segment when immediate child is selected', () => {
        expect(segments.item(0).getAttribute('aria-expanded')).toBe('true');
        expect(segments.item(1).getAttribute('aria-expanded')).toBe('true');
        expect(segments.item(0).getAttribute('aria-selected')).toBe('false');
        expect(segments.item(1).getAttribute('aria-selected')).toBe('false');
        segments.item(1).click();
        fixture.detectChanges();
        expect(segments.item(0).getAttribute('aria-expanded')).toBe('false');
        expect(segments.item(1).getAttribute('aria-expanded')).toBe('true');
        expect(segments.item(0).getAttribute('aria-selected')).toBe('false');
        expect(segments.item(1).getAttribute('aria-selected')).toBe('true');
    });

    it('should collapse all parents when leaf segment is selected', () => {
        expect(segments.item(0).getAttribute('aria-expanded')).toBe('true');
        expect(segments.item(1).getAttribute('aria-expanded')).toBe('true');
        expect(segments.item(4).getAttribute('aria-expanded')).toBe('true');
        segments.item(4).click();
        fixture.detectChanges();
        expect(segments.item(0).getAttribute('aria-expanded')).toBe('false');
        expect(segments.item(1).getAttribute('aria-expanded')).toBe('false');
        expect(segments.item(4).getAttribute('aria-expanded')).toBe('true');
    });

    it('should apply appropriate classes for color contrast ratio', () => {
        expect(segments.item(0).classList.contains('partition-map-segment-light')).toBe(true);
        expect(segments.item(0).classList.contains('partition-map-segment-dark')).toBe(false);
        expect(segments.item(1).classList.contains('partition-map-segment-light')).toBe(false);
        expect(segments.item(1).classList.contains('partition-map-segment-dark')).toBe(true);
    });

    it('should only allow tabbing to the root node initially', () => {
        Array.from(segments).forEach((segment, index) => {
            expect(segment.tabIndex).toBe(index === 0 ? 0 : -1);
        });
    });

    it('should only allow tabbing to the selected node', () => {

        segments.item(4).click();
        fixture.detectChanges();

        Array.from(segments).forEach((segment, index) => {
            expect(segment.tabIndex).toBe(index === 4 ? 0 : -1);
        });
    });

    it('should move selection to the parent when the selected node is clicked again', () => {
        segments.item(4).click();
        fixture.detectChanges();
        expect(segments.item(4).getAttribute('aria-selected')).toBe('true');
        segments.item(4).click();
        fixture.detectChanges();
        expect(segments.item(1).getAttribute('aria-selected')).toBe('true');
        expect(segments.item(4).getAttribute('aria-selected')).toBe('false');
    });

    it('should emit selectedChange @Output when an item is selected', (done) => {

        // watch for the event to be emitted
        component.selectedChange.pipe(first()).subscribe(selected => {
            expect(selected.name).toBe('Financial Data');
            done();
        });

        // select an item
        segments.item(1).click();
    });

    it('should allow a segment to be programmatically selected using the selected @Input', () => {

        // the node should segment be selected initially
        expect(segments.item(1).getAttribute('aria-selected')).toBe('false');

        // get the segment we want to select
        const segment = (component.dataset as PartitionMapSegmentWithChildren).children[0];

        // select the segment using the input
        component.selected = segment;

        /**
         * Workaround for TestBed bug on components with ChangeDetectionStrategy.OnPush
         * https://github.com/angular/angular/issues/12313#issuecomment-263978801
         */
        (component as any)._changeDetector.markForCheck();

        // run change detection
        fixture.detectChanges();

        // it should now be selected
        expect(segments.item(1).getAttribute('aria-selected')).toBe('true');
    });

    it('should allow the dataset to change using the dataset @Input', () => {
        component.dataset = {
            name: 'Root Segment',
            children: [
                { name: 'Segment One', value: 100 },
                { name: 'Segment Two', value: 50 }
            ]
        };

        fixture.detectChanges();

        // get the segment elements
        segments = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLDivElement>('.partition-map-segment');

        expect(segments.length).toBe(3);

        expect(segments.item(0).innerText).toBe('Root Segment');
        expect(segments.item(1).innerText).toBe('Segment One');
        expect(segments.item(2).innerText).toBe('Segment Two');
    });

    it('should allow the colors to change using the colors @Input', () => {
        // supply the new colorset
        component.colors = [
            [Color.Primary],
            [Color.Gray, Color.BrightGray],
            colorSequence.getSequence(ColorSequence.SecondaryLightExtendedAlt)
        ];

        /**
         * Workaround for TestBed bug on components with ChangeDetectionStrategy.OnPush
         * https://github.com/angular/angular/issues/12313#issuecomment-263978801
         */
        (component as any)._changeDetector.markForCheck();

        // run change detection
        fixture.detectChanges();

        expect(segments.item(0).style.backgroundColor).toBe(colorService.getColor(Color.Primary).toRgb());
    });

    it('should allow arrow keys to move focus down', () => {

        // select the root node
        segments.item(0).click();

        // press the arrow key
        segments.item(0).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        // trigger change detection
        fixture.detectChanges();

        // the first child should receive focus and tab index
        expect(segments.item(1).tabIndex).toBe(0);
    });

    it('should allow arrow keys to move focus up', () => {

        // select a node
        segments.item(1).click();

        // press the arrow key
        segments.item(1).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        // trigger change detection
        fixture.detectChanges();

        // the segment should receive focus and tab index
        expect(segments.item(0).tabIndex).toBe(0);
    });

    it('should allow arrow keys to move focus right', () => {

        // select a node
        segments.item(1).click();

        // click again to retain focus but don't collapse/expand
        segments.item(1).click();

        // press the arrow key
        segments.item(1).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

        // trigger change detection
        fixture.detectChanges();

        // the segment should receive focus and tab index
        expect(segments.item(2).tabIndex).toBe(0);
    });

    it('should allow arrow keys to move focus left', () => {

        // select a node
        segments.item(2).click();

        // click again to retain focus but don't collapse/expand
        segments.item(2).click();

        // press the arrow key
        segments.item(2).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

        // trigger change detection
        fixture.detectChanges();

        // the segment should receive focus and tab index
        expect(segments.item(1).tabIndex).toBe(0);
    });

    it('should allow END key to move focus to end', () => {

        // select a node
        segments.item(1).click();

        // click again to retain focus but don't collapse/expand
        segments.item(1).click();

        // press the arrow key
        segments.item(1).dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));

        // trigger change detection
        fixture.detectChanges();

        // the segment should receive focus and tab index
        expect(segments.item(3).tabIndex).toBe(0);
    });

    it('should allow HOME key to move focus to start', () => {

        // select a node
        segments.item(3).click();

        // click again to retain focus but don't collapse/expand
        segments.item(3).click();

        // press the arrow key
        segments.item(3).dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));

        // trigger change detection
        fixture.detectChanges();

        // the segment should receive focus and tab index
        expect(segments.item(1).tabIndex).toBe(0);
    });

    it('should not allow left arrow key movement when the node is selected (as siblings are not visible)', () => {
        // select a node
        segments.item(2).click();

        // press the arrow key
        segments.item(2).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

        // trigger change detection
        fixture.detectChanges();

        // the segment should receive focus and tab index
        expect(segments.item(2).tabIndex).toBe(0);
    });

    it('should not allow right arrow key movement when the node is selected (as siblings are not visible)', () => {
        // select a node
        segments.item(2).click();

        // press the arrow key
        segments.item(2).dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

        // trigger change detection
        fixture.detectChanges();

        // the segment should receive focus and tab index
        expect(segments.item(2).tabIndex).toBe(0);
    });

});
