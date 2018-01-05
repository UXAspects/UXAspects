export default function $staticTooltip() {

  var tooltips = [];

  $staticTooltip.registerTooltip = function(tooltip) {
    tooltips.push({
      visible: false,
      tooltip: tooltip
    });
  };

  $staticTooltip.tooltipShown = function(tooltip) {
      tooltips.filter((item) => item.tooltip === tooltip).forEach((item) => {
        item.visible = true;
      });
  };

  $staticTooltip.tooltipDestroyed = function(tooltip) {
      tooltips.filter((item) => item.tooltip === tooltip).forEach((item) => {
        item.visible = false;
      });
  };

  $staticTooltip.destroyTooltip = function(tooltip) {
    tooltips.filter((item) => item.tooltip === tooltip).forEach((item) => {
      item.visible = false;
      item.tooltip.destroyTooltip();
    });
  };

  $staticTooltip.destroyAllTooltips = function() {
    tooltips.forEach((item) => {
      item.visible = false;
      item.tooltip.destroyTooltip();
      tooltips = [];
    });
  };

  $staticTooltip.hideAllTooltips = function() {
    tooltips.forEach((item) => {
      item.visible = false;
      item.tooltip.destroyTooltip();
    });
  };

  $staticTooltip.showAllTooltips = function() {
    tooltips.forEach((item) => {
      item.visible = true;
      item.tooltip.showTooltip();
    });
  };

  $staticTooltip.showTooltip = function(id) {
    tooltips.filter((item) => item.tooltip.tooltipId === id).forEach((item) => {
      item.visible = true;
      item.tooltip.showTooltip();
    });
  };

  $staticTooltip.hideTooltip = function(id) {
    tooltips.filter((item) => item.tooltip.tooltipId === id).forEach((item) => {
      item.visible = false;
      item.tooltip.destroyTooltip();
    });
  };

  $staticTooltip.tooltipsVisible = function() {
    return tooltips.filter((item) => item.visible).length > 0;
  };

  return $staticTooltip;
} 
