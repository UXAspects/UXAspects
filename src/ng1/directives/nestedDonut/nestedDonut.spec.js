describe('nested donut charts', function() {
    var $compile, $rootScope, $scope, d3;
    var vm = {};
    var element;
    var click_fired = false;

    beforeEach(module("ux-aspects.nestedDonut"));
    beforeEach(module('ux-aspects.d3'));


    beforeEach(inject(function(_$compile_, _$rootScope_, _d3_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        d3 = _d3_;
    }));

    describe("nested donut directive", function() {
        beforeEach(function() {
            vm = {};

            vm.chart_data = [{
                label: 'documents',
                color: '#ccc',
                value: 23456
            }, {
                label: 'reviewed',
                color: '#2AD2C9',
                value: 19876
            }, {
                label: 'produced',
                color: '#FF8D6D',
                value: 11123
            }];

            vm.chart_options = {
                size: 200,
                donutWidth: 5,
                donutSpacing: 5,
                hoverAnimation: true,
                onHover: function() {
                    // perform any actions here on hover
                },
                onClick: function() {
                    // perform any actions here on hover   
                    click_fired = true;     
                },
                centerLabel: {
                    show: true,
                    text: 'Documents',
                    color: '#333',
                    font: 'Source Sans Pro',
                    fontSize: 23
                },
                tooltip: {
                    show: true
                }
            };

            $scope.vm = vm;

            var html_string = '<nested-donut dataset="vm.chart_data" options="vm.chart_options"></nested-donut>';

            element = $compile(html_string)($scope);

            $scope.$digest();
        });

        it('should initialise the chart correctly', function() {
            // should have a tooltip element
            var tooltip = element.find('.tooltip');
            expect(tooltip.length).toBe(1);

            // should have an svg element
            var svg = element.find('svg');
            expect(svg.length).toBe(1);

            // should have a 'g' element inside svg
            var g = svg.find('g');
            expect(g.length).toBe(1);
        });

        it('should have the correct number of donuts', function() {
            // there should be 3 rings added to the chart
            var rings = element.find('path');
            expect(rings.length).toBe(3);
        });

        it('should have the correct properties on each donut', function() {
            // there should be 3 rings added to the chart
            var rings = element.find('path');
            expect(rings.length).toBe(3);

            rings.each(function(idx, ring) {
                // ensure the data bind is correct
                var data = d3.select(ring).data()[0];
                expect(angular.equals(data, $scope.vm.chart_data[idx])).toBe(true);

                // ensure the fill color matches
                var fill_color = ring.getAttribute('fill');
                expect(fill_color).toBe(data.color);
            });
        });

        it('should show the correct center label', function() {

            // get text element
            var text_element = element.find('text');


            // get testable properties
            var font_family = text_element.attr('font-family');
            var font_size = text_element.attr('font-size');
            var fill_color = text_element.attr('fill');
            
            var text_content = text_element.text();

            // check all property values
            var text_options = $scope.vm.chart_options.centerLabel;

            expect(font_family).toBe(text_options.font);
            expect(font_size).toBe(text_options.fontSize + 'px');
            expect(fill_color).toBe(text_options.color);
            expect(text_content).toBe(text_options.text);
        });
        
        it('should fire event on click', function() {
            
            // get a ring element
            var ring = element.find('path').first();
            expect(ring.length).toBe(1);
            
            var click_event = d3.select(ring.get(0)).on("click");
            
            expect(click_fired).toBe(false);
            
            // perform hover
            click_event(ring.get(0).__data__);
            
            expect(click_fired).toBe(true);            
            
        });
        
        it('should update when data changed and have the correct properties on each donut', function() {
            
            $scope.vm.chart_data = [{
                label: 'outer',
                color: '#2AD2C9',
                value: 13456
            }, {
                label: 'middle',
                color: '#FF8D6D',
                value: 9876
            }, {
                label: 'inner',
                color: '#ccc',
                value: 1123
            }];
            
            $scope.$digest();
            
            // there should be 3 rings added to the chart
            var rings = element.find('path');
            expect(rings.length).toBe(3);

            rings.each(function(idx, ring) {
                // ensure the data bind is correct
                var data = d3.select(ring).data()[0];
                expect(angular.equals(data, $scope.vm.chart_data[idx])).toBe(true);

                // ensure the fill color matches
                var fill_color = ring.getAttribute('fill');
                expect(fill_color).toBe(data.color);
            });
        });

    });

});