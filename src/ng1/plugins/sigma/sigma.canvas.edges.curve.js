/*! sigma.js - A JavaScript library dedicated to graph drawing. - Version: 1.0.3 - Author: Alexis Jacomy, Sciences-Po Médialab - License: MIT */
//MODIFIED FOR UX Aspects
(function() {
  'use strict';

  sigma.utils.pkg('sigma.canvas.edges');

  /**
   * This edge renderer will display edges as curves.
   *
   * @param  {object}                   edge         The edge object.
   * @param  {object}                   source node  The edge source node.
   * @param  {object}                   target node  The edge target node.
   * @param  {CanvasRenderingContext2D} context      The canvas context.
   * @param  {configurable}             settings     The settings function.
   */
  sigma.canvas.edges.curve = function(edge, source, target, context, settings) {
    var color = edge.color,
      prefix = settings('prefix') || '',
      size = edge[prefix + 'size'] || 1,
      edgeColor = settings('edgeColor'),
      defaultNodeColor = settings('defaultNodeColor'),
      defaultEdgeColor = settings('defaultEdgeColor'),
      defaultEdgeHoverColor = settings('defaultEdgeHoverColor') || '#2AD2C9',
      cp = {},
      sSize = source[prefix + 'size'],
      sX = source[prefix + 'x'],
      sY = source[prefix + 'y'],
      tX = target[prefix + 'x'],
      tY = target[prefix + 'y'];

    cp = (source.id === target.id) ?
      sigma.utils.getSelfLoopControlPoints(sX, sY, sSize) :
      sigma.utils.getQuadraticControlPoint(sX, sY, tX, tY);

    if (!color)
      switch (edgeColor) {
        case 'source':
          color = source.color || defaultNodeColor;
          break;
        case 'target':
          color = target.color || defaultNodeColor;
          break;
        default:
          color = (edge.selected) ? defaultEdgeHoverColor : defaultEdgeColor;
          break;
      }


    var runTimes = (edge.selected) ? size * 10 : 0;

    for (var i = runTimes; i >= 0; i--) {

      context.strokeStyle = (i > 0) ? settings("selectedEdgeShadowColor") : color;
      if (edge.selected) {
        context.lineWidth = (i > 0) ? ((i) + 1) * 3 - 1 : ((i) + 1) * 2 - 1;
      } else {
        context.lineWidth = size;
      }
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(sX, sY);

      if (source.id === target.id) {
        context.bezierCurveTo(cp.x1, cp.y1, cp.x2, cp.y2, tX, tY);
      } else {
        context.quadraticCurveTo(cp.x, cp.y, tX, tY);
      }

      context.stroke();

    };

  }
})();