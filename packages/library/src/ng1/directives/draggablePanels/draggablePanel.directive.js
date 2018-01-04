export default function draggablePanel() {
	return {
	  	restrict: "E",
	  	template: '<div class="draggable-panel" ng-transclude></div>',
	  	transclude: true,
	  	replace: true
	};
}
