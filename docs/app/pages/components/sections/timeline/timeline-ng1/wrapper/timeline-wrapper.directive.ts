angular.module('app').directive('uxdTimelineWrapper', () => {
    return {
        restrict: 'E',
        template: require('./timeline-wrapper.directive.html'),
        controller: 'TimelineCtrl as vm'
    };
});

angular.module('app').controller('TimelineCtrl', TimelineCtrl);

function TimelineCtrl() {

    var vm = this;

    vm.events = [{
      badgeClass: 'accent',
      title: 'First heading',
      badgeTitle: 'Jan 31',
      when: 'Jan 31st via Twitter',
      content: 'This is an accent class.',
      contentHtml: '<a class="hyperlink" href="#/">Load page</a>',
    }, {
      badgeClass: 'success',
      title: 'Second heading',
      badgeTitle: 'Jan 30',
      when: 'Jan 30th via Twitter',
      content: 'This is a success class.'
    }, {
      badgeClass: 'warning',
      title: 'Third heading',
      badgeTitle: 'Jan 29',
      when: 'Jan 29th via Twitter',
      content: 'This is a warning class.'
    }, {
      badgeClass: 'critical',
      title: 'Fourth heading',
      badgeTitle: 'Jan 28',
      when: 'Jan 28th via Twitter',
      content: 'This is a critical class.'
    }];
    vm.index = 0;
    vm.addEvent = function () {
      vm.index++;
      var badgeClass = 'primary';
      var day = 28;
      if (vm.index < 28) {
           day = vm.index;
      }
      var suffix = 'th';
      if (day === 1 || day === 21) {
        suffix = 'st';
      } 
      if (day === 2 || day === 22) {
          suffix = 'nd';
      }
      if (day === 3 || day === 23) {
          suffix = 'rd';
      }
      vm.events.unshift({
        badgeClass: badgeClass,
        badgeTitle: 'Feb ' + day,
        title: 'New Event - ' + vm.index,
        when: 'Feb ' + day + suffix + ' via Twitter',
        content: 'Lorem ipsum dolor sit amet, charetra varius quam sit amet vulputate.'
      });

    };

  }