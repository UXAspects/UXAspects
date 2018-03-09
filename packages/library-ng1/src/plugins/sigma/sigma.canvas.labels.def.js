/*! sigma.js - A JavaScript library dedicated to graph drawing. - Version: 1.0.3 - Author: Alexis Jacomy, Sciences-Po Médialab - License: MIT */
//MODIFIED FOR UX Aspects
(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.labels');

  /**
   * This label renderer will just display the label on the right of the node.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.labels.def = function(node, context, settings) {
    var fontSize,
        prefix = settings('prefix') || '',
        size = node[prefix + 'size'];

    if (!node.label || typeof node.label !== 'string')
      return;

    if ( 
      ((node.showLabel) || (node.selected)) 
      || 
      ((size >= settings('labelThreshold')) && (node.color === node.originalColour))
      ) {

      fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

      context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
        fontSize + 'px ' + settings('font');
      context.fillStyle = (settings('labelColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelColor');

      context.fillText(
        node.label,
        Math.round(node[prefix + 'x'] + size + 5),
        Math.round(node[prefix + 'y'] + fontSize / 3)
      );
    }
  };
}).call(this);
