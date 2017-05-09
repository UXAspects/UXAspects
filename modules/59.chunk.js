webpackJsonp([59],{1696:function(n,e,t){"use strict";var a=this&&this.__decorate||function(n,e,t,a){var o,r=arguments.length,i=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,e,t,a);else for(var c=n.length-1;c>=0;c--)(o=n[c])&&(i=(r<3?o(i):r>3?o(e,t,i):o(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i};Object.defineProperty(e,"__esModule",{value:!0});var o=t(0),r=t(259),i=function(){function n(){this.htmlCode=t(2425),this.jsCode=t(2426),this.codepen={html:this.htmlCode,htmlAttributes:{"ng-controller":"HierarchyBarDemoCtrl as vm"},js:[this.jsCode]}}return n}();i=a([o.Component({selector:"uxd-components-hierarchy-bar-ng1",template:t(2038)}),r.DocumentationSectionComponent("ComponentsHierarchyBarNg1Component")],i),e.ComponentsHierarchyBarNg1Component=i},1697:function(n,e,t){"use strict";var a=this&&this.__decorate||function(n,e,t,a){var o,r=arguments.length,i=r<3?e:null===a?a=Object.getOwnPropertyDescriptor(e,t):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(n,e,t,a);else for(var c=n.length-1;c>=0;c--)(o=n[c])&&(i=(r<3?o(i):r>3?o(e,t,i):o(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i},o=this&&this.__metadata||function(n,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(n,e)};Object.defineProperty(e,"__esModule",{value:!0});var r=t(0),i=t(18),c=t(260),d=t(140),s=t(261),h=t(1696),l=t(263),m=t(262),p=[h.ComponentsHierarchyBarNg1Component],u=[{path:"**",component:s.DocumentationCategoryComponent,data:{category:d.ResolverService.resolveCategoryData(d.DocumentationPage.Components,"Hierarchy Bar")}}],b=function(){function n(n,e){e.registerResolver(n)}return n}();b=a([r.NgModule({imports:[l.WrappersModule,m.TabsModule,c.DocumentationComponentsModule,i.RouterModule.forChild(u)],exports:p,declarations:p,entryComponents:p}),o("design:paramtypes",[r.ComponentFactoryResolver,d.ResolverService])],b),e.ComponentsHierarchyBarModule=b},2038:function(n,e){n.exports='<uxd-hierarchy-bar-wrapper></uxd-hierarchy-bar-wrapper>\n\n<hr>\n\n<p>Hierarchy Bar defines a hierarchy of nodes in any component which are contained inside a <code>hierarchy-bar</code> element.\n    The popover in the hierarchy bar lists the child nodes and when clicked will highlight that node.</p>\n\n<tabset>\n    <tab heading="HTML">\n        <uxd-snippet language="html" [code]="htmlCode"></uxd-snippet>\n    </tab>\n\n    <tab heading="Javascript">\n        <uxd-snippet language="javascript" [code]="jsCode"></uxd-snippet>\n    </tab>\n</tabset>\n\n<p>A <code>hierarchy-bar</code> element has the following attributes:</p>\n\n<div class="demo-attributes table-responsive">\n    <table class="table m-t">\n        <tbody>\n            <tr>\n                <th>Property</th>\n                <th>Type</th>\n                <th>Binding</th>\n                <th>Description</th>\n                <th>Optional</th>\n            </tr>\n            <tr>\n                <td class="attribute">data</td>\n                <td>array of objects</td>\n                <td>variable</td>\n                <td>The data the hierarchy bar should display. This array of objects contains a node and its parent and can contain\n                    any properties, however all possible child items should be listed in an array under a <code>children</code>                    property. The first item in the array should be the root node with the selected child node as the next\n                    item in the array.</td>\n                <td>false</td>\n            </tr>\n            <tr>\n                <td class="attribute">options</td>\n                <td>object</td>\n                <td>variable</td>\n                <td>Allows you to configure the appearance and behavior of the hierarchy bar. All available options can be found\n                    in the table below.</td>\n                <td>false</td>\n            </tr>\n            <tr>\n                <td class="attribute">select-node</td>\n                <td>function</td>\n                <td>variable</td>\n                <td>A function expression with parameters (function signature is sufficient) which is called when a hierarchy\n                    item (node) in the hierarchy bar is clicked. This could be used to update the hierarchy bar or perform\n                    actions on the element.</td>\n                <td>false</td>\n            </tr>\n            <tr>\n                <td class="attribute">container-class</td>\n                <td>string</td>\n                <td>literal</td>\n                <td>Provides the container class name. The hierarchy bar will clip/overflow based on the container dimensions\n                    (re-size).\n                </td>\n                <td>true</td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n<h4 id="hierarchybar-options">HierarchyBar Options</h4>\n\n<div class="demo-attributes table-responsive">\n    <table class="table">\n        <tbody>\n            <tr>\n                <th>Property</th>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n\n            <tr>\n                <td class="attribute">enabled</td>\n                <td>boolean</td>\n                <td>Specifies whether or not the hierarchy bar will be shown (default: true).</td>\n            </tr>\n\n            <tr>\n                <td class="attribute">overview</td>\n                <td>function</td>\n                <td>If specified, a button on the left of the hierarchy bar will be shown. When clicked this function will be\n                    called. The purpose of this would be to allow you to present more information regarding the tree or a\n                    list of all items in the chart.</td>\n            </tr>\n\n\n            <tr>\n                <td class="attribute">image</td>\n                <td>function</td>\n                <td>If specified, this function will be called and passed a node. It should return the url to an image if one\n                    should be shown beside the hierarchy bar.</td>\n            </tr>\n\n            <tr>\n                <td class="attribute">valueFormatter</td>\n                <td>function</td>\n                <td>If specified, this function will be called and passed a node. It should return the text to display in the\n                    hierarchy bar. By default it looks for a <code>name</code> property.</td>\n            </tr>\n\n        </tbody>\n    </table>\n</div>\n\n<h4 id="action">Action</h4>\n\n<div class="demo-attributes table-responsive">\n    <table class="table">\n        <tbody>\n            <tr>\n                <th>Property</th>\n                <th>Type</th>\n                <th>Description</th>\n            </tr>\n\n            <tr>\n                <td class="attribute">title</td>\n                <td>string</td>\n                <td>Text to display along side the activity indicator displayed when data is loading.</td>\n            </tr>\n\n            <tr>\n                <td class="attribute">event</td>\n                <td>function</td>\n                <td>A function that is called when an arrow is clicked. It will be passed the associated breadcrumb as a parameter.\n                    To display a loading indicator in the dropdown have the function return a <code>$q.defer().promise</code>.\n                    The loading indicator will be displayed until the promise is resolved.</td>\n            </tr>\n\n        </tbody>\n    </table>\n</div>\n\n\n<blockquote>\n    <p>\n        <strong>Note</strong>: Refer to the <a routerLink="/charts/organization-chart" fragment="organization-chart-ng1">Organization Chart</a> page for an example of the hierarchy bar with popovers on top of the chart.\n    </p>\n</blockquote>'},2425:function(n,e){n.exports='<hierarchy-bar data="vm.breadcrumbs" options="vm.options" select-node="vm.selectBreadcrumb"></hierarchy-bar>'},2426:function(n,e){n.exports="angular.module('app').controller('HierarchyBarDemoCtrl', HierarchyBarDemoCtrl);\n\nHierarchyBarDemoCtrl.$inject = [\"$q\", \"$timeout\"];\n\nfunction HierarchyBarDemoCtrl($q, $timeout) {\n    var vm = this;\n\n    var adminIcon = \"https://uxaspects.github.io/UXAspects/assets/img/IconManagerColorized.png\";\n    var userIcon = \"https://uxaspects.github.io/UXAspects/assets/img/IconCustodianColorized.png\";\n\n    vm.options = {\n        image: function (data) {\n            return data.image;\n        },\n        action: {\n            title: \"Loading\",\n            event: function (crumb) {\n                if (crumb.children) {\n                    return;\n                }\n\n                var defer = $q.defer();\n\n                $timeout(function () {\n                    crumb.children = [{\n                        name: chance.name(),\n                        position: 'Intern',\n                        phone: chance.phone(),\n                        email: 'intern@company.com',\n                        image: adminIcon\n                    }, {\n                        name: chance.name(),\n                        position: 'Intern',\n                        phone: chance.phone(),\n                        email: 'intern@company.com',\n                        image: adminIcon\n                    }, {\n                        name: chance.name(),\n                        position: 'Intern',\n                        phone: chance.phone(),\n                        email: 'intern@company.com',\n                        image: adminIcon\n                    }];\n\n                    addNodeParentRefs(crumb);\n\n                    defer.resolve();\n\n                }, 2000);\n\n                return defer.promise;\n            }\n        }\n    };\n\n    vm.breadcrumbs = {\n        name: chance.name(),\n        position: 'National Manager',\n        phone: chance.phone(),\n        email: 'nat_manager@company.com',\n        image: adminIcon,\n        children: [{\n            name: chance.name(),\n            position: 'Regional Manager',\n            phone: chance.phone(),\n            email: 'reg_manager@company.com',\n            image: adminIcon,\n            children: [{\n                name: chance.name(),\n                position: 'Assistant',\n                phone: chance.phone(),\n                email: 'assistant@company.com',\n                image: adminIcon,\n                children: [{\n                    name: chance.name(),\n                    position: 'Human Resources',\n                    phone: chance.phone(),\n                    email: 'hr@company.com',\n                    image: userIcon\n                }, {\n                    name: chance.name(),\n                    position: 'Engineer',\n                    phone: chance.phone(),\n                    email: 'tech@company.com',\n                    image: userIcon\n                }, {\n                    name: chance.name(),\n                    position: 'Quality Assurance',\n                    phone: chance.phone(),\n                    email: 'qa@company.com',\n                    image: userIcon\n                }]\n            }, {\n                name: chance.name(),\n                position: 'Manager',\n                phone: chance.phone(),\n                email: 'manager@company.com',\n                active: true,\n                image: userIcon,\n                children: [{\n                    name: chance.name(),\n                    position: 'Sales',\n                    phone: chance.phone(),\n                    email: 'sales1@company.com',\n                    image: userIcon\n                }, {\n                    name: chance.name(),\n                    position: 'Office Administrator',\n                    phone: chance.phone(),\n                    email: 'office_admin@company.com',\n                    image: userIcon,\n                    children: [{\n                        name: chance.name(),\n                        position: 'Receptionist',\n                        phone: chance.phone(),\n                        email: 'reception@company.com',\n                        image: userIcon\n                    }]\n                }, {\n                    name: chance.name(),\n                    position: 'Sales',\n                    phone: chance.phone(),\n                    email: 'sales2@company.com',\n                    image: userIcon\n                }]\n            }, {\n                name: chance.name(),\n                position: 'Head of Accounting',\n                phone: chance.phone(),\n                email: 'head_accounting@company.com',\n                image: userIcon,\n                children: [{\n                    name: chance.name(),\n                    position: 'Accountant',\n                    phone: chance.phone(),\n                    email: 'accountant1@company.com',\n                    image: userIcon\n                }, {\n                    name: chance.name(),\n                    position: 'Accountant',\n                    phone: chance.phone(),\n                    email: 'accountant2@company.com',\n                    image: userIcon\n                }]\n            }]\n        }]\n    };\n\n    // add references to parent nodes\n    addNodeParentRefs();\n\n    function addNodeParentRefs(node, parent) {\n\n        if (!node) {\n            node = vm.breadcrumbs;\n        }\n\n        // if there is a parent then add reference to it\n        if (parent) {\n            node.parent = parent;\n        }\n\n        // get node children\n        var children = node.children || node._children;\n\n        // check if there are children\n        if (!children || children.length === 0) {\n            return;\n        }\n\n        // loop through each child and get its children\n        for (var idx = 0; idx < children.length; idx++) {\n\n            var child = children[idx];\n\n            addNodeParentRefs(child, node);\n        }\n    }\n\n    vm.selectBreadcrumb = function (data) {\n\n        // reset the breadcrumb list\n        vm.breadcrumbs = [];\n\n        // ensure a node is selected\n        if (!data) {\n            return;\n        }\n\n        // get the current node\n        var node = data;\n\n        // add the current node to the list\n        vm.breadcrumbs.push(node);\n\n        // add all its parents\n        while (node.parent) {\n\n            // set node to reference its parent\n            node = node.parent;\n\n            // add this node to the list\n            vm.breadcrumbs.push(node);\n        }\n\n        // reverse the array to get the desired order\n        vm.breadcrumbs.reverse();\n    };\n\n    vm.selectBreadcrumb(vm.breadcrumbs);\n\n}"}});