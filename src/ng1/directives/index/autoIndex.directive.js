export default function autoIndex() {
  return{
    restrict:'A',
    link :autoIndexLink
  };

  function autoIndexLink(scope, element, attrs){
    //This value will come from an ng-repeat
    var index = scope.$index || 0;
    var indexOptions = {};

    //Evaluate configuration object and set defaults
    var indexValue = scope.$eval(attrs.autoIndex || "") || {};
    indexOptions.skip = indexValue.skip || 0;
    indexOptions.offset = indexValue.offset || 0;
    indexOptions.base = indexValue.base || 0;

    //User wants to declare how many items to skip over but we want to calculate what the value of the next item after that should be
    //NB: when the value is 1 there is nothing to skip.
    indexOptions.skip++;

    //E.g. if a row has 5 hover actions, the rows should be numbered 0, 6, 12 etc.
    //so that the hover actions can have index 1,2,3,4,5
    //the offset value allows for a non-zero start
    var calculatedIndex = ( index * indexOptions.skip ) + indexOptions.offset;

    //If these properties are not set, then set them
    if (!angular.isDefined(attrs.index)){
      //This property is used internally for keyboard controls
      element.attr("index" , calculatedIndex);
    }
    if (!angular.isDefined(attrs.tabIndex)){
      //NB essentially this disables tabbing so that the internal keyboard controls can work
      element.attr("tabindex" , ( calculatedIndex === indexOptions.base)  ? "1" : "-1" );
    }

  }
}
