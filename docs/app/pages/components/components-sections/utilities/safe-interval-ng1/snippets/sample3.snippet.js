var interval = safeIntervalInstance.interval(function(){
    console.log("runs every 100ms");
}, 100);
safeIntervalInstance.cancel(interval);