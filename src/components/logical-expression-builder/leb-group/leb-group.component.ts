import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { LogicalExpression, ExpressionCondition, ExpressionGroup } from '../interfaces/LogicalExpression';
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
    _children: ReadonlyArray<LogicalExpression>;

    readonly additionalIndent: number = 40;
    logicalOperators: LogicalOperatorDefinition[];
    _logicalOperatorOptions: ReadonlyArray<LogicalOperatorDefinition> = null;
    selectedLogicalOperator: LogicalOperatorDefinition;

    _focused: boolean = false;
    _valid: boolean = true;
    _errorMessage: string;
    _showAddBtn: boolean = false;
    _editBlocked$: Observable<boolean>;

    constructor(
        private lebService: LogicalExpressionBuilderService,
        private validationService: ValidationService,
        private focusHandlerService: FocusHandlerService) {
        this._editBlocked$ = this.focusHandlerService.getEditBlocked();
    }

    ngOnInit(): void {
        this.logicalOperators = this.lebService.getLogicalOperators();
        this.selectedLogicalOperator = this.lebService.getLogicalOperatorByName(this._subExpression.logicalOperator);
        this.validate();
    }

    ngOnDestroy(): void {
        this.validationService.removeValidationState(this.path);
    }

    handleSelectedOperatorChange(index: number) {
        this.selectedLogicalOperator = this.logicalOperators[index];

        this._subExpression = { ...this._subExpression, logicalOperator: this.selectedLogicalOperator.name };

        this.validate();
        this.subExpressionChange.emit(this._subExpression);
    }

    handleSubExpressionChange(subExpression: ExpressionGroup | ExpressionCondition, index: number) {
        if (subExpression) {
            let newChildren = [...this._subExpression.children];
            newChildren[index] = subExpression;
            this._subExpression = { ...this._subExpression, children: newChildren };
        } else {
            let newChildren = [...this._subExpression.children];
            newChildren.splice(index, 1);
            this._subExpression = { ...this._subExpression, children: newChildren };
        }

        this.validate();
        this.subExpressionChange.emit(this._subExpression);
    }

    addCondition(): void {
        const children: LogicalExpression[] = [...this._subExpression.children, {
            type: 'condition',
            field: null,
            operator: null,
            value: null,
        }];

        this._subExpression = { ...this._subExpression, children };

        this.validate();
        this.subExpressionChange.emit(this._subExpression);
        this.focusHandlerService.setRowInEditMode([...this.path, this._subExpression.children.length - 1]);
        this.focusHandlerService.setPathToActivate([...this.path, this._subExpression.children.length - 1]);
    }

    addGroup(): void {
        const children: LogicalExpression[] = [...this._subExpression.children, {
            type: 'group',
            logicalOperator: this.lebService.getLogicalOperators()[0].name,
            children: [
                { type: 'condition', field: null, operator: null, value: null },
            ],
        }];

        this._subExpression = { ...this._subExpression, children };

        this.validate();
        this.subExpressionChange.emit(this._subExpression);
        this.focusHandlerService.setRowInEditMode([...this.path, this._subExpression.children.length - 1, 0]);
        this.focusHandlerService.setEditBlocked(true);
    }

    removeConditionAtIndex(id: number): void {
        const children = this._subExpression.children.filter((_, index) => {
            return index !== id;
        });

        this._subExpression = { ...this._subExpression, children };

        this.validate();
        this.subExpressionChange.emit(this._subExpression);

        this.focusHandlerService.setRowInEditMode(null);

        if (id === 0) {
            if (this._subExpression.children.length) {
                this.focusHandlerService.setPathToActivate([...this.path, 0]);
            } else {
                this.focusHandlerService.setPathToActivate(this.path);
            }
        } else {
            this.focusHandlerService.setPathToActivate([...this.path, id - 1]);
        }
    }

    embedConditionAtIndex(id: number): void {
        let tempExpression = { ...this._subExpression };
        const condition = { ...tempExpression.children[id] };

        tempExpression.children[id] = {
            type: 'group',
            logicalOperator: this.lebService.getLogicalOperators()[0].name,
            children: [condition],
        } as ExpressionGroup;

        this._subExpression = tempExpression;

        this.validate();
        this.subExpressionChange.emit(this._subExpression);

        this.focusHandlerService.setPathToActivate([...this.path, id]);
    }

    deleteGroup(): void {
        const position = this.path[this.path.length - 1];

        this.subExpressionChange.emit(null);
        this.validationService.removeValidationState(this.path);
        this.focusHandlerService.setRowInEditMode(null);

        // set the row above active
        this.focusHandlerService.setPathToActivate(position === 0 ? this.path.slice(0, -1) : [...this.path.slice(0, -1), position - 1]);
    }

    private validate(logicalOperator: LogicalOperatorDefinition = this.selectedLogicalOperator): boolean {
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

        this.validationService.setValidationState(this.path, this._valid);
        return this._valid;
    }
}
