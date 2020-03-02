import { ColumnSortingComponent } from './column-sorting.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnSortingModule } from './column-sorting.module';
import { ColumnSortingDirective, ColumnSortingState } from './column-sorting.directive';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IconComponent } from '../icon';

fdescribe('Column Sorting Component', () => {
    let fixture: ComponentFixture<ColumnSortingComponent>;
    let component: ColumnSortingComponent;
    let harness: ColumnSortingTestHarness;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ColumnSortingModule
            ],
            providers: [
                ColumnSortingDirective
            ]
        }).overrideComponent(ColumnSortingComponent, {
            set: { changeDetection: ChangeDetectionStrategy.Default }
        }).compileComponents();

        fixture = TestBed.createComponent(ColumnSortingComponent);
        component = fixture.componentInstance;
        harness = new ColumnSortingTestHarness(fixture);
        component.key = 'name-column';
        fixture.detectChanges();
    }));

    it('should not be sorted by default', () => {
        expect(harness.getIconVisible()).toBeFalsy();
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).not.toHaveBeenCalled();
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();
    });

    it('should apply correct sorting NoSort -> Ascending -> Descending -> NoSort', async () => {
        await harness.toggleSort();
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('ascend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.Ascending);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(1);
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();

        await harness.toggleSort();
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('descend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.Descending);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(2);
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();

        await harness.toggleSort();
        expect(harness.getIconVisible()).toBeFalsy();
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.NoSort);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(3);
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();
    });

    it('should apply correct sorting NoSort -> Ascending -> Descending -> Ascending when allowNoSort = false', async () => {
        component.allowNoSort = false;

        await harness.toggleSort();
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('ascend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.Ascending);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(1);
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();

        await harness.toggleSort();
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('descend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.Descending);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(2);
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();

        await harness.toggleSort();
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('ascend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.Ascending);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(3);
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();
    });

    it('should allow state to be changed using the state @Input', async () => {
        await harness.setState(ColumnSortingState.Ascending);
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('ascend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).not.toHaveBeenCalled();
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();

        await harness.setState(ColumnSortingState.Descending);
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('descend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).not.toHaveBeenCalled();
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();

        await harness.setState(ColumnSortingState.NoSort);
        expect(harness.getIconVisible()).toBeFalsy();
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).not.toHaveBeenCalled();
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();
    });

    it('should allow order to be changes using the order @Input', async () => {
        await harness.setOrder(1);
        expect(harness.getOrder()).toBe('1');
    });

    it('should update the order whenever another column is sorted', async () => {
        // sort this column
        await harness.toggleSort();
        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('ascend');
        expect(harness.getOrder()).toBe('');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.Ascending);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(1);
        expect(harness.orderChangeSpy).not.toHaveBeenCalled();

        // sort another column
        await harness.setColumnState('author-column', ColumnSortingState.Descending);

        expect(harness.getIconVisible()).toBeTruthy();
        expect(harness.getIconName()).toBe('ascend');
        expect(harness.getOrder()).toBe('1');
        expect(harness.stateChangeSpy).toHaveBeenCalledWith(ColumnSortingState.Ascending);
        expect(harness.stateChangeSpy).toHaveBeenCalledTimes(1);
        expect(harness.orderChangeSpy).toHaveBeenCalledWith(1);
        expect(harness.orderChangeSpy).toHaveBeenCalledTimes(1);
    });

});

export class ColumnSortingTestHarness {

    private _component = this._fixture.componentInstance;

    orderChangeSpy = spyOn(this._component.orderChange, 'emit');
    stateChangeSpy = spyOn(this._component.stateChange, 'emit');

    /** Access the instance of the column sorting directive */
    private _sorter: ColumnSortingDirective = TestBed.get(ColumnSortingDirective);

    constructor(private _fixture: ComponentFixture<ColumnSortingComponent>) {
    }

    /** Toggle the sort direction */
    async toggleSort(): Promise<void> {
        this._component.changeState();
        await this.forceStabilize();
    }

    /** Access the sort icon element */
    getIcon(): DebugElement {
        return this._fixture.debugElement.query(By.directive(IconComponent));
    }

    /** Get the name of the current icon */
    getIconName(): string {
        return (this.getIcon().componentInstance as IconComponent).name;
    }

    /** Determine if the icon is visible */
    getIconVisible(): boolean {
        return !(this.getIcon().nativeElement as HTMLElement).classList.contains('column-sorting-icon-hidden');
    }

    /** Access the order number */
    getOrder(): string {
        const orderNumber = this._fixture.debugElement.query(By.css('.ux-column-sorting-number'));
        const element = orderNumber.nativeElement as HTMLParagraphElement;
        return element.innerText.trim();
    }

    /** Set the order input */
    async setOrder(order: number): Promise<void> {
        this._component.order = order;
        await this.forceStabilize();
    }

    /** Set the state input */
    async setState(state: ColumnSortingState): Promise<void> {
        this._component.state = state;
        await this.forceStabilize();
    }

    /** Set the state of a column */
    async setColumnState(key: string, state: ColumnSortingState): Promise<void> {
        this._sorter.toggleColumn({ key, state });
        await this.forceStabilize();
    }

    async forceStabilize(): Promise<void> {
        this._fixture.detectChanges();
        await this._fixture.whenStable();
    }
}