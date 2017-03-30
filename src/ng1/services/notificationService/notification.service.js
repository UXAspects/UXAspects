export default function NotificationService() {
    var vm = this;

    vm.notifications = [];
    vm.notificationsVisible = true;

    /*
      Public Functions
    */
    vm.showNotification = function(options) {

        var defaultOptions = {
            icon: '',
            title: '',
            text: '',
            duration: 4000,
            backgroundColor: '#60798D',
            subtitle: '',
            date: new Date()
        };

        //generate complete list of options from user defined options
        options = angular.extend(defaultOptions, options);

        //store the notification details
        vm.notifications.push(options);

        //if notifications should not be visibly shown - stop here
        if (vm.notificationsVisible === false) return;

        //this is a wrapper function used to maintain correct scope
        return showNotification.apply(vm, [options]);
    };

    vm.setNotificationVisibility = function(value) {
        vm.notificationsVisible = value;
    };

    vm.dismissNotification = function(notification) {
        dismissNotification.apply(vm, [notification]);
    };

    vm.dismissAllNotifications = function() {
        var container = getContainer();

        //get any notifications
        var notifications = container.getElementsByClassName('notification');

        //iterate and dismiss each notification
        for (var i = 0; i < notifications.length; i++) {

            //get the appropriate notification
            var notification = notifications[i];

            //ensure it is not currently being dismissed
            if (notification.className.indexOf('fadeOutNotification'))
                dismissNotification.apply(vm, [notification]);
        }
    };

    vm.getNotifications = function() {
        return vm.notifications;
    };

    /*
      Private Function
    */

    function createContainer() {
        /*
          This function will create a container in the top right corner of the browser window,
          if one does not already exist, to correctly position any notifications
        */
        var container = document.getElementsByClassName('notification-container');

        //if container exists - no need to proceed
        if (container && container.length === 1) return;

        //otherwise create the container
        container = document.createElement('div');

        //give the container the correct id
        container.className = 'notification-container';

        //add the container to the page
        document.body.appendChild(container);

        //return the newly created container element
        return container;
    }

    function getContainer() {
        /*
          This function will get the container if one exists,
          if one does not exist then create one
        */

        var container = document.getElementsByClassName('notification-container');

        //if container exists then return the element
        if (container && container.length === 1) return container[0];

        //if no container exists create and return the element
        return createContainer();
    }

    function showNotification(options) {
        /*
          This will allow adding of a new notification to the container,
          It should set the icon, the text, the duration and the color
        */

        var notification = document.createElement('div');
        notification.className = 'notification';

        //create close button
        var closeBtn = document.createElement('div');
        closeBtn.className = 'dismiss';

        //add close event handler
        closeBtn.addEventListener('click', function(event) {
            dismissNotification.apply(vm, [event.currentTarget.parentElement]);
        });

        //close icon
        var closeIcon = document.createElement('div');
        closeIcon.className = 'hpe-icon hpe-close';

        //add close icon to button and button to notification
        closeBtn.appendChild(closeIcon);
        notification.appendChild(closeBtn);

        //create container for icon and text
        var contentContainer = document.createElement('div');
        contentContainer.className = 'notification-content';

        //create icon container
        var iconContainer = document.createElement('div');
        iconContainer.className = 'notification-icon';

        //add icon to icon container
        var iconElement = document.createElement('span');
        iconElement.className = 'hpe-icon ' + options.icon;
        iconContainer.appendChild(iconElement);

        //create text container
        var textContainer = document.createElement('div');
        textContainer.className = 'notification-text';

        //add title to container if specified
        if (options.title && options.title !== '') {
            var titleElement = document.createElement('p');
            titleElement.className = 'notification-title';
            titleElement.innerHTML = options.title;
            textContainer.appendChild(titleElement);
        }

        //add text to text container
        var textElement = document.createElement('p');
        textElement.className = 'notification-label';
        textElement.innerHTML = options.text;
        textContainer.appendChild(textElement);

        //if a date string was specified then show it
        if (options.subtitle && options.subtitle !== '') {
            var subtitleElement = document.createElement('small');
            subtitleElement.className = 'notification-subtitle';
            subtitleElement.innerHTML = options.subtitle;
            textContainer.appendChild(subtitleElement);
        }

        //add containers to correct parent
        if (options.icon !== '') contentContainer.appendChild(iconContainer);
        else textContainer.style.paddingLeft = '15px';

        contentContainer.appendChild(textContainer);
        notification.appendChild(contentContainer);

        //find or create the container
        var container = getContainer();

        //add the element to the container
        container.appendChild(notification);

        //once the element has been added - add the animation class
        notification.className = 'notification fadeInNotification';

        //set the background color of the notification
        notification.style.backgroundColor = options.backgroundColor;

        //if a duration was set then automatically dismiss after that time
        if (options.duration && options.duration > 0) {
            setTimeout(function() {

                //ensure the element still exists
                if (notification) dismissNotification.apply(vm, [notification]);

            }, options.duration);
        }

        return notification;
    }

    function dismissNotification(notification) {

        //apply fade out animation
        notification.className = 'notification fadeOutNotification';

        //delay for 700ms (animation length) - then remove dom element
        setTimeout(function() {
            //ensure element still exists before trying to remove
            if (notification && notification.parentElement) notification.parentElement.removeChild(notification);
        }, 700);
    }

    return vm;
}