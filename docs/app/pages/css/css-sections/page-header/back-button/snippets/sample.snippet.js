if($state.current && $state.current.ncyBreadcrumb && $state.current.ncyBreadcrumb.parent) {
  vm.previousState = $state.current.ncyBreadcrumb.parent;
}
else if($state.$current.locals.globals.previousState){
  vm.previousState = $state.$current.locals.globals.previousState;
}
else{
  //if previous state is empty, go to home by default
  vm.previousState="/";
}