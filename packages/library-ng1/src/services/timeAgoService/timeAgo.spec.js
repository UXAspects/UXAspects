describe('Time Ago Service', function() {
    var timeAgoService;

    var timeUnit = {
        second: 1000,
        minute: 60000,
        hour: 3600000,
        day: 86400000,
        week: 604800000,
        month: 2629743000,
        year: 31536000000
    };

    var defaultStrings = {
        lessThanSecond: 'less than a second ago',
        second: '1 second ago',
        seconds: 'seconds ago',
        minute: '1 minute ago',
        minutes: 'minutes ago',
        hour: '1 hour ago',
        hours: 'hours ago',
        day: '1 day ago',
        days: 'days ago',
        week: '1 week ago',
        weeks: 'weeks ago',
        month: '1 month ago',
        months: 'months ago',
        year: '1 year ago',
        years: 'years ago'
    };

    beforeEach(module("ux-aspects.timeAgoService"));

    beforeEach(inject(function(_timeAgoService_) {
        timeAgoService = _timeAgoService_;
    }));

    describe("time ago service", function() {

      it('should show the correct string for <1 second', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (timeUnit.second - 500));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.lessThanSecond);
      });

      it('should show the correct string for 1 second', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - timeUnit.second);

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.second);
      });

      it('should show the correct string for 5 seconds', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (5 * timeUnit.second));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe('5 ' + defaultStrings.seconds);
      });

      it('should show the correct string for 1 minute', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - timeUnit.minute);

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.minute);
      });

      it('should show the correct string for 5 minutes', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (5 * timeUnit.minute));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe('5 ' + defaultStrings.minutes);
      });

      it('should show the correct string for 1 hour', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - timeUnit.hour);

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.hour);
      });

      it('should show the correct string for 5 hours', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (5 * timeUnit.hour));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe('5 ' + defaultStrings.hours);
      });

      it('should show the correct string for 1 day', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - timeUnit.day);

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.day);
      });

      it('should show the correct string for 5 days', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (5 * timeUnit.day));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe('5 ' + defaultStrings.days);
      });

      it('should show the correct string for 1 week', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - timeUnit.week);

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.week);
      });

      it('should show the correct string for 3 weeks', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (3 * timeUnit.week));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe('3 ' + defaultStrings.weeks);
      });

      it('should show the correct string for 1 month', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - timeUnit.month);

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.month);
      });

      it('should show the correct string for 5 months', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (5 * timeUnit.month));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe('5 ' + defaultStrings.months);
      });

      it('should show the correct string for 1 year', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - timeUnit.year);

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe(defaultStrings.year);
      });

      it('should show the correct string for 5 years', function() {
          var now = new Date().getTime();
          var pastTime = new Date(now - (5 * timeUnit.year));

          var timeString = timeAgoService.timeSinceNow(pastTime);

          expect(timeString).toBe('5 ' + defaultStrings.years);
      });
    });


});
