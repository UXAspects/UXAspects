import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Expression, ExpressionCondition, ExpressionGroup } from '../interfaces/Expression';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { ValidationService } from '../services/validation.service';
import { FocusHandlerService } from '../services/focus-handler.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'ux-leb-group',
    templateUrl: './leb-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebGroupComponent implements OnInit, OnDestroy {
    @Output() subExpressionChange: EventEmitter<ExpressionGroup> = new EventEmitter<ExpressionGroup>();

    @Input() indent: number = 0;
    @Input() path: number[];

    @Input()
    set subExpression(_subExpression: ExpressionGroup) {
        this._subExpression = { ..._subExpression };
        this._children = [..._subExpression?.children];
    }

    get subExpression(): ExpressionGroup {
        return this._subExpression;
    }

    private _subExpression: ExpressionGroup;
    public _children: ReadonlyArray<Expression>;

    public readonly additionalIndent: number = 40;
    public logicalOperators: LogicalOperatorDefinition[];
    public _logicalOperatorOptions: ReadonlyArray<LogicalOperatorDefinition> = null;
    public selectedLogicalOperator: LogicalOperatorDefinition;

    public _focused: boolean = false;
    public _valid: boolean = true;
    public _errorMessage: string;
    public _showAddBtn: boolean = false;
    public _editBlocked$: Observable<boolean>;

    constructor(
        private _lebService: LogicalExpressionBuilderService,
        private _validationService: ValidationService,
        private _focusHandler: FocusHandlerService) {
        this._editBlocked$ = this._focusHandler.getEditBlocked();
    }

    ngOnInit(): void {
        this.logicalOperators = this._lebService.getLogicalOperators();
        this.selectedLogicalOperator = this._lebService.getLogicalOperatorByName(this._subExpression.logicalOperator);
        this._validate();
    }

    ngOnDestroy(): void {
        this._validationService.removeValidationState(this.path);
    }

    public handleSelectedOperatorChange(index: number) {
        this.selectedLogicalOperator = this.logicalOperators[index];

        this._subExpression = { ...this._subExpression, logicalOperator: this.selectedLogicalOperator.name };

        this._validate();
        this.subExpressionChange.emit(this._subExpression);
    }

    public handleSubExpressionChange(subExpression: ExpressionGroup | ExpressionCondition, index: number) {
        if (subExpression) {
            let newChildren = [...this._subExpression.children];
            newChildren[index] = subExpression;
            this._subExpression = { ...this._subExpression, children: newChildren };
        } else {
            let newChildren = [...this._subExpression.children];
            newChildren.splice(index, 1);
            this._subExpression = { ...this._subExpression, children: newChildren };
        }

        this._validate();
        this.subExpressionChange.emit(this._subExpression);
    }

    public addCondition(): void {
        const children: Expression[] = [...this._subExpression.children, {
            type: 'condition',
            field: null,
            operator: null,
            value: null,
        }];

        this._subExpression = { ...this._subExpression, children };

        this._validate();
        this.subExpressionChange.emit(this._subExpression);
        this._focusHandler.setRowInEditMode([...this.path, this._subExpression.children.length - 1]);
        this._focusHandler.setPathToActivate([...this.path, this._subExpression.children.length - 1]);
    }

    public addGroup(): void {
        const children: Expression[] = [...this._subExpression.children, {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [
                { type: 'condition', field: null, operator: null, value: null },
            ],
        }];

        this._subExpression = { ...this._subExpression, children };

        this._validate();
        this.subExpressionChange.emit(this._subExpression);
        this._focusHandler.setRowInEditMode([...this.path, this._subExpression.children.length - 1, 0]);
        this._focusHandler.setEditBlocked(true);
    }

    public removeConditionAtIndex(id: number): void {
        const children = this._subExpression.children.filter((_, index) => {
            return index !== id;
        });

        this._subExpression = { ...this._subExpression, children };

        this._validate();
        this.subExpressionChange.emit(this._subExpression);

        this._focusHandler.setRowInEditMode(null);

        if (id === 0) {
            if (this._subExpression.children.length) {
                this._focusHandler.setPathToActivate([...this.path, 0]);
            } else {
                this._focusHandler.setPathToActivate(this.path);
            }
        } else {
            this._focusHandler.setPathToActivate([...this.path, id - 1]);
        }
    }

    public embedConditionAtIndex(id: number): void {
        let tempExpression = { ...this._subExpression };
        const condition = { ...tempExpression.children[id] };

        tempExpression.children[id] = {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [condition],
        } as ExpressionGroup;

        this._subExpression = tempExpression;

        this._validate();
        this.subExpressionChange.emit(this._subExpression);

        this._focusHandler.setPathToActivate([...this.path, id]);
    }

    public deleteGroup(): void {
        const position = this.path[this.path.length - 1];

        this.subExpressionChange.emit(null);
        this._validationService.removeValidationState(this.path);
        this._focusHandler.setRowInEditMode(null);

        // set the row above active
        this._focusHandler.setPathToActivate(position === 0 ? this.path.slice(0, -1) : [...this.path.slice(0, -1), position - 1]);
    }

    private _validate(logicalOperator: LogicalOperatorDefinition = this.selectedLogicalOperator): boolean {
        if ('minNumberOfChildren' in logicalOperator && 'maxNumberOfChildren' in logicalOperator) {
            const numberOfChildren = this._subExpression.children?.length;
            const tooFew = !(numberOfChildren >= logicalOperator.minNumberOfChildren);
            const tooMany = !(numberOfChildren <= logicalOperator.maxNumberOfChildren);

            this._valid = !tooFew && !tooMany;

            if (tooFew || tooMany) {
                this._errorMessage = logicalOperator.errorMessage || 'Wrong number of children';
            }

            this._showAddBtn = this._subExpression.children?.length < logicalOperator.maxNumberOfChildren;
        } else if ('minNumberOfChildren' in logicalOperator) {
            this._valid = this._subExpression.children?.length >= logicalOperator.minNumberOfChildren;
            this._errorMessage = this._valid ? null : logicalOperator.errorMessage || 'Wrong number of children';
            this._showAddBtn = true;
        } else if ('maxNumberOfChildren' in logicalOperator) {
            this._valid = this._subExpression.children?.length <= logicalOperator.maxNumberOfChildren;
            this._errorMessage = this._valid ? null : logicalOperator.errorMessage || 'Wrong number of children';
            this._showAddBtn = this._subExpression.children?.length < logicalOperator.maxNumberOfChildren;
        }

        this._validationService.setValidationState(this.path, this._valid);
        return this._valid;
    }
}
