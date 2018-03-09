export default function dragHandle() {
	return {
		restrict: "A",
		link: function (scope, element) {
		element.addClass('draggable-panel-handle');
		}
	};
}