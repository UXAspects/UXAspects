DisplayCancelOptionCtrl.$inject = ["$scope", "multipleSelectProvider"];

export default function DisplayCancelOptionCtrl($scope, multipleSelectProvider) {
	this.provider = multipleSelectProvider;


	this.state = this.provider.state;
}