TagInputCtrl.$inject = ["$scope", "$q"];

export default function TagInputCtrl($scope, $q) {

    var ti = this;

    ti.$q = $q;

    //Tags
    ti.tags = $scope.tags || [];
    //Massage format of tags
    if (ti.tags.length) {
        if ((typeof ti.tags[0]).toLowerCase() === "string") {
            var tagCopy = [];
            for (var i in ti.tags) {
                tagCopy.push({
                    text: ti.tags[i]
                });
            }
            ti.tags = tagCopy;
        }
    }

    ti.fullTagSet = $scope.fullTagSet || [];

    //Options
    $scope.options = $scope.options || {};
    ti.placeholder = $scope.options.placeholder || "";
    ti.initialPlaceholder = $scope.options.initialPlaceholder || false;
    ti.minTagLength = $scope.options.minTagLength || 1;
    ti.maxTagLength = $scope.options.maxTagLength || Number.MAX_SAFE_INTEGER;
    ti.minNumberTags = $scope.options.minNumberTags || 0;
    ti.maxNumberTags = $scope.options.maxNumberTags || Number.MAX_SAFE_INTEGER;
    ti.addOnSpace = $scope.options.addOnSpace || false;
    ti.addOnComma = $scope.options.addOnComma || false;
    ti.addOnBlur = $scope.options.addOnBlur === false ? false : true;
    ti.addOnPaste = $scope.options.addOnPaste === false ? false : true;
    ti.pasteSplitPattern = $scope.options.pasteSplitPattern || ",";
    ti.enableEditingLastTag = $scope.options.enableEditingLastTag || false;
    ti.tabIndex = $scope.options.tabIndex || undefined;
    ti.template = $scope.options.template || undefined;
    ti.maxTagsMessage = $scope.options.maxTagsMessage || undefined;
    ti.maxTagsHidden = $scope.options.maxTagsHidden || false;

    //Options - Format
    $scope.options.format = $scope.options.format || {};
    ti.keyProperty = $scope.options.format.key || 'text';
    ti.displayProperty = $scope.options.format.display || 'text';

    //Options - Autocomplete
    ti.autocomplete = $scope.options.autocomplete || false;
    $scope.options.autocomplete = $scope.options.autocomplete || {};
    ti.addFromAutocompleteOnly = $scope.options.autocomplete.addFromAutocompleteOnly || false;
    ti.autocompleteDelay = $scope.options.autocomplete.delay || 100;
    ti.autocompleteMinLength = $scope.options.autocomplete.minLength || 3;
    ti.selectFirstMatch = ti.addFromAutocompleteOnly;
    ti.autocompleteTemplate = $scope.options.autocomplete.template || undefined;
    ti.source = $scope.options.autocomplete.source || false;

    //API
    $scope.api = $scope.api || {};
    ti.tagClass = $scope.options.tagClass || undefined;
    ti.onTagAdding = $scope.api.onTagAdding || undefined;
    ti.onTagAdded = $scope.api.onTagAdded || undefined;
    ti.onInvalidTag = $scope.api.onInvalidTag || undefined;
    ti.onTagRemoving = $scope.api.onTagRemoving || undefined;
    ti.onTagRemoved = $scope.api.onTagRemoved || undefined;
    ti.onTagClicked = $scope.api.onTagClicked || undefined;

    //for setting the message
    ti.selectedInput = undefined;
    ti.showMessage = false;


    ti.updateMessage = function(text) {
        // if max tags reached and text isnt empty
        if (ti.tags.length === ti.maxNumberTags && ti.maxTagsMessage !== undefined) {
            // show the message if the text is not empty
            ti.showMessage = (text !== "");

            // update the ui
            $scope.$digest();
        }
    };

    $scope.$watch(function() {
        return ti.tags.length;
    }, function() {
        if (ti.tags.length < ti.maxNumberTags && ti.maxTagsMessage !== undefined)
            ti.showMessage = false;

        $scope.tags = ti.tags;
    });

    $scope.$watch("tags.length", function(nv, ov) {
        if (nv !== ov && nv !== ti.tags.length) {
            ti.tags = $scope.tags;
        }
    });

}

TagInputCtrl.prototype.loadTags = function($query) {
    var ti = this;
    ti.$query = $query || "";
    ti.$query = $query.toLowerCase();
    return ti.$q(function(resolve, reject) {
        if (ti.fullTagSet) {
            resolve(ti.fullTagSet.filter(function(element) {
                if (angular.isString(element)) {
                    return ~element.toLowerCase().indexOf(ti.$query);
                }
                if (element.hasOwnProperty(ti.displayProperty)) {
                    return element[ti.displayProperty].toLowerCase().indexOf(ti.$query) !== -1;
                }
                return false;
            }));
        } else {
            reject([]);
        }
    });
};