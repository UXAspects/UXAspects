import { TextInputComponent } from './text-input.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('TextInputComponent', () => {
    let component: TextInputComponent;
    let fixture: ComponentFixture<TextInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TextInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TextInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeDefined();
    });
});
