var safeTimeoutInstance = safeTimeout.create($scope);
safeTimeoutInstance.timeout(function(){
    console.log("run in 100ms");
}, 100);