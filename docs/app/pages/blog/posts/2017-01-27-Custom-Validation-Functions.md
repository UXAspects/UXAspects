Forms and Inputs come with a lot of built-in validation for types such as `number`, `email` etc. Angular also provides directives for validation such as `ng-required`, `ng-minlength`, `ng-maxlength`, etc. These can be very useful when validating user input, for example, if you specify that an input is of type `email` the input field will be invalid until a valid email address has been entered.

```html
<input type="email" ng-model="vm.emailAddress" name="emailInput" placeholder="Enter your email address"/>
```

While this is very useful and allows you to perform a lot of validation there are constraints if you wish to apply complex validation, for example, if you want to validate that an id exists within a set of value. This is when it becomes useful to implement your own validation functions to the `$validators` object on the `ngModelController`. 

#### $validators object

To access the `$validators` object of an input you must first ensure that your `input` tag is placed within a `form` tag and that both the input and form have been named accordingly. You must then inject `$scope` to your controller and you will then be able to access the `$validators` property by watching your `form` on the `$scope` and attaching the new validator when it is ready.
You know when it is ready by checking the `newValue` of the watch and if it exists then we check if our custom validator function already exists and if not we can add our own new function.

You can see this in the example below. We access the `$validators` property by `formName.inputName.$validators` and then attach our own new validation function to this. This function will be called with `modelValue` and `viewValue` as parameters every time the `ngModel` of the input changes.

If the input is valid the function should return `true`, otherwise it should return `false`.

```javascript
$scope.$watch('vm.myForm', function(form) {
    if (form && !form.myInput.$validators.myCustomValidator) { 
        form.testInput.$validators.myCustomValidator = function(modelValue, viewValue) {
            if (validValues.indexOf(viewValue) === -1) return false;
            
            return true;
        };
    }
});
```

#### Adding styling depending on validity 

When the input is invalid it will have an `.ng-invalid` class as well as an `.ng-invalid-my-custom-validator` class (depending on what your named your validator on the `$validators` object). You can then apply styling accordingly.

```css
input.ng-invalid-my-custom-validator {
    border: 1px solid red;
}
```

You can also check `$error` property on the input `ngModel` for your custom validation and if is invalid it will be `true`, otherwise it will be `false`.

```html
<p ng-show="vm.myForm.myInput.$error.myCustomValidator">THERE IS AN ERROR</p>
```

> It is best practice to name the Form on your controller scope (i.e. `vm`) as doing otherwise my result in the form being attached to the scope of a different directive.

For full documentation visit the [Forms](https://docs.angularjs.org/guide/forms) and [ngModelController](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController) pages.



