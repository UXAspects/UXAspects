/*! sigma.js - A JavaScript library dedicated to graph drawing. - Version: 1.0.3 - Author: Alexis Jacomy, Sciences-Po Médialab - License: MIT */
//MODIFIED FOR UX Aspects
(function(undefined) {
  'use strict';

  if (typeof sigma === 'undefined')
    throw 'sigma is not declared';

  // Initialize packages:
  sigma.utils.pkg('sigma.misc');

  /**
   * This method listens to "overNode", "outNode", "overEdge" and "outEdge"
   * events from a renderer and renders the nodes differently on the top layer.
   * The goal is to make any node label readable with the mouse, and to
   * highlight hovered nodes and edges.
   *
   * It has to be called in the scope of the related renderer.
   */
  sigma.misc.drawHovers = function(prefix) {
    var self = this,
        hoveredNodes = {},
        hoveredEdges = {};

    this.bind('overNode', function(event) {
      var node = event.data.node;
      if (!node.hidden) {
        hoveredNodes[node.id] = node;
        draw();
      }
    });

    this.bind('outNode', function(event) {
      hoveredNodes = {};
      draw();
    });

    this.bind('overEdge', function(event) {
      var edge = event.data.edge;
      if (!edge.hidden) {
        hoveredEdges[edge.id] = edge;
        draw();
      }
    });

    this.bind('outEdge', function(event) {
      hoveredEdges = {};
      draw();
    });

    this.bind('render', function(event) {
      draw();
    });

    function draw() {
      // Clear self.contexts.hover:
      self.contexts.hover.canvas.width = self.contexts.hover.canvas.width;

      if (self.settings("disableHover")){
        return;
      }

      var k,
          source,
          target,
          hoveredNode,
          hoveredEdge,
          defaultNodeType = self.settings('defaultNodeType'),
          defaultEdgeType = self.settings('defaultEdgeType'),
          nodeRenderers = sigma.canvas.hovers,
          edgeRenderers = sigma.canvas.edgehovers,
          extremitiesRenderers = sigma.canvas.extremities,
          embedSettings = self.settings.embedObjects({
            prefix: prefix
          });

      // Node render: single hover
      if (
        embedSettings('enableHovering') &&
        embedSettings('singleHover') &&
        Object.keys(hoveredNodes).length
      ) {
        hoveredNode = hoveredNodes[Object.keys(hoveredNodes)[0]];
        (
          nodeRenderers[hoveredNode.type] ||
          nodeRenderers[defaultNodeType] ||
          nodeRenderers.def
        )(
          hoveredNode,
          self.contexts.hover,
          embedSettings
        );
      }

      // Edge render: single hover
      if (
        embedSettings('enableEdgeHovering') &&
        embedSettings('singleHover') &&
        Object.keys(hoveredEdges).length
      ) {
        hoveredEdge = hoveredEdges[Object.keys(hoveredEdges)[0]];
        source = self.graph.nodes(hoveredEdge.source);
        target = self.graph.nodes(hoveredEdge.target);

        //Do not render if there is a node hovered
        if ( !hoveredEdge.hidden && (!Object.keys(hoveredNodes).length) ) {
          (
            edgeRenderers[hoveredEdge.type] ||
            edgeRenderers[defaultEdgeType] ||
            edgeRenderers.def
          ) (
            hoveredEdge,
            source,
            target,
            self.contexts.hover,
            embedSettings
          );

          if (embedSettings('edgeHoverExtremities')) {
            (
              extremitiesRenderers[hoveredEdge.type] ||
              extremitiesRenderers.def
            )(
              hoveredEdge,
              source,
              target,
              self.contexts.hover,
              embedSettings
            );

          } else {
            // Avoid edges rendered over nodes:
            if(source.selected){
              source.skipRender=true;
            }
            (
              sigma.canvas.nodes[source.type] ||
              sigma.canvas.nodes.def
            ) (
              source,
              self.contexts.hover,
              embedSettings
            );
            if(target.selected){
              target.skipRender=true;
            }
            (
              sigma.canvas.nodes[target.type] ||
              sigma.canvas.nodes.def
            ) (
              target,
              self.contexts.hover,
              embedSettings
            );
          }
        }
      }
    }

    function clearHover(){
      hoveredNodes = {};
      hoveredEdges = {};      
    }

    sigma.misc.drawHovers.clearHover = clearHover;

  };
}).call(this);
