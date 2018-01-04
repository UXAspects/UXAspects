timeAgo.$inject = ['timeAgoService', '$parse', 'safeInterval'];

export default function timeAgo(timeAgoService, $parse, safeInterval) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            //store the date
            var date = $parse(attrs.timeAgo)(scope);

            //store the current text - only update the dom if required
            var currentText;

            //create an instance of the safe interval service bound to the scope
            var safeIntervalInstance = safeInterval.create(scope);

            //update the time every second
            safeIntervalInstance.interval(function() {
                //get a timestamp
                var timeStamp = timeAgoService.timeSinceNow(date);

                //compare it with the current text
                if (currentText !== timeStamp) {
                    currentText = timeStamp;
                    element.text(timeStamp);
                }

            }, 1000);
        }
    };
}