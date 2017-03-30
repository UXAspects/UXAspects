$displayPanel.$inject = ["$compile", "$timeout", "$document"];

export default function $displayPanel($compile, $timeout, $document) {
  var $displayPanel = {};
  var isOpen = false;
  var isHidden = false;
  var current;
  var element;
  var scope;
  var content;

  $displayPanel.open = function(elem, itemDisplayPanelOptions, shadow, previous, next){
    if(!isOpen){
      //create item display panel if one dosnt exist
      var displayPanel = '<div display-panel class="displayPanel"></div>';
      scope = itemDisplayPanelOptions.scope.$new();
      scope.modalOpt = itemDisplayPanelOptions;
      scope.shadow = shadow;
      scope.previousBtnStatus = previous;
      scope.nextBtnStatus = next;
      element = $compile(displayPanel)(scope);
      $document.find("body").append(element);
      isOpen = true;
    } else if (isHidden){
      //add scope
      scope = itemDisplayPanelOptions.scope.$new();
      scope.modalOpt = itemDisplayPanelOptions;
      scope.shadow = shadow;
      scope.previousBtnStatus = previous;
      scope.nextBtnStatus = next;
      element = $compile(element)(scope);

      //show display panel again if its hidden (only applies to animate)
      scope.modalOpt = itemDisplayPanelOptions;
      content.style.transform = "translate(110%)";
      content.classList.add("display-panel-animate");
      $timeout(function() {
        content.style.transform = "translate(0)";
      }); 
      isHidden = false;
    }
    else if (elem !== current) {
      //update if display panel exists
      scope.modalOpt = itemDisplayPanelOptions;
      scope.previousBtnStatus = previous;
      scope.nextBtnStatus = next;
    }
    current = elem;
  };

  $displayPanel.close = function(itemDisplayPanelOptions){
    if(itemDisplayPanelOptions.animate){
        //only hide if animate is true to avoid iddues with transitions then destroy scope
        content = element[0].querySelector(".display-panel");
        content.style.transform = "translate(110%)";
        isHidden = true;
        scope.$destroy();
      } else {
        //remove item display panel
        element.remove();
        isOpen = false;
        scope.$destroy();
      }
  };

  $displayPanel.panelOpen = function(){
    return isOpen;
  };

  $displayPanel.panelHidden = function(){
    return isHidden;
  };

  $displayPanel.getCurrentPanel = function() {
    return current;
  };

  $displayPanel.movePrev = function(selector) {
    if (current && current.length) {
      var prev = current.prevAll(selector).first();
      if (prev.length > 0) {
        prev.focus();
        current = prev;
      }
    }
  };

  $displayPanel.moveNext = function(selector) {
    if (current && current.length) {
      var next = current.nextAll(selector).first();
      if (next.length > 0) {
        next.focus();
        current = next;
      }
    }
  };

  return $displayPanel;
}
