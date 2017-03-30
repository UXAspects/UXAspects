staticTooltipToggle.$inject = ['$staticTooltip'];

export default function staticTooltipToggle($staticTooltip) {
    return {
        restrict: "A",
        link: function(scope, element) {

        	var toggleStaticTooltips = function() {
        		$staticTooltip.toggle();
        	};

        	element[0].addEventListener('click', toggleStaticTooltips);

        }
    };
}