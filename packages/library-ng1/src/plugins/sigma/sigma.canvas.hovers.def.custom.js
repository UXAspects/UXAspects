/*! sigma.js - A JavaScript library dedicated to graph drawing. - Version: 1.0.3 - Author: Alexis Jacomy, Sciences-Po Médialab - License: MIT */
//MODIFIED FOR UX Aspects
(function(undefined) {
  'use strict';

  //Custom Hover Renderer for UX Aspects charts

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.canvas.hovers');

  /**
   * This hover renderer will basically display the label with a background.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.hovers.def = function(node, context, settings) {
    var x,
      y,
      w,
      h,
      e,
      fontStyle = settings('hoverFontStyle') || settings('fontStyle'),
      prefix = settings('prefix') || '',
      size = node[prefix + 'size'],
      fontSize = (settings('labelSize') === 'fixed') ?
      settings('defaultLabelSize') :
      settings('labelSizeRatio') * size;

    //hover shadow 
    if (!node.selected) {

      context.save();

      context.clearRect(
        node[prefix + 'x'] - (node[prefix + 'size'] * 2),
        node[prefix + 'y'] - (node[prefix + 'size'] * 2),
        node[prefix + 'size'] * 4,
        node[prefix + 'size'] * 4);
      context.beginPath();
      context.fillStyle = settings('hoverShadowColor') || '#aaa';
      context.strokeStyle = 'rgba(0,0,0,0)';

      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'], (settings('borderSize') > 0) ? size + settings('borderSize') : size ,
        0,
        Math.PI * 2,
        true
      );
      context.shadowColor = settings('hoverShadowColor') || '#aaa';
      context.shadowBlur = 20;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      context.closePath();
      context.fill();

      context.restore();
    }

    // Node border:
    if (settings('borderSize') > 0) {
      context.beginPath();
      context.fillStyle = settings('nodeBorderColor') === 'node' ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultNodeBorderColor');
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        size + settings('borderSize'),
        0,
        Math.PI * 2,
        true
      );
      context.closePath();
      context.fill();
    }

    // Node:
    var nodeRenderer = sigma.canvas.nodes[node.type] || sigma.canvas.nodes.def;
    if(!node.rendered){
      nodeRenderer(node, context, settings);
    }

  };
}).call(this);