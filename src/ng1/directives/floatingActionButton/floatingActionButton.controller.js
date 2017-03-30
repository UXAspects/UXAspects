FloatingActionButton.$inject = ["$scope"];

export default function FloatingActionButton() {
	var vm = this;

	vm.onSelect = function (select) {
		select();
	};
}