partitionEditing.$inject = ['$window', 'safeInterval'];

export default function partitionEditing($window, safeInterval) {
  return {
    restrict: "E",
    replace: true,
    template: require('./editTemplate.html'),
    link: function(scope, element) {

      var vm = scope.editing = {};

      //globals
      vm.list = element[0].getElementsByClassName('segment-list')[0];
      vm.previousWidth = element.width();
      vm.previousHeight = element.height();

      //set up event listeners
      document.addEventListener("mouseup", endDrag);
      document.addEventListener("mousemove", onDrag);

      scope.$watch('chart.editMode', function(value) {
        //show or hide the edit container accordingly
        if(value === true) show();
        else hide();

      });

      scope.$on('$destroy', destroy);

      safeInterval.create(scope).interval(onResize, 200);

      function onResize() {
        if(scope.chart.editMode === false) return;

        if(element.width() !== vm.previousWidth || element.height() !== vm.previousHeight) {
          resizeSegments();
          vm.previousWidth = element.width();
          vm.previousHeight = element.height();
        }

      }

      vm.done = function() {

        //get sorted groups after dragging and changing
        var output = getSortedGroups();

        //inform the callback if there is one - which there should be
        if(scope.chart.onFinish) scope.chart.onFinish(output);

        //hide the edit mode
        scope.chart.editMode = false;
      };

      function resizeSegments() {
        var numOfRows = scope.chart.maxRows;
        var listHeight = vm.list.offsetHeight;
        vm.rowHeight = Math.ceil(listHeight / numOfRows);

        var segments = getSortedSegments();

        //set the correct height
        for(var i = 0; i < segments.length; i++) {
          segments[i].style.height = vm.rowHeight + 'px';
          segments[i].style.top = (i * vm.rowHeight) + 'px';
        }
      }

      function getSortedGroups() {
        var groups = [];

        var segments = getSortedSegments();

        for(var i = 0; i < segments.length; i++) {
          if(segments[i].getAttribute('group') !== null) groups.push(segments[i].getAttribute('group'));
        }

        return groups;
      }

      function getSortedSegments() {
        var segmentNodes = vm.list.children;

        var segments = [];
        for(var i = 0; i < segmentNodes.length; i++) segments.push(segmentNodes[i]);

        //sort the segments based on top offset
        segments.sort(function(a, b) { return a.offsetTop - b.offsetTop; });

        return segments;
      }


      function destroy() {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", endDrag);
      }


      function show() {

        element.show();
        element.addClass('fade-in');

        //store groups excluding the root
        vm.groups = (scope.chart.groups && scope.chart.groups.length > 1) ? scope.chart.groups.slice(1) : [];

        if(vm.groups.length >= scope.chart.maxRows) {
          vm.groups = vm.groups.slice(0, scope.chart.maxRows);
        }

        //update segments
        updateSegments();

      }

      function hide() {
        element.hide();
        element.removeClass('fade-in');
      }

      function updateSegments(previousColors) {

        //calculate number of rows
        var numOfRows = scope.chart.maxRows; // take into account root node which we have no group for

        //ensure we consider at least one row
        if (numOfRows <= 0) numOfRows = 1;

        //calculate height
        var listHeight = vm.list.offsetHeight;
        vm.rowHeight = Math.ceil(listHeight / numOfRows);

        //remove old segments
        while (vm.list.firstChild) vm.list.removeChild(vm.list.firstChild);

        //loop through each group and add the segment
        for (var sgmt = 0; sgmt < Math.min(vm.groups.length, numOfRows); sgmt += 1) {

          var color = null;

          if(previousColors) {
            for(var i = 0; i < previousColors.length; i++) {
              if(previousColors[i].item === vm.groups[sgmt]) {
                color = previousColors[i].color;
                break;
              }
            }
          }

          if(!color) color = getColor(sgmt);

          var segment = createSegment(vm.groups[sgmt], color, sgmt);
          vm.list.appendChild(segment);
        }

        //if not all rows occupied then add a selection segment
        if (vm.groups.length < numOfRows) createSelectionSegment();
      }

      function getColor(index) {
        var newIndex = index % scope.chart.colors.length;
        var subIndex = Math.floor(index / scope.chart.colors.length);

        if(subIndex > scope.chart.colors[newIndex].length) subIndex -= scope.chart.colors[newIndex].length;

        return scope.chart.colors[newIndex][subIndex];
      }

      function createSegment(text, color, index) {

        //create elements
        var segment = document.createElement('li');

        var groupText = document.createElement('span');
        var groupIcon = document.createElement('span');
        var groupLabel = document.createElement('p');

        var dragBox = document.createElement('div');
        var dragIcon = document.createElement('div');
        var moveUpIcon = document.createElement('div');
        var moveDownIcon = document.createElement('div');
        var closeBox = document.createElement('div');
        var closeIcon = document.createElement('div');

        //set the classes
        segment.className = "segment";
        groupIcon.className = "hpe-icon hpe-down icon";
        groupLabel.className = "group-label";
        groupText.className = "group-name";
        dragBox.className = "drag-box";
        dragIcon.className = "icon";
        moveUpIcon.className = "up-icon";
        moveDownIcon.className = "down-icon";
        closeBox.className = "close-box";
        closeIcon.className = "icon";

        //set attributes
        segment.setAttribute("group", text);

        //set value
        groupText.innerHTML = text;

        //set calculated size and position
        segment.style.height = vm.rowHeight + 'px';
        segment.style.top = (vm.rowHeight * index) + 'px';

        //add event handlers
        moveUpIcon.addEventListener("click", arrowUp);
        moveDownIcon.addEventListener("click", arrowDown);
        dragIcon.addEventListener("mousedown", beginDrag);
        closeIcon.addEventListener("click", removeSegment);
        groupIcon.addEventListener("click", showDropdown);

        //nest elements
        if(vm.groups.length > scope.chart.minRows) 
          closeBox.appendChild(closeIcon);

        dragBox.appendChild(moveUpIcon);
        dragBox.appendChild(dragIcon);
        dragBox.appendChild(moveDownIcon);
        segment.appendChild(dragBox);
        segment.appendChild(closeBox);

        groupLabel.appendChild(groupText);
        groupLabel.appendChild(groupIcon);
        segment.appendChild(groupLabel);
        segment.appendChild(createDropdown());

        //set color
        segment.style.backgroundColor = color;

        //return element
        return segment;
      }

      function createDropdown() {
        //create the dropdown list element
        var dropdown = document.createElement('ul');

        //set dropdown class
        dropdown.className = "dropdown-menu";

        return dropdown;
      }

      function createSelectionSegment() {

        //create elements
        var segment = document.createElement('li');
        var icon = document.createElement('span');
        var text = document.createElement('span');
        var label = document.createElement('p');

        //set classes
        segment.className = "selection-segment";
        icon.className = "hpe-icon hpe-down icon";
        label.className = "selection-label";

        //set values
        text.innerHTML = "Select";

        //set position
        segment.style.top = (Math.min(vm.groups.length, scope.chart.maxRows) * vm.rowHeight) + 'px';
        segment.style.height = vm.rowHeight + 'px';

        //add click event to show dropdown
        icon.addEventListener("click", function(evt) { showDropdown(evt, true); });

        label.appendChild(text);
        label.appendChild(icon);
        segment.appendChild(label);
        segment.appendChild(createDropdown());
        vm.list.appendChild(segment);

      }

      function calculateHoveredRow(evt) {
        //get the position of the container element
        var containerY = vm.list.getBoundingClientRect().top;

        //get mouse position
        var mouseY = evt.clientY;

        //calculate difference
        var offsetY = mouseY - containerY;

        if (offsetY <= 0) return 0;

        //get number of rows
        var numberOfRows = Math.ceil(vm.list.offsetHeight / vm.rowHeight);

        if (offsetY > vm.list.getBoundingClientRect().bottom) return numberOfRows - 1;

        //get row mouse is over
        var row = Math.floor(offsetY / vm.rowHeight);

        //ensure calculated row exists
        if (row > (numberOfRows - 1)) return numberOfRows - 1;

        return row;
      }

      function arrowUp(evt) {
        var row = calculateHoveredRow(evt);

        //if it is already at the top then we shouldnt be doing anything
        if (row === 0) return;

        //get target element
        var dragBox = evt.target.parentNode;

        //get segment
        var segment = dragBox.parentElement;

        vm.selectedSegment = segment;

        //move segment to the correct position
        moveSegment(row - 1, function() {
          //when finished animating update the colours
          updateColors();
        });

      }

      function arrowDown(evt) {
        var row = calculateHoveredRow(evt);

        //if it is already at the bottom then we shouldnt be doing anything
        if (row === (vm.groups.length - 1)) return;

        //get target element
        var dragBox = evt.target.parentNode;

        //get segment
        var segment = dragBox.parentElement;

        vm.selectedSegment = segment;

        //move segment to the correct position
        moveSegment(row + 1, function() {
          //when finished animating update the colours
          updateColors();
        });
      }

      function beginDrag(evt) {

        //ensure that it is mouse button 1 only
        if (evt.button !== 0) return;

        //ensure we hide any dropdowns
        hideAllDropdowns();

        //get target element
        var dragBox = evt.target.parentNode;

        //get segment
        var segment = dragBox.parentElement;

        //set segment class
        segment.className = "segment dragging";

        //ensure event is handled correctly
        evt.preventDefault();

        //remember we are dragging
        vm.dragging = true;

        //remember the initial position in list and segment element
        vm.initialPosition = calculateHoveredRow(evt);
        vm.selectedSegment = segment;
      }

      function onDrag(evt) {
        //if we are not dragging then we dont do anything
        if (!vm.dragging) return;

        var row = calculateHoveredRow(evt);

        //if the current position is not the initialPosition then we need to reorder
        if (row !== vm.initialPosition) {

          //move segment to the correct position
          moveSegment(row);

          //update position
          vm.initialPosition = row;
        }
      }

      function endDrag() {

        //get segment
        var segment = vm.list.getElementsByClassName('dragging')[0];

        //remove dragging class
        if (segment) segment.className = "segment";

        updateColors();

        vm.dragging = false;

        vm.groups = getSortedGroups();
      }

      function showDropdown(evt, selection) {
        //determine element heirarchy
        var icon = evt.target;
        var label = icon.parentNode;
        var segment = label.parentNode;

        //Hide all dropdowns
        hideAllDropdowns();

        var dropdowns = segment.getElementsByClassName('dropdown-menu');

        //if no dropdown menu has been found then don't do anything
        if(dropdowns.length === 0) return;

        //get the dropdown element
        var dropdown = dropdowns[0];

        //update dropdown items
        updateDropdown(dropdown, selection);

        dropdown.style.display = 'block';
        dropdown.style.top = 'calc(50% + 10px)';
        dropdown.style.left = 'calc(50% - ' + (dropdown.offsetWidth / 2) + 'px)';
        dropdown.className = "dropdown-menu show-groups";

        //we need to detect clicks inside and out of the dropdown
        var removeDropdown = function() {
          dropdown.className = "dropdown-menu";
          dropdown.style.display = 'none';
          document.removeEventListener('click', removeDropdown);
        };

        //stop event propagation
        evt.stopPropagation();

        document.addEventListener('click', removeDropdown);
      }

      function updateDropdown(dropdown, selection) {

        //find the groups that havent been selected
        var unselectedItems = [];

        for(var i = 0; i < scope.chart.availableGroups.length; i++) {
          if(vm.groups.indexOf(scope.chart.availableGroups[i]) === - 1) {
            unselectedItems.push(scope.chart.availableGroups[i]);
          }
        }

        //remove all child elements from the dropdown
        while(dropdown.firstChild) dropdown.removeChild(dropdown.firstChild);

        //if no items are available inform the user
        if(unselectedItems.length === 0) {
          var noItemsLink = document.createElement('a');
          var noItemsGroup = document.createElement('li');

          //set the link text and href
          noItemsLink.innerHTML = scope.chart.noGroupsText;

          noItemsGroup.className = 'disabled';

          //add link to group and group to dropdown
          noItemsGroup.appendChild(noItemsLink);
          dropdown.appendChild(noItemsGroup);
        }

        //function called when a dropdown item is selected
        var dropdownSelect = function(evt) {
          //get the attribute required
          var dropdownItem = evt.target;
          var group = dropdownItem.getAttribute('select-group');

          if(selection && selection === true) {
            addGroup(group);
            return;
          }

          //get elements
          var segment = dropdown.parentNode;
          var segmentGroup = segment.getAttribute('group');
          var segmentLabels = segment.getElementsByClassName('group-name');

          if(segmentLabels.length === 0) return;

          //get the label element
          var segmentLabel = segmentLabels[0];

          //replace item in array
          var index = vm.groups.indexOf(segmentGroup);
          vm.groups[index] = group;

          //now replace the label text and the attribute
          segmentLabel.innerHTML = group;
          segment.setAttribute('group', group);
        };

        //add a li to the dropdown for each group
        for(i = 0; i < unselectedItems.length; i++) {

          //create list element
          var link = document.createElement('a');
          var group = document.createElement('li');

          //set the link text and href
          link.innerHTML = unselectedItems[i];
          link.setAttribute('select-group', unselectedItems[i]);
          link.addEventListener('click', dropdownSelect);

          //add link to group and group to dropdown
          group.appendChild(link);
          dropdown.appendChild(group);
        }
      }

      function hideAllDropdowns() {
        $(element[0]).find('.dropdown-menu').removeClass('show-groups').hide();
      }

      function addGroup(group) {
        vm.groups.push(group);
        updateSegments();
      }

      function updateColors() {
        var segments = getSortedSegments();

        for(var i = 0; i < segments.length; i++) {
          if(segments[i].className === 'selection-segment') continue;

           segments[i].style.backgroundColor = getColor(i);
        }
      }

      function moveSegment(position, callback) {
        //find segments
        var segments = vm.list.getElementsByClassName('segment');

        //remove selected segment from list
        var unselected = [];

        for (var sgmt = 0; sgmt < segments.length; sgmt++) {
          //if the segment is not selected then push it
          if (segments[sgmt] !== vm.selectedSegment) unselected.push(segments[sgmt]);
        }

        //sort the unselected segments based on top position
        unselected.sort(function(a, b) {
          return a.offsetTop - b.offsetTop;
        });

        //insert selected at specified position
        var sorted = [],
          idx = 0;

        for (sgmt = 0; sgmt < segments.length; sgmt++) {
          if (sgmt === position) sorted.push(vm.selectedSegment);
          else {
            sorted.push(unselected[idx]);
            idx++;
          }
        }

        vm.groups = getSortedGroups();

        //recalculate positions based on new order
        for (sgmt = 0; sgmt < segments.length; sgmt++) {
          var segment = sorted[sgmt];

          $(segment).animate({
            top: vm.rowHeight * sgmt
          }, {
            duration: 100,
            queue: false,
            complete: callback
          });
        }
      }

      function removeSegment(evt) {
        var target = evt.target;
        var closeBox = target.parentNode;
        var segment = closeBox.parentNode;

        var group = segment.getAttribute("group");

        //remove group
        var idx = vm.groups.indexOf(group);

        //if not found do nothing
        if(idx === -1) return;

        vm.groups.splice(idx, 1);

        var segments = getSortedSegments();

        var colors = [];

        for(var i = 0; i < segments.length; i++) {
          var sgmt = segments[i];

          //dont do this for selection segment
          if(sgmt.className === 'selection-segment') continue;

          var name = sgmt.getElementsByClassName('group-name')[0].innerHTML;
          var color = sgmt.style.backgroundColor;

          colors.push({ item: name, color: color });
        }

        updateSegments(colors);

        setTimeout(updateColors, 170);
      }

    }
  };
}
