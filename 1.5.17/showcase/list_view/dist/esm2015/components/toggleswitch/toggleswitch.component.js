/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
const /** @type {?} */ TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};
let /** @type {?} */ uniqueToggleSwitchId = 0;
export class ToggleSwitchComponent {
    constructor() {
        this._toggleSwitchId = `ux-toggleswitch-${++uniqueToggleSwitchId}`;
        this.id = this._toggleSwitchId;
        this.tabindex = 0;
        this.clickable = true;
        this.disabled = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.focused = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        // Update value output
        this.valueChange.emit(value);
        // Notify ngModel
        this.onChangeCallback(value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get inputId() {
        return `${this.id || this._toggleSwitchId}-input`;
    }
    /**
     * @return {?}
     */
    toggle() {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = !!value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
ToggleSwitchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-toggleswitch',
                template: `<label [attr.for]="inputId"
       class="ux-toggleswitch"
       [class.ux-toggleswitch-checked]="value"
       [class.ux-toggleswitch-disabled]="disabled"
       [class.ux-toggleswitch-focused]="focused">

    <input class="ux-toggleswitch-input"
           type="checkbox"
           role="switch"
           [id]="inputId"
           [checked]="value"
           [disabled]="disabled"
           [attr.name]="name"
           [tabindex]="tabindex"
           [attr.aria-label]="ariaLabel"
           [attr.aria-labelledby]="ariaLabelledby"
           [attr.aria-checked]="value"
           (focus)="focused = true"
           (blur)="focused = false"
           (change)="toggle()"
           (click)="$event.stopPropagation()">

    <div class="ux-toggleswitch-container">
        <div class="ux-toggleswitch-bg"></div>
        <div class="ux-toggleswitch-nub"></div>
    </div>

    <span class="ux-toggleswitch-label">
        <ng-content></ng-content>
    </span>
</label>`,
                providers: [TOGGLESWITCH_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
ToggleSwitchComponent.ctorParameters = () => [];
ToggleSwitchComponent.propDecorators = {
    "id": [{ type: Input },],
    "name": [{ type: Input },],
    "tabindex": [{ type: Input },],
    "clickable": [{ type: Input },],
    "disabled": [{ type: Input },],
    "ariaLabel": [{ type: Input, args: ['aria-label',] },],
    "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
    "valueChange": [{ type: Output },],
    "value": [{ type: Input },],
};
function ToggleSwitchComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ToggleSwitchComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ToggleSwitchComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ToggleSwitchComponent.propDecorators;
    /** @type {?} */
    ToggleSwitchComponent.prototype._toggleSwitchId;
    /** @type {?} */
    ToggleSwitchComponent.prototype.id;
    /** @type {?} */
    ToggleSwitchComponent.prototype.name;
    /** @type {?} */
    ToggleSwitchComponent.prototype.tabindex;
    /** @type {?} */
    ToggleSwitchComponent.prototype.clickable;
    /** @type {?} */
    ToggleSwitchComponent.prototype.disabled;
    /** @type {?} */
    ToggleSwitchComponent.prototype.ariaLabel;
    /** @type {?} */
    ToggleSwitchComponent.prototype.ariaLabelledby;
    /** @type {?} */
    ToggleSwitchComponent.prototype.valueChange;
    /** @type {?} */
    ToggleSwitchComponent.prototype._value;
    /** @type {?} */
    ToggleSwitchComponent.prototype.focused;
    /** @type {?} */
    ToggleSwitchComponent.prototype.onTouchedCallback;
    /** @type {?} */
    ToggleSwitchComponent.prototype.onChangeCallback;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlc3dpdGNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RvZ2dsZXN3aXRjaC90b2dnbGVzd2l0Y2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFekUsdUJBQU0sMkJBQTJCLEdBQUc7SUFDaEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0scUJBQXFCLENBQUM7SUFDcEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBRUYscUJBQUksb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBcUM3QixNQUFNOzsrQkFFZ0MsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUU7a0JBRXZELElBQUksQ0FBQyxlQUFlO3dCQUVkLENBQUM7eUJBQ0MsSUFBSTt3QkFDTCxLQUFLO3lCQUNPLEVBQUU7OEJBQ1EsSUFBSTsyQkFFUixJQUFJLFlBQVksRUFBVztzQkFzQmhELEtBQUs7dUJBRVosS0FBSztpQ0FDUSxTQUFTO2dDQUNKLFNBQVM7Ozs7O1FBdkIxQyxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7Ozs7OztJQUd2QixJQUFJLEtBQUssQ0FBQyxLQUFjO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztRQUdwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7UUFHN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBQzVCOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsZUFBZSxRQUFRLENBQUM7S0FDckQ7Ozs7SUFRRCxNQUFNO1FBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzVCO0tBQ0o7Ozs7O0lBRUQsVUFBVSxDQUFDLEtBQWM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO0tBQ3hCOzs7OztJQUVELGdCQUFnQixDQUFDLEVBQU87UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFPO1FBQ3JCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7S0FDL0I7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsVUFBbUI7UUFDaEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7S0FDOUI7OztZQS9GSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E4Qkw7Z0JBQ0wsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7YUFDM0M7Ozs7O21CQUtJLEtBQUs7cUJBQ0wsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLLFNBQUMsWUFBWTsrQkFDbEIsS0FBSyxTQUFDLGlCQUFpQjs0QkFFdkIsTUFBTTtzQkFFTixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuY29uc3QgVE9HR0xFU1dJVENIX1ZBTFVFX0FDQ0VTU09SID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRvZ2dsZVN3aXRjaENvbXBvbmVudCksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbmxldCB1bmlxdWVUb2dnbGVTd2l0Y2hJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtdG9nZ2xlc3dpdGNoJyxcbiAgICB0ZW1wbGF0ZTogYDxsYWJlbCBbYXR0ci5mb3JdPVwiaW5wdXRJZFwiXG4gICAgICAgY2xhc3M9XCJ1eC10b2dnbGVzd2l0Y2hcIlxuICAgICAgIFtjbGFzcy51eC10b2dnbGVzd2l0Y2gtY2hlY2tlZF09XCJ2YWx1ZVwiXG4gICAgICAgW2NsYXNzLnV4LXRvZ2dsZXN3aXRjaC1kaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgW2NsYXNzLnV4LXRvZ2dsZXN3aXRjaC1mb2N1c2VkXT1cImZvY3VzZWRcIj5cblxuICAgIDxpbnB1dCBjbGFzcz1cInV4LXRvZ2dsZXN3aXRjaC1pbnB1dFwiXG4gICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgIHJvbGU9XCJzd2l0Y2hcIlxuICAgICAgICAgICBbaWRdPVwiaW5wdXRJZFwiXG4gICAgICAgICAgIFtjaGVja2VkXT1cInZhbHVlXCJcbiAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgW3RhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiYXJpYUxhYmVsbGVkYnlcIlxuICAgICAgICAgICBbYXR0ci5hcmlhLWNoZWNrZWRdPVwidmFsdWVcIlxuICAgICAgICAgICAoZm9jdXMpPVwiZm9jdXNlZCA9IHRydWVcIlxuICAgICAgICAgICAoYmx1cik9XCJmb2N1c2VkID0gZmFsc2VcIlxuICAgICAgICAgICAoY2hhbmdlKT1cInRvZ2dsZSgpXCJcbiAgICAgICAgICAgKGNsaWNrKT1cIiRldmVudC5zdG9wUHJvcGFnYXRpb24oKVwiPlxuXG4gICAgPGRpdiBjbGFzcz1cInV4LXRvZ2dsZXN3aXRjaC1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInV4LXRvZ2dsZXN3aXRjaC1iZ1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidXgtdG9nZ2xlc3dpdGNoLW51YlwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPHNwYW4gY2xhc3M9XCJ1eC10b2dnbGVzd2l0Y2gtbGFiZWxcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvc3Bhbj5cbjwvbGFiZWw+YCxcbiAgICBwcm92aWRlcnM6IFtUT0dHTEVTV0lUQ0hfVkFMVUVfQUNDRVNTT1JdXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZVN3aXRjaENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgIHByaXZhdGUgX3RvZ2dsZVN3aXRjaElkOiBzdHJpbmcgPSBgdXgtdG9nZ2xlc3dpdGNoLSR7Kyt1bmlxdWVUb2dnbGVTd2l0Y2hJZH1gO1xuXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IHRoaXMuX3RvZ2dsZVN3aXRjaElkO1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IG51bGw7XG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gICAgQElucHV0KCkgY2xpY2thYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nID0gJyc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsbGVkYnknKSBhcmlhTGFiZWxsZWRieTogc3RyaW5nID0gbnVsbDtcblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG5cbiAgICBzZXQgdmFsdWUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICAvLyBVcGRhdGUgdmFsdWUgb3V0cHV0XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh2YWx1ZSk7XG5cbiAgICAgICAgLy8gTm90aWZ5IG5nTW9kZWxcbiAgICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dElkKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLmlkIHx8IHRoaXMuX3RvZ2dsZVN3aXRjaElkfS1pbnB1dGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcbiAgICBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQgJiYgdGhpcy5jbGlja2FibGUpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSAhdGhpcy52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9ICEhdmFsdWU7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICAgIH1cblxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICB9XG59XG4iXX0=