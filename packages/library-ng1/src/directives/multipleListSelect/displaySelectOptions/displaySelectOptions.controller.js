displaySelectOptionsCtrl.$inject = ["$scope", "multipleSelectProvider"];

export default function displaySelectOptionsCtrl($scope, multipleSelectProvider) {
	this.provider = multipleSelectProvider;

	this.state = this.provider.state; 

}