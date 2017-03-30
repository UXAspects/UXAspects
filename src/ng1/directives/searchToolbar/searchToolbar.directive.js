searchToolbar.$inject = ['safeTimeout'];

export default function searchToolbar(safeTimeout) {
    return {
        restrict: "E",
        template: require("./searchToolbar.html"),
        controller: "searchToolbarCtrl as st",
        scope: {
            searchTypeahead: '=',
            placeHolder: '@',
            closeSearch: '@',
            onSearch: "=",
            onFocus: "=?"
        },

        link: function(scope, element) {
            var controller = scope.st;
            var searchIcon = element.find('.search-toolbar-icon');
            var searchContainer = element.find('.search-container');
            var input = element.find('input');
            var cancelButton = element.find('.cancel-search');
            var clearButton = element.find('.expand-input-clear');
            var onFocus = scope.onFocus || false;
            var clearIcon = element.find('.hpe-close');

            var safeTimeoutInstance = safeTimeout.create(scope);

            //expose cancel search to controller
            scope.cancelSearch = cancelSearch;

            //initially hide the search container - only show icon
            searchContainer.hide();

            //initially hide the clear icon
            clearIcon.hide();

            //when the icon is clicked show the search container and hide the icon
            searchIcon.click(showSearch);

            //when the cancel button is clicked close the search bar
            cancelButton.click(cancelSearch);

            //when the input changes update the clear button visibility
            input.on('input', function() {
                showClear();
            });


            //when the clear button is clicked clear the text
            clearButton.bind('mousedown', function(e) {
                e.preventDefault();
                input.val('');
                scope.st.inputValue = '';
                showClear();
            });

            input.blur(function() {
                safeTimeoutInstance.timeout(function() {
                    cancelSearch();
                }, 100);
            });


            input.focus(function() {
                if (onFocus)
                    onFocus();
            });

            input.keydown(function(event) {
                //if escape is pressed cancel search
                if (event.keyCode === 27) cancelSearch();
                //if return key is pressed perform search
                else if (event.keyCode === 13) {
                    controller.search();
                }
            });

            function showSearch() {
                searchContainer.show();
                searchIcon.hide();
                input.focus();
            }

            function cancelSearch() {
                searchContainer.hide();
                searchIcon.show();
            }

            function showClear() {
                if (input.val() !== "") {
                    clearIcon.show();
                } else
                    clearIcon.hide();
            }
        }
    };
}