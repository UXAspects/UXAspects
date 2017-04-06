infiniteScroll.$inject = ['$parse', '$templateRequest', '$compile', '$timeout', 'safeTimeout', 'safeInterval'];

export default function infiniteScroll($parse, $templateRequest, $compile, $timeout, safeTimeout, safeInterval) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            //initialise properties
            var currentPage = 0;
            var items = [];
            var itemTemplate = null;
            var lastPage = false;
            var loadingIndicator = null,
                loadButton = null;
            var isLoading = false;
            var isInitialised = false;
            var safeIntervalInstance = safeInterval.create(scope);
            var body = angular.element('body');
            var win = angular.element(window);

            //get the evaluated attributes from the element - prevent isolating scope
            var pageSize = +$parse(attrs.pageSize)(scope);
            var pageFn = $parse(attrs.pageFn)(scope);
            var pagePosition = attrs.pagePosition ? +$parse(attrs.pagePosition)(scope) : 85;
            var containerId = attrs.containerId ? $parse(attrs.containerId)(scope) : null;
            var itemTemplateUrl = $parse(attrs.itemTemplate)(scope);
            var itemApi = attrs.itemApi ? $parse(attrs.itemApi)(scope) : null;
            var showLoading = attrs.showLoading ? $parse(attrs.showLoading)(scope) : true;
            var searchQuery = $parse(attrs.searchQuery)(scope);
            var scrollBarConfig = $parse(attrs.scrollConfig)(scope);

            //allow option to use window scroll rather than div
            var windowScroll = attrs.windowScroll ? $parse(attrs.windowScroll)(scope) : false;

            //load more button
            var defaultLoadButtonOptions = {
                show: false,
                text: 'Load More',
                class: ''
            };

            var loadButtonOptions = defaultLoadButtonOptions;

            if (attrs.loadMoreButton) {
                var value = $parse(attrs.loadMoreButton)(scope);
                loadButtonOptions = angular.extend(defaultLoadButtonOptions, value);
            }

            //detect whether this is on a normal scrollbar or a jscrollpane
            var jScrollPane = attrs.scrollPane === '';

            //load the template
            var templateLoaded = $templateRequest(itemTemplateUrl);

            //wait for promise to be resolved (template has been loaded)
            templateLoaded.then(function (template) {
                //store the item template
                itemTemplate = template;

                //load the first page
                loadPage();
            });

            //perform search when search query changes
            scope.$watch(attrs.searchQuery, function (nv, ov) {
                if (nv !== ov) {
                    //store the new search query
                    searchQuery = nv;

                    //remove all previous list items
                    getContainer().empty();

                    //set the page back to zero
                    currentPage = 0;
                    isLoading = false;

                    //load the next page
                    loadPage();
                }
            });

            //allow jScrollPane to initialise
            $timeout(bindToScroll);

            function showLoadingIndicator() {

                //if option specified not to show indicator then stop here
                if (!showLoading) return;

                //if no loading indicator has been created then make one
                if (!loadingIndicator) {
                    //create spinner container
                    loadingIndicator = document.createElement('div');
                    loadingIndicator.className = 'infinite-scroll-loading';

                    //create spinner
                    var spinner = document.createElement('div');
                    spinner.className = 'spinner spinner-accent spinner-bounce-middle';

                    var spinnerText = document.createElement('span');
                    spinnerText.className = 'spinner-text';
                    spinnerText.innerHTML = "Loading...";

                    //add spinner to container
                    loadingIndicator.appendChild(spinner);
                    loadingIndicator.appendChild(spinnerText);
                }

                //add loading indicator to bottom of container
                getContainer().append(loadingIndicator);
            }

            function showLoadingButton() {
                //if no button should be shown then stop here - or if we are on the last page then no more to load
                if (!loadButtonOptions || !loadButtonOptions.show || lastPage) return;

                //create element if one does not already exist
                if (!loadButton) {
                    //create the element
                    loadButton = angular.element('<div class="infinite-scroll-load-button ' + loadButtonOptions.class + '"><p class="load-button-text">' + loadButtonOptions.text + '</p></div>');

                    //add click event - use angular as it is easier to unit test
                    loadButton.click(function () {
                        //remove the button from the dom
                        loadButton.remove();

                        //remove any references to load button
                        loadButton = null;

                        //load the next page
                        loadNextPage();

                        //scrol to bottom of the div
                        scrollToBottom();
                    });
                }

                //add button to container
                getContainer().append(loadButton);
            }

            function hideLoadingIndicator() {
                //remove loading indicator from the container
                getContainer().find('.infinite-scroll-loading').remove();
            }

            function bindToScroll() {

                //if we want to use a loading button instead we dont need to bind to scroll
                if (loadButtonOptions && loadButtonOptions.show) return;

                //if we are should use window scrolling
                if (windowScroll === true) {

                    win.scroll(function () {
                        //dont do anything if we are loading
                        if (isLoading) return;

                        //calculate the percentage value from scrolled
                        var scrollPosition = win.scrollTop() + win.height();
                        var scrollHeight = body.innerHeight();
                        var scrolledPercentage = (scrollPosition / scrollHeight) * 100;

                        //we we are near the bottom of the list then begin loading the next page
                        if (scrolledPercentage > pagePosition) loadNextPage();
                    });

                } else if (jScrollPane) {

                    element.on('jsp-scroll-y', function () {
                        //dont do anything if we are loading
                        if (isLoading) return;

                        //get the jscrollpane data
                        var scrolledPercentage = element.data('jsp').getPercentScrolledY() * 100;

                        //we we are near the bottom of the list then begin loading the next page
                        if (scrolledPercentage > pagePosition) loadNextPage();
                    });
                } else {
                    element.scroll(function () {
                        //dont do anything if we are loading
                        if (isLoading) return;

                        //calculate the percentage value from scrolled
                        var scrollPosition = element.scrollTop() + element.innerHeight();
                        var scrollHeight = element.get(0).scrollHeight;
                        var scrolledPercentage = (scrollPosition / scrollHeight) * 100;

                        //we we are near the bottom of the list then begin loading the next page
                        if (scrolledPercentage > pagePosition) loadNextPage();

                    });
                }

                //ensure enough items are visible to show a scrollbar

                // if we are running in Angular 2 and ngZone is globally available then run outside of ngZone
                if(window.ngZone) {
                    window.ngZone.runOutsideAngular(ensureScrollable);
                } else {
                    ensureScrollable();
                }
            }

            function loadNextPage() {
                currentPage++;
                loadPage();
            }

            function loadPage() {

                //store loading state
                isLoading = true;

                //show loading indicator
                showLoadingIndicator();

                //Save the search query for this request to make sure that only the active query response is loaded
                var thisSearchQuery = searchQuery;

                //call the specified paging function
                var results = pageFn(currentPage, pageSize, thisSearchQuery);

                //if results is a promise wait until it is solved
                if (results.then) {
                    results.then(
                        function (newItems) {
                            // Only load the active query
                            // (Multiple requests may be active at once so avoid combining them)
                            if (searchQuery === thisSearchQuery) {
                                processItems(newItems);
                            }
                        },
                        function () {
                            //if request fails reset properties
                            isLoading = false;
                            hideLoadingIndicator();
                            lastPage = true;
                        });
                } else
                    processItems(results);
            }

            function processItems(newItems) {
                //hide loading indicator if there was one
                hideLoadingIndicator();

                //check if the number of items returned is less than expected - if so then it is the last page
                if (!newItems || newItems.length < pageSize) lastPage = true;

                //if the items was null or empty dont render new results
                if (!newItems || newItems.length === 0) return;

                //append the new items to the list
                for (var i = 0; i < newItems.length; i++) items.push(newItems[i]);

                //render the new items
                renderItems(newItems);

                // Mark that it's run at least once
                isInitialised = true;
            }

            function renderItems(newItems) {

                //get the container element
                var container = getContainer();

                for (var i = 0; i < newItems.length; i++) {
                    var item = newItems[i];

                    //create new scope with data as item data
                    var itemScope = scope.$new();
                    itemScope.data = item;
                    itemScope.api = itemApi;

                    //compile and append item
                    var compiledItem = $compile(itemTemplate)(itemScope);
                    container.append(compiledItem);
                }

                //depending on when the rendering is occuring we likely need to manually start a digest
                if (scope.$root.$$phase === null) scope.$digest();

                // if the scroll is a jScrollPane, then timeout for longer than the autoReinitialiseDelay to ensure the paging isn't done twice
                if (jScrollPane) {
                    var safeTimeoutInstance = safeTimeout.create(scope);

                    var delay = angular.isDefined(scrollBarConfig.autoReinitialiseDelay) ? scrollBarConfig.autoReinitialiseDelay + 10 : 1000;
                    safeTimeoutInstance.timeout(function () {
                        isLoading = false;
                    }, delay);
                } else
                    isLoading = false;

                //show load more button (if required)
                showLoadingButton();
            }

            function getContainer() {

                //if no container was specified then just return the element
                if (containerId === null) return element;

                return angular.element(element.find('[infinite-scroll-container="' + containerId + '"]').get(0));
            }

            function ensureScrollable() {
                // Checking for a scrollbar should only happen when the jscrollpane is visible and initialised
                // jspInitialised is true only when the element is visible and jsp init is complete
                var jspInitialised;
                if (jScrollPane) {
                    element.bind("jsp-initialised", function() {
                        jspInitialised = true;
                    });
                }

                //if we are using a load more button this is also not required
                if (loadButtonOptions && loadButtonOptions.show) return;

                //we need to constantly check that a scrollbar is visible and if not then load more until there is
                safeIntervalInstance.interval(function () {
                    //if we are currently loading then we should wait until we arent - if last page then no more to load
                    if (!isInitialised || isLoading || lastPage) return;

                    if (windowScroll) {
                        //if a window scrollbar is not visible then load the next page
                        if (body.height() <= win.height()) loadNextPage();
                    } else if (jScrollPane) {
                        // If the element has lost visibility then wait for it to become initialised again
                        if (!element.is(":visible")) jspInitialised = false;
                        if (jspInitialised) {
                            var scrollbarVisible = element.data('jsp').getIsScrollableV();

                            //if a scrollbar is not visible then load the next page
                            if (!scrollbarVisible) loadNextPage();
                        }
                    } else {
                        //if a scrollbar is not visible then load the next page
                        if (element.get(0).clientHeight !== 0 && element.get(0).scrollHeight <= element.get(0).clientHeight) loadNextPage();
                    }
                }, 100, 0, false);
            }

            function scrollToBottom() {
                if (jScrollPane) element.data('jsp').scrollToPercentY(100, false);
                else element.scrollTop(element[0].scrollHeight);
            }
        }
    };
}