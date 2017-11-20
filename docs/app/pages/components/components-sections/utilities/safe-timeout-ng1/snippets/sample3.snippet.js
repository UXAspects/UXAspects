var timer = safeTimeoutInstance.timeout(function(){
    console.log("run in 100ms");
}, 100);
safeTimeoutInstance.cancel(timer);