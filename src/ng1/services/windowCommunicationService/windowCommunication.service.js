WindowCommunicationService.$inject = ['$compile', '$templateRequest', '$document', '$window'];

export default function WindowCommunicationService($compile, $templateRequest, $document, $window) {
    var vm = this;

    var newWindow;

    vm.createWindow = function(windowTitle, scope, url, winWidth, winHeight, winX, winY) {
        var width = winWidth === undefined ? screen.width - 200 : winWidth;
        var height = winHeight === undefined ? screen.height - 400 : winHeight;
        var left = winX === undefined ? screen.width / 2 - width / 2 + FindLeftWindowBoundry() : winX;
        var top = winY === undefined ? screen.height / 2 - height / 2 + FindTopWindowBoundry() : winY;
        vm.childScope = scope.$new();

        // html for the head and body of the new window
        var html = '<!DOCTYPE html>' +
            '<html style="overflow: auto">' +
            '<head>' +
            '  <meta charset="utf-8">' +
            '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
            '  <meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
            '</head>' +
            '<body class="preview-pane-window-contents">' +
            '</body>' +
            '</html>';

        // get the links and scripts required for the new window
        var links = angular.element($document).find('link');
        var scripts = angular.element($document).find('script');

        // load the preview pane template
        var promise = $templateRequest(url);

        // open a new blank window approximately in the centre of the screen
        newWindow = $window.open('about:blank', windowTitle, 'height=' + height + ',width=' + width + ',left=' + left + ',top=' + top + ",location=no");

        promise.then(function(template) {
            // prepare the new window with the html head and body
            newWindow.document.write(html);
            newWindow.document.title = windowTitle;

            var window_head = newWindow.document.head;
            var window_body = newWindow.document.body;

            // add required links to head
            links.each(function(idx, link) {
                window_head.innerHTML += link.outerHTML;
            });

            // add template to body
            window_body.innerHTML += template;

            // add required scripts to body
            scripts.each(function(idx, script) {
                window_body.innerHTML += script.outerHTML;
            });

            // compile the new window against the scope we passed in
            $compile(newWindow.document)(vm.childScope);

            newWindow.onbeforeunload = function() {
                vm.childScope.$destroy();
            };

        });

        return newWindow;
    };


    // if url has changed to show a different page, call this method to update to window to show the new content
    vm.updateContent = function(scope, url) {
        var promise = $templateRequest(url);

        // destroy previous childScope and create a new one for the new scope
        vm.childScope.$destroy();
        vm.childScope = scope.$new();

        promise.then(function(template) {
            angular.element(newWindow.document.body).contents().not("script").remove();
            newWindow.document.body.innerHTML += template;
            $compile(newWindow.document)(vm.childScope);

            newWindow.onbeforeunload = function() {
                vm.childScope.$destroy();
            };
        });
    };

}

function FindLeftWindowBoundry() {
    // In Internet Explorer window.screenLeft is the window's left boundry
    if (window.screenLeft) {
        return window.screenLeft;
    }

    // In Firefox window.screenX is the window's left boundry
    if (window.screenX)
        return window.screenX;

    return 0;
}
// Find Left Boundry of current Window
function FindTopWindowBoundry() {
    // In Internet Explorer window.screenLeft is the window's top boundry
    if (window.screenTop) {
        return window.screenTop;
    }

    // In Firefox window.screenY is the window's top boundry
    if (window.screenY)
        return window.screenY;

    return 0;
}