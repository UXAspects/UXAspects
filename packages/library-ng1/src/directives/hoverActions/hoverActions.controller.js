/*
  The purpose of this controller is to ensure that a hover-action elements is only
  used within a hover-actions container. It is also used to store the hover element
  to avoid any unnecessary DOM traversal
*/

export default function HoverActionsCtrl() {
  var vm = this;

  vm.hoverElement = null;
}