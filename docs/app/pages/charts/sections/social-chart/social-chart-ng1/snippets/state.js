function onLoadComplete() {

    //Define the function in a closure
    function onLoadComplete() {
        vm.api.setSelectedNodeById(61);
    }

    return onLoadComplete;
}

vm.api = {
    //Set other API calls as required
    onLoadComplete: onLoadComplete()
    //...
};
