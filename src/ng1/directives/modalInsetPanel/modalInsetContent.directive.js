modalInsetContent.$inject = ['$parse', '$compile', '$templateCache', '$templateRequest'];

export default function modalInsetContent($parse, $compile, $templateCache, $templateRequest) {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div class="modal-panel-content"></div>',
        link: function (scope, element, attrs, controllers, transclude) {

            var template = attrs.panelTemplate ? $parse(attrs.panelTemplate)(scope.$parent) : null;

            //if we have a template specified - dont transclude - load template then insert
            if (template !== null) {

                //watch for the template changing
                scope.$watch(function () {
                    return $parse(attrs.panelTemplate)(scope.$parent);
                }, function (nv, ov) {
                    if (nv === ov) return;

                    //if the new template is an empty string just empty contents
                    if (nv.trim() === '') {
                        element.empty();
                        return;
                    }

                    //load and render new template
                    getTemplate(nv, function (tpl) {
                        renderTemplate(tpl);
                    });

                });

                //if the template is an empty string then empty element
                if (template.trim() === '') {
                    element.empty();
                    return;
                }

                //load and render template
                getTemplate(template, function (tpl) {
                    renderTemplate(tpl);
                });

            } else {
                //if no template specified perform manually transclusion to provide the appropriate scope after transclusion
                transclude(scope.$parent, function (clone) {
                    element.append(clone);
                });
            }


            function getTemplate(url, callback) {

                //check if template was cached
                var cachedTemplate = $templateCache.get(url);

                if (cachedTemplate) {
                    //call back with the template
                    callback(cachedTemplate);
                    return;
                }

                //create request to load template
                var request = $templateRequest(url);

                //once request has completed compile and append
                request.then(function (result) {

                    //cache the template for future use
                    $templateCache.put(url, result);

                    //call back with the template
                    callback(result);
                });
            }

            function renderTemplate(template) {

                //compile the template with the parent scope
                var compiledTemplate = $compile(template)(scope.$parent);

                //remove any current contents
                element.empty();

                //append compiled element
                element.append(compiledTemplate);
            }
        }
    };
}