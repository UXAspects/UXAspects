angular.module('app').controller('FormsCtrl', ["$timeout", FormsCtrl]);

function FormsCtrl($timeout) {
    var fc = this;

    $timeout(function() {
        angular.element('#form-submit').validate(function(evt) {
            evt.preventDefault();
        });
    });      
}