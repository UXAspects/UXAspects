nestedDonut.$inject = ['d3'];

export default function nestedDonut(d3) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div class="nested-donut-container"><div class="tooltip top" style="display: none; opacity: 1;" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div></div>',
        scope: {
            dataset: '=',
            options: '=?'
        },
        link: function (scope, element) {
            var vm = this;

            var container = element.get(0);

            // create tooltip references
            var tooltip = element.find('.tooltip');
            var tooltip_inner = tooltip.find('.tooltip-inner');
            var current_tooltip_text;
            var tooltip_dimensions = {
                width: 0,
                height: 0
            };

            var svg, paths, text_label;

            // store chart data after processing
            var chart_data;

            // chart options
            var default_options = {
                size: 150,
                donutWidth: 4,
                donutSpacing: 4,
                hoverAnimation: true,
                onHover: angular.noop,
                onClick: angular.noop,
                centerLabel: {
                    show: false,
                    text: '',
                    color: '#333',
                    font: 'Source Sans Pro',
                    fontSize: 20
                },
                tooltip: {
                    show: true,
                    content: function (data) {
                        return '<b>' + data.value + '</b> ' + data.label;
                    },
                    shifts: {
                        x: 0,
                        y: 0
                    }
                }
            };

            // create chart options by extending the default options
            var chart_options = angular.extend(default_options, scope.options);

            // ensure values are valid
            if(angular.isNumber(chart_options.size) === false && chart_options.size.indexOf('%') === -1 || chart_options.size <= 0) {
                throw Error('Nested Donut - Chart size must be a positive greater than zero.');
            }

            // set chart width and height attributes based on pixel ratio
            container.width = chart_options.size;
            container.height = chart_options.size;
            if(typeof chart_options.size === 'string') {
                container.style.width = chart_options.size;
                container.style.height = chart_options.size;
                var origSize = parseInt(chart_options.size)/100;
                chart_options.size = origSize;
                calculatePercentageSize();
                
                //watch for window being resized and redraw chart
                window.addEventListener('resize', function() {
                    calculatePercentageSize();
                    reinit_chart(); 
                });


            } else {
                container.style.width = chart_options.size + 'px'; 
                container.style.height = chart_options.size + 'px';
            } 
             
            // process initial data
            process_data(scope.dataset);

            // initialise chart
            init_chart();

            // watch for any changes in data
            scope.$watch('dataset', function (nv, ov) {
                if (!angular.equals(nv, ov)) {
                    process_data(nv);
                    reinit_chart();
                }
            }, true);

            // watch for any changes in options
            scope.$watch('options', function (nv, ov) {
                if (!angular.equals(nv, ov)) reinit_chart();
            }, true);

            // Private Functions

            function calculatePercentageSize() {
                var propertyValues = window.getComputedStyle(container.parentNode);
                var height = parseInt(propertyValues.getPropertyValue("height"));
                var width = parseInt(propertyValues.getPropertyValue("width"));
                if(height<width){
                    chart_options.size = height*origSize;    
                } else {
                    chart_options.size = width*origSize; 
                }
            }

            function process_data(data) {

                if (!data || data.length === 0) {
                    chart_data = [];
                    return;
                }

                // ensure each item has a value property - default to zero
                data.forEach(function(item) { 
                    if(!item.value) {
                        item.value = 0;
                    }
                });

                // slice and sort the chart data
                chart_data = data.slice(0).sort(function (a, b) {

                    // sort the list
                    if (a.value > b.value) return -1;
                    if (a.value < b.value) return 1;

                    return 0;
                });
            }

            function init_chart() {
                svg = d3.select(container)
                    .append("svg").attr("width", chart_options.size)
                    .attr("focusable", false)
                    .attr("height", chart_options.size)
                    .append("g").attr("transform", "translate(" + chart_options.size / 2 + "," + chart_options.size / 2 + ")");

                // draw initial chart
                draw_chart();
            }

            function reinit_chart() {
                element.find('svg').remove();

                // call init to draw chart again
                init_chart();
            }

            function draw_chart() {

                // predefined function for calculating the arc path
                var arc = d3.svg.arc().innerRadius(calculate_inner_radius).outerRadius(calculate_outer_radius).startAngle(0).endAngle(calculate_angle);

                // add paths to svg element
                paths = svg.selectAll('path').data(d3.values(chart_data)).enter().append('path')
                    .attr('fill', fill_color).attr('opacity', 1).attr('d', arc)
                    .on('mouseover', segment_hover_start)
                    .on('mousemove', segment_hover_move)
                    .on('mouseout', segment_hover_end)
                    .on('click', segment_click);

                // if no text label is required then stop here
                if (chart_options.centerLabel.show === false) return;

                // add a text label if one is required
                text_label = svg.append('text')
                    .text(chart_options.centerLabel.text)
                    .attr("font-family", chart_options.centerLabel.font)
                    .attr("font-size", chart_options.centerLabel.fontSize + "px")
                    .attr("fill", chart_options.centerLabel.color)
                    .style("text-anchor", "middle")
                    .style("dominant-baseline", "central");
            }

            // D3 Functions

            function calculate_inner_radius(data, index) {
                var radius = chart_options.size / 2;
                return (radius - chart_options.donutWidth) - ((chart_options.donutWidth + chart_options.donutSpacing) * index);
            }

            function calculate_outer_radius(data, index) {
                var radius = chart_options.size / 2;
                return radius - ((chart_options.donutWidth + chart_options.donutSpacing) * index);
            }

            function calculate_angle(data) {
                var max_data = chart_data[0].value;
                return (data.value / max_data) * (2 * Math.PI);
            }

            function fill_color(data) {
                return data.color;
            }

            function segment_hover_start(data) {

                // the path being hovered is provided as the context
                var hovered_path = this;

                if (chart_options.hoverAnimation)
                    d3.select(hovered_path).transition().ease("ease-in-out").duration("300").attr("opacity", 0.5);

                // update the tooltip if enabled
                update_tooltip.apply(hovered_path, [data]);

                // call on hover event
                chart_options.onClick.apply(vm, [data]);
            }

            function segment_hover_move(data) {
                // if the tooltip is enabled then update the position
                update_tooltip(data);
            }

            function segment_hover_end() {
                // the path being hovered is provided as the context
                var hovered_path = this;

                // revent any states caused by hover event
                if (chart_options.hoverAnimation)
                    d3.select(hovered_path).transition().ease("ease-in-out").duration("300").attr("opacity", 1);

                // if tooltips are enabled then hide any visible tooltip
                if (chart_options.tooltip.show === true) tooltip.hide();
            }

            function segment_click(data) {
                // call on click event
                chart_options.onClick.apply(vm, [data]);
            }

            function update_tooltip(data) {

                // get mouse event
                var mouse_event = d3.event;

                var mouse_coordinates = {
                    x: mouse_event.clientX,
                    y: mouse_event.clientY
                };

                // if tooltips are not enabled then return
                if (chart_options.tooltip.show === false) return;

                // get the tooltip text
                var tooltip_text = chart_options.tooltip.content(data);

                // if the text is different that the text currently in the tooltip update the text
                if (tooltip_text !== current_tooltip_text) {

                    // store the new text
                    current_tooltip_text = tooltip_text;

                    // update the html
                    tooltip_inner.html(tooltip_text);

                    // update the stored dimensions
                    tooltip_dimensions.width = tooltip.width();
                    tooltip_dimensions.height = tooltip.height();
                }

                // set tooltip position
                tooltip.css({
                    position: "fixed",
                    top: mouse_coordinates.y - (tooltip_dimensions.height + 10) + chart_options.tooltip.shifts.y,
                    left: mouse_coordinates.x - (tooltip_dimensions.width / 2) + chart_options.tooltip.shifts.x
                });

                // make tooltip visible if it is not already
                tooltip.show();

            }

        }
    };
}