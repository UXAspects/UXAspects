var safeIntervalInstance = safeInterval.create($scope);
safeIntervalInstance.interval(function(){
    console.log("runs every 100ms");
}, 100);