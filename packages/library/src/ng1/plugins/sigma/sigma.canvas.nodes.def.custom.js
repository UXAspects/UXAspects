/*! sigma.js - A JavaScript library dedicated to graph drawing. - Version: 1.0.3 - Author: Alexis Jacomy, Sciences-Po Médialab - License: MIT */
//MODIFIED FOR UX Aspects
(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.nodes');

  /**
   * The default node renderer. It renders the node as a simple disc.
   *
   * @param  {object}                   node     The node object.
   * @param  {CanvasRenderingContext2D} context  The canvas context.
   * @param  {configurable}             settings The settings function.
   */
  sigma.canvas.nodes.def = function(node, context, settings) {
    var prefix = settings('prefix') || '';

    if (node.selected && !node.skipRender) {
      var gradient = context.createRadialGradient(
        node[prefix + 'x'],
        node[prefix + 'y'],
        Math.round(node[prefix + 'size'] * 1.5),
        node[prefix + 'x'],
        node[prefix + 'y'],
        Math.round(node[prefix + 'size'] * 0.7));
      gradient.addColorStop(0, settings('selectedShadowColorTransparent') || 'rgba(69, 148, 219, 0)');
      gradient.addColorStop(1, settings('selectedShadowColor') || '#4594db');

      context.beginPath();
      context.arc(
        node[prefix + 'x'],
        node[prefix + 'y'], ((settings('borderSize') > 0) ? node[prefix + 'size'] + settings('borderSize') + 1 : node[prefix + 'size']) * 1.5,
        0,
        Math.PI * 2,
        true
      );
      context.fillStyle = gradient;
      context.closePath();
      context.fill();
    }
    node.skipRender=null;

    context.save();
    var size = node[prefix + 'size'];
    if (node.style && node.style==="fill"){
      context.fillStyle = node.color || settings('defaultNodeColor');
    }
    else{
     context.fillStyle = '#333' || settings('stageColor'); 
    }
    var stroke = false;
    if (node.style && node.style ==="stroke"){
      context.strokeStyle = node.color || settings('defaultNodeColor');
      context.lineWidth =  (settings('nodesPowRatio')/settings('zoomLevel')) * (settings('zoomLevel')+settings('nodesPowRatio'));
      size =size*0.9;
      stroke = true;
    }
    else{
      context.strokeStyle = 'rgba(0,0,0,0)';
    }
    context.beginPath();
    context.arc(
      node[prefix + 'x'],
      node[prefix + 'y'],
      size,
      0,
      Math.PI * 2,
      true
    );

    context.closePath();
    context.fill();
    if (stroke){
      context.stroke();
    }
    context.restore();

  };
})();