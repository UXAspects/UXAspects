import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ExpressionCondition, ExpressionGroup } from '../interfaces/LogicalExpressionBuilderExpression';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { ValidationService } from '../services/validation.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'ux-leb-group',
    templateUrl: './leb-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebGroupComponent implements OnInit, OnDestroy {
    @Output() groupChange: EventEmitter<ExpressionGroup> = new EventEmitter<ExpressionGroup>();

    @Input() subExpression: ExpressionGroup;
    @Input() logicalOperatorName: string;
    @Input() indent: number = 0;

    public additionalIndent: number = 40;
    public logicalOperators: LogicalOperatorDefinition[];
    public selectedLogicalOperator: LogicalOperatorDefinition;

    public _focused: boolean = false;
    public _valid: boolean = true;
    public _validationId: number;
    public _errorType: string;
    public _showAddBtn: boolean = true;

    public _wasLastFocused$: Observable<boolean>;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _lebService: LogicalExpressionBuilderService, private _validationService: ValidationService) {
        this._validationId = this._validationService.getValidationId();
    }

    ngOnInit(): void {
        this.logicalOperators = this._lebService.getLogicalOperators();
        this.selectedLogicalOperator = this._lebService.getLogicalOperatorByName(this.logicalOperatorName);
        this._validate();

        this._wasLastFocused$ = this._lebService.getLastFocused().pipe(
            takeUntil(this._destroy$),
            map((ids: [number, number]) => ids[0] === this._validationId && ids[1] === null)
        );
    }

    ngOnDestroy(): void {
        this._validationService.removeGroupValidationState(this._validationId);
        this._validationService.resetValidationId();

        this._destroy$.next();
        this._destroy$.complete();
    }

    public handleSelectedOperatorChange(selectedOperator: LogicalOperatorDefinition) {
        this.selectedLogicalOperator = selectedOperator;
        this.subExpression = { ...this.subExpression, logicalOperator: this.selectedLogicalOperator.name };

        this._validate();
        this.groupChange.emit(this.subExpression);

        this._lebService.setLastFocused([this._validationId, null]);
    }

    public handleGroupChange(subExpression: ExpressionGroup | ExpressionCondition, index: number) {
        if (subExpression) {
            this.subExpression.children[index] = subExpression;
        } else {
            let temp = [...this.subExpression.children];
            temp.splice(index, 1);
            this.subExpression.children = [...temp];
        }

        this._validate();
        this.groupChange.emit(this.subExpression);
    }

    public addCondition(): void {
        this.subExpression.children = [...this.subExpression.children, {
            type: 'condition',
            field: null,
            operator: null,
            value: null,
            editMode: true,
        }];

        this._validate();
        this.groupChange.emit(this.subExpression);

        this._lebService.setLastFocused([this._validationId, this.subExpression.children.length]);
        this._lebService.setEditBlocked(true);
    }

    public addGroup(): void {
        this.subExpression.children = [...this.subExpression.children, {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [
                { type: 'condition', field: null, operator: null, value: null, editMode: true },
            ],
        }];

        this._validate();
        this._lebService.setEditBlocked(true);
        this._lebService.setLastFocused([null, null]);
    }

    public removeConditionAtIndex(id: number): void {
        this.subExpression.children = this.subExpression.children.filter((_, index) => {
            return index !== id;
        });

        this._validate();
        this.groupChange.emit(this.subExpression);
    }

    public embedConditionAtIndex(id: number): void {
        let tempExpression = this.subExpression;
        const condition = tempExpression.children[id];

        tempExpression.children[id] = <ExpressionGroup>{
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [condition],
        };

        this.subExpression = tempExpression;

        this._validate();
        this.groupChange.emit(this.subExpression);
        this._lebService.setLastFocused([this._validationId, null]);
    }

    public deleteGroup(): void {
        this.subExpression = null;
        this.groupChange.emit(this.subExpression);
        this._lebService.setLastFocused([this._validationId - 1, null]);
    }

    private _validate(logicalOperator: LogicalOperatorDefinition = this.selectedLogicalOperator): boolean {
        if ('minNumberOfChildren' in logicalOperator && 'maxNumberOfChildren' in logicalOperator) {
            const numberOfChildren = this.subExpression.children?.length;
            const tooFew = !(numberOfChildren >= logicalOperator.minNumberOfChildren);
            const tooMany = !(numberOfChildren <= logicalOperator.maxNumberOfChildren);

            this._valid = !tooFew && !tooMany;

            if (!this._valid && tooFew) {
                this._errorType = 'logicalOperatorTooFewErrorText';
            } else if (!this._valid && tooMany) {
                this._errorType = 'logicalOperatorTooManyErrorText';
            }

            this._showAddBtn = !tooMany;
        } else if ('minNumberOfChildren' in logicalOperator) {
            this._valid = this.subExpression.children?.length >= logicalOperator.minNumberOfChildren;
            this._errorType = this._valid ? '' : 'logicalOperatorTooFewErrorText';
            this._showAddBtn = true;
        } else if ('maxNumberOfChildren' in logicalOperator) {
            this._valid = this.subExpression.children?.length <= logicalOperator.maxNumberOfChildren;
            this._errorType = this._valid ? '' : 'logicalOperatorTooManyErrorText';
            this._showAddBtn = this.subExpression.children?.length < logicalOperator.maxNumberOfChildren;
        }

        this._validationService.setGroupValidationState(this._validationId, this._valid);
        return this._valid;
    }
}
