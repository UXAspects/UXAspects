StaticTooltipCtrl.$inject = ['$scope', '$element', '$parse', 'safeAnimationFrame', '$staticTooltip', '$attrs', '$rootScope'];

export default function StaticTooltipCtrl($scope, $element, $parse, safeAnimationFrame, $staticTooltip, $attrs, $rootScope) {

    var vm = this;

    vm.element = $element;

    $staticTooltip.registerTooltip(vm);

    vm.options =  {
        content: $attrs.content ? $parse($attrs.content)($scope) : '',
        dismissText: $attrs.dismissText ? $parse($attrs.dismissText)($scope) : 'HIDE TIPS',
        position: $attrs.position ? $parse($attrs.position)($scope) : 'middle',
        direction: $attrs.direction ? $parse($attrs.direction)($scope) : 'up',
        offset: {
            x: $attrs.offsetX ? +$parse($attrs.offsetX)($scope) : 0,
            y: $attrs.offsetY ? +$parse($attrs.offsetY)($scope) : 0
        },
        zIndex: $attrs.zIndex ? +$parse($attrs.zIndex)($scope) : null,
        tooltipClass: $attrs.tooltipClass ? $parse($attrs.tooltipClass)($scope) : null,
        tooltipHidden: $attrs.tooltipHidden ? $parse($attrs.tooltipHidden)($scope) : false
    };

    vm.tooltip = null;
    vm.elementX = 0;
    vm.elementY = 0;
    vm.elementWidth = 0;
    vm.elementHeight = 0;
    vm.tooltipId = $attrs.tooltipId ? $parse($attrs.tooltipId)($scope) : false;
    vm.visible = true;
    vm.calloutSize = (Math.sqrt(Math.pow(9, 2) + Math.pow(9, 2)) / 2);

    //instantiate the safeAnimationFrame service with current scope
    var animationInstance = safeAnimationFrame.create($scope);

    //on animation frame do update position
    animationInstance.animationFrame(()=> { updatePosition(); });

    function createTooltip() {

        vm.tooltip = document.createElement('div');
        vm.tooltip.className = 'static-tooltip ' + vm.options.direction + ' ' + vm.options.position;
        if(vm.options.tooltipClass) {
            vm.tooltip.className += ' ' + vm.options.tooltipClass;
        }

        //create callout element
        var callout = document.createElement('div');
        callout.className = 'callout';

        //create content area
        var content = document.createElement('p');
        content.className = 'content';
        content.innerHTML = vm.options.content;

        //create footer area
        var footer = document.createElement('div');
        footer.className = 'footer';

        var hideTooltips = document.createElement('a'); 
        hideTooltips.className = 'hide-tips';
        hideTooltips.innerText = vm.options.dismissText;
        hideTooltips.addEventListener('click', vm.dismissTooltips);

        //set z-index if specified
        if(vm.options.zIndex) vm.tooltip.style.zIndex = vm.options.zIndex;


        //add child elements
        footer.appendChild(hideTooltips);
        vm.tooltip.appendChild(content);
        vm.tooltip.appendChild(footer);
        vm.tooltip.appendChild(callout);

        document.body.appendChild(vm.tooltip);

    }

    function positionTooltip() {
        var elementBounds = vm.element.get(0).getBoundingClientRect();
        vm.elementX = elementBounds.left;
        vm.elementY = elementBounds.top;
        vm.elementWidth = elementBounds.width;
        vm.elementHeight = elementBounds.height;
        var elementCenterX = vm.elementX + (vm.elementWidth / 2);
        var elementCenterY = vm.elementY + (vm.elementHeight / 2);

        //begin to calculate the tooltip position
        var tooltipX, tooltipY;
        var tooltipWidth = vm.tooltip.offsetWidth;
        var tooltipHeight = vm.tooltip.offsetHeight;

        //set the correct direction
        switch (vm.options.direction.toLowerCase()) {
            case 'up':
                tooltipY = vm.elementY + (vm.elementHeight + vm.calloutSize);
                break;

            case 'down':
                tooltipY = vm.elementY - (tooltipHeight + vm.calloutSize);
                break;

            case 'left':
                tooltipX = vm.elementX + vm.elementWidth + vm.calloutSize;
                break;

            case 'right':
                tooltipX = vm.elementX - (tooltipWidth + vm.calloutSize);
                break;

            default:
                throw 'Static Tooltip - Invalid direction';
        }

        //now take into account the position specified
        if (vm.options.direction.toLowerCase() === 'up' || vm.options.direction.toLowerCase() === 'down') {
            switch (vm.options.position.toLowerCase()) {
                case 'start':
                    tooltipX = elementCenterX - (10 + vm.calloutSize);
                    break;

                case 'middle':
                    tooltipX = (vm.elementX - (tooltipWidth / 2)) + (vm.elementWidth / 2);
                    break;

                case 'end':
                    tooltipX = ((vm.elementX + (vm.elementWidth / 2)) - tooltipWidth) + (10 + vm.calloutSize);
                    break;
            }
        } else {
            switch (vm.options.position.toLowerCase()) {
                case 'start':
                    tooltipY = elementCenterY - (14 + vm.calloutSize);
                    break;

                case 'middle':
                    tooltipY = (vm.elementY - (tooltipHeight / 2)) + (vm.elementHeight / 2);
                    break;

                case 'end':
                    tooltipY = ((vm.elementY + (vm.elementHeight / 2)) - tooltipHeight) + (13 + vm.calloutSize);
                    break;
            }
        }

        //take offset in to account
        tooltipX += vm.options.offset.x;
        tooltipY += vm.options.offset.y;

        vm.tooltip.style.left = tooltipX + 'px';
        vm.tooltip.style.top = tooltipY + 'px';
    }

    function updatePosition() {
        
        if (!vm.shown) return; 

        if (vm.visible && !vm.element.is(":visible")) {
            vm.visible = false;
            vm.tooltip.style.display = 'none';
        } else if (!vm.visible && vm.element.is(":visible")) {
            vm.visible = true;
            vm.tooltip.style.display = '';
        }

        var elementBounds = vm.element.get(0).getBoundingClientRect();
        if (elementBounds.left !== vm.elementX ||
            elementBounds.top !== vm.elementY ||
            elementBounds.width !== vm.elementWidth ||
            elementBounds.height !== vm.elementHeight)
                positionTooltip();

    }

    vm.shown = false;

    vm.dismissTooltips = function() {
        vm.shown = false;
        $scope.$apply(function() {
            $staticTooltip.hideAllTooltips(vm);
        });
    };

    vm.destroyTooltip = function() {
        vm.shown = false;
        angular.element(vm.tooltip).remove();
        $staticTooltip.tooltipDestroyed(vm);
    };

    vm.showTooltip = function() {
        vm.shown = true;
        createTooltip();
        positionTooltip();
        $staticTooltip.tooltipShown(vm);
    };

    if(!vm.options.tooltipHidden){
        vm.showTooltip();
    }

    //ensure we cleanup
    vm.element.on("remove", vm.destroyTooltip);

    $rootScope.$on('$stateChangeStart', 
    function(){ 
        $staticTooltip.destroyAllTooltips();
    });
}





    


