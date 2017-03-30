describe('expand input directive', function() {
    var $compile, $rootScope, element, $scope;

    beforeEach(module('ux-aspects.expandInput'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = _$rootScope_.$new();
    }));

    describe('on-enter attribute tests', function() {

        var currentText, input;
        var enterKeypressEvent = jQuery.Event("keypress", {
            which: 13,
            keyCode: 13
        });

        beforeEach(function() {
            $scope.onEnterTest = function(text) {
                currentText = text;
            };

            spyOn($scope, 'onEnterTest').and.callThrough();

            var html = '<expand-input place-holder="Filter..." class-name="input-sm form-control filter-text" elname="input-expand-search" clear-text-icon="hpe-close" close-search="Cancel" on-enter="onEnterTest">';
            html += '</expand-input>';

            element = $compile(html)($scope);
            $scope.$digest();
            input = element.find('input');
        });


        it('should call the onEnterTest function when the enter key is pressed', function() {
            //function shouldnt have been called yet
            expect($scope.onEnterTest).not.toHaveBeenCalled();

            //trigger an enter key press on the input element
            input.trigger(enterKeypressEvent);

            //function should be called after event trigger
            expect($scope.onEnterTest).toHaveBeenCalled();

            //function should have been called twice
            input.trigger(enterKeypressEvent);
            expect($scope.onEnterTest.calls.count()).toBe(2);
        });

        it('should pass in the current text in the input element as a parameter', function() {
            //trigger typing on the input element with the text being 'hello'
            input.val('hello').trigger('input');
            $scope.$digest();
            input.trigger(enterKeypressEvent);
            expect($scope.onEnterTest).toHaveBeenCalledWith('hello');
        });

        it('should not call the onEnterTest function if any key but enter is pressed', function() {
            var spaceKeypressEvent = jQuery.Event("keypress", {
                which: 32,
                keyCode: 32
            });
            input.trigger(spaceKeypressEvent);
            expect($scope.onEnterTest).not.toHaveBeenCalled();

            var backspaceKeypressEvent = jQuery.Event("keypress", {
                which: 8,
                keyCode: 8
            });
            input.trigger(backspaceKeypressEvent);
            expect($scope.onEnterTest).not.toHaveBeenCalled();
        });

    });

});
