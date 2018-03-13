export default function floatingActionButton() {
  return {
    restrict: 'E',
    template: require('./floatingActionButton.html'),
    controller: 'FloatingActionButton as fab',
    scope: {
      items: "=",
      direction: "=",
      primary: "=",
      fabTooltip: "@?",
      fabTooltipPlacement: "@?"
    },
    bindToController: true
  };
}