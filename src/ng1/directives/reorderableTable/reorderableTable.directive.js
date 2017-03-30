reorderableTable.$inject = ['safeTimeout', 'safeEventListener'];

export default function reorderableTable(safeTimeout, safeEventListener) {
    return {
        restrict: 'A',
        scope: true,
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {

            // create instances of scope safe handlers
            var safeTimeoutInstance = safeTimeout.create(scope);
            var safeEventListenerInstance = safeEventListener.create(scope);

            // wait for element to be rendered
            safeTimeoutInstance.timeout(init);

            // store some information when dragging
            var selected_table_row;
            var table_body = element.find('tbody');

            // ensure there is a tbody - otherwise make a fuss
            if (table_body.length === 0) throw new Error('Reorderable Table - The table must have a <tbody>.');

            // prepare scope values
            var on_reorder = scope.$eval(attrs.onReorder) || angular.noop;
            var on_reorder_complete = scope.$eval(attrs.onReorderComplete) || angular.noop;

            function init() {

                // create unique ids
                create_unique_ids();

                // any any required event listeners
                add_event_listeners();

                // watch for any new rows being added
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {

                        // look for any new nodes
                        if (mutation.addedNodes && mutation.addedNodes.length > 0) {

                            // iterate each node
                            for (var idx = 0; idx < mutation.addedNodes.length; idx++) {

                                // get the current node
                                var node = mutation.addedNodes.item(idx);

                                // if node name is a tr then we need to prepare it
                                if (node.nodeName.toLowerCase() === 'tr') {
                                    add_new_row(node);
                                }
                            }

                        }
                    });
                });

                // configuration of the observer:
                var config = {
                    childList: true,
                    subtree: true
                };

                // watch for any new rows being added
                observer.observe(element[0], config);
            }

            function add_new_row(element) {

                // if the element has an id it has been moved not created so skip this bit
                if (element.id && element.id !== "") return;

                var table_row = angular.element(element);

                // give the row a unique id
                table_row.uniqueId();

                // find drag elements
                var drag_controls = table_row.find('[reorder-drag]');
                var reorder_up_controls = table_row.find('[reorder-up]');
                var reorder_down_controls = table_row.find('[reorder-down]');

                // add event handlers to drag handle
                drag_controls.mousedown(on_drag_begin);

                // add event handler to reorder buttons
                reorder_up_controls.click(on_move_up);
                reorder_down_controls.click(on_move_down);

                // add mouse over event to each table row
                table_row.mouseover(on_mouse_over_row);
            }

            function create_unique_ids() {

                // get all the table rows and add a unique id to them
                table_body.find('tr').uniqueId();
            }

            function add_event_listeners() {

                // find any reorder controls
                var table_rows = table_body.find('tr');
                var drag_controls = table_body.find('[reorder-drag]');
                var reorder_up_controls = table_body.find('[reorder-up]');
                var reorder_down_controls = table_body.find('[reorder-down]');

                // add mouse move event handler to the document - use safeEventListener to ensure disposal
                safeEventListenerInstance.bind(document, 'mousemove', on_drag);
                safeEventListenerInstance.bind(document, 'mouseup', on_drag_end);

                // add event handlers to drag handle
                drag_controls.mousedown(on_drag_begin);

                // add event handler to reorder buttons
                reorder_up_controls.click(on_move_up);
                reorder_down_controls.click(on_move_down);

                // add mouse over event to each table row
                table_rows.mouseover(on_mouse_over_row);
            }

            function on_drag_begin(evt) {

                // clear any text selection
                clear_selection();

                // get the table row from the event target
                var table_row = table_row_from_event(evt);

                // store the currently dragged element
                selected_table_row = table_row;

                // add the 'dragging' class to the table row
                angular.element(table_row).addClass('dragging');

                // set the cursor to a dragging state
                document.body.style.cursor = 'ns-resize';
            }

            function on_drag() {

                // clear any text selection if we are dragging
                if (selected_table_row) clear_selection();
            }

            function on_drag_end() {

                // dont do anything if we were not dragging
                if (!selected_table_row) return;

                // remove the 'dragging' class from the row
                angular.element(selected_table_row).removeClass('dragging');

                // remove any reference of the dragging row
                selected_table_row = null;

                // remove dragging cursor
                document.body.style.cursor = '';

                // call callback
                on_reorder_complete(ngModel.$viewValue);
            }

            function on_move_up(evt) {
                var table_row = table_row_from_event(evt);

                // try to find a previous row if there is one
                var previous_row = angular.element(table_row).prev('tr');

                // if there is a previous row then swap with it
                if (previous_row.length !== 0) swap_rows(table_row, previous_row.get(0), false);

                // call callback
                on_reorder_complete(ngModel.$viewValue);
            }

            function on_move_down(evt) {
                var table_row = table_row_from_event(evt);

                // try to find a next row if there is one
                var next_row = angular.element(table_row).next('tr');

                // if there is a next row then swap with it
                if (next_row.length !== 0) swap_rows(table_row, next_row.get(0), false);

                // call callback
                on_reorder_complete(ngModel.$viewValue);
            }

            function on_mouse_over_row(evt) {

                var table_row = table_row_from_event(evt);

                // if we are not dragging anything then or the mouse is over the current dragging item return
                if (!selected_table_row || table_row.id === selected_table_row.id) return;

                swap_rows(selected_table_row, table_row, false);
            }

            function table_row_from_event(evt) {

                // return the first table row element that is a parent of the click target
                return angular.element(evt.target).parents('tr').get(0);
            }

            function swap_rows(row_one, row_two, is_hopping) {

                // angular element wrappers
                var wrapped_row_one = angular.element(row_one);
                var wrapped_row_two = angular.element(row_two);

                // get the positions of the elements within it's parent
                var row_one_index = wrapped_row_one.index();
                var row_two_index = wrapped_row_two.index();

                // we need to check if the two rows are immediate siblings - if not then we need to hop each one in order
                if (wrapped_row_one.prev('tr').attr('id') !== wrapped_row_two.attr('id') &&
                    wrapped_row_one.next('tr').attr('id') !== wrapped_row_two.attr('id')) {

                    // perform hopping action to move all rows in between up or down without reordering them
                    perform_hopping(row_one, row_two, row_one_index > row_two_index ? 'up' : 'down');

                    return;
                }

                // get the current ngmodel value
                var model = ngModel.$viewValue.slice(0);

                // get the current data of the elements
                var row_one_data = model[row_one_index];
                var row_two_data = model[row_two_index];

                // swap data in array
                model[row_one_index] = row_two_data;
                model[row_two_index] = row_one_data;

                // next update the model
                ngModel.$setViewValue(model);

                // perform render to update the 
                ngModel.$render();

                // call event handler if not hopping
                if (is_hopping === false) on_reorder(model);
            }

            function perform_hopping(source_row, target_row, direction) {

                // create wrapped elements
                var wrapped_source_row = angular.element(source_row);

                // keep track of progress
                var moving_complete = false;
                var iterator = 0;

                // find the maximum possible number of swaps
                var max_iteration_count = table_body.find('tr').length;

                // we are attempting to move a row up - until the previous sibling is row two keep swapping
                while (moving_complete === false && iterator < max_iteration_count) {

                    // get the next/previous table row
                    var sibling_row = direction === 'up' ? wrapped_source_row.prev('tr') : wrapped_source_row.next('tr');

                    // if there is no previous row then stop looping
                    if (sibling_row.length === 0) break;

                    // if the previous row matches the target row then mark as complete
                    if (sibling_row.attr('id') === target_row.id) moving_complete = true;

                    // otherwise swap the two rows
                    swap_rows(source_row, sibling_row.get(0), !moving_complete);

                    // keep track of iteration count to avoid infinite loop
                    iterator++;
                }

            }

            function clear_selection() {
                // unhighlight any text that may be selected - often happens when dragging
                if (document.selection) document.selection.empty();
                else if (window.getSelection) window.getSelection().removeAllRanges();
            }
        }
    };
}