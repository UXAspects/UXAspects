webpackJsonp([52],{1742:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var a,d=arguments.length,l=d<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,o);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(l=(d<3?a(l):d>3?a(t,n,l):a(t,n))||l);return d>3&&l&&Object.defineProperty(t,n,l),l};Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),d=n(265),l=function(){function e(){this.sampleCode=n(2518),this.htmlCode=n(2516),this.jsCode=n(2517),this.cssCode=n(2515),this.codepen={html:this.htmlCode,js:[this.jsCode],css:[this.cssCode]}}return e}();l=o([a.Component({selector:"uxd-components-file-upload-ng1",template:n(2128)}),d.DocumentationSectionComponent("ComponentsFileUploadNg1Component")],l),t.ComponentsFileUploadNg1Component=l},1743:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var a,d=arguments.length,l=d<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,o);else for(var r=e.length-1;r>=0;r--)(a=e[r])&&(l=(d<3?a(l):d>3?a(t,n,l):a(t,n))||l);return d>3&&l&&Object.defineProperty(t,n,l),l},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)};Object.defineProperty(t,"__esModule",{value:!0});var d=n(0),l=n(19),r=n(266),s=n(144),i=n(267),c=n(1742),p=n(268),u=n(269),h=[c.ComponentsFileUploadNg1Component],b=[{path:"**",component:i.DocumentationCategoryComponent,data:{category:s.ResolverService.resolveCategoryData(s.DocumentationPage.Components,"File Upload")}}],m=function(){function e(e,t){t.registerResolver(e)}return e}();m=o([d.NgModule({imports:[u.WrappersModule,p.TabsModule,r.DocumentationComponentsModule,l.RouterModule.forChild(b)],exports:h,declarations:h,entryComponents:h}),a("design:paramtypes",[d.ComponentFactoryResolver,s.ResolverService])],m),t.ComponentsFileUploadModule=m},2128:function(e,t){e.exports='<uxd-file-upload-wrapper></uxd-file-upload-wrapper>\n\n<hr>\n\n\n<blockquote>\n  <p><strong>Note</strong>: Files will not be uploaded to the server by the demo control. Application teams must implement server\n    code.\n  </p>\n</blockquote>\n\n<p>Angular File Upload provides a control for uploading files. It supports native HTML5 uploads and degrades to an iframe target\n  implementation for legacy browsers.</p>\n\n<p>To create an area where files can be dragged for upload, use the <code>nv-file-drop</code> directive.</p>\n\n<p>If the <code>nv-file-over</code> directive is placed on an element, it will have a class added to it when a file is about\n  to be placed into the drop area. By default this class is <code>nv-file-over</code> but can be set with the parameter attribute\n  <code>over-class="className"</code>.</p>\n\n<p>Alternatively the <code>nv-file-select</code> attribute can be added to an <code>&lt;input type="file"&gt;</code> element\n  to create a button which will open a standard file browsing dialogue.</p>\n\n<p>When creating a control with <code>nv-file-drop</code> or <code>nv-file-select</code>, you must also pass an instance of\n  FileUploader to the uploader attribute. FileUploader at minimum should be instantiated with the url to upload to, but can\n  take additional parameters including formData for POST requests and filters to be applied to files before they are added\n  to the upload queue.</p>\n\n<p>Attributes are defined in the controller: <code>uploader</code> - mandatory, instance of FileUploader.</p>\n\n<uxd-snippet language="javascript" [code]="sampleCode"></uxd-snippet>\n\n<p>The FileUploader object has the following callbacks for adding custom logic:</p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Description</th>\n      </tr>\n      <tr>\n        <td class="attribute">onWhenAddingFileFailed</td>\n        <td>Is called with the parameters <code>(item, filter, options)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onAfterAddingFile</td>\n        <td>Is called with the parameter <code>(item)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onAfterAddingAll</td>\n        <td>Is called with the parameter <code>(addedFileItems)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onBeforeUploadItem</td>\n        <td>Is called with the parameter <code>(item)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onProgressItem</td>\n        <td>Is called with the parameters <code>(item, progress)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onProgressAll</td>\n        <td>Is called with the parameter <code>(progress)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onSuccessItem</td>\n        <td>Is called with the parameters <code>(item, response, status, headers)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onErrorItem</td>\n        <td>Is called with the parameters <code>(item, response, status, headers)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onCancelItem</td>\n        <td>Is called with the parameters <code>(item, response, status, headers)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onCompleteItem</td>\n        <td>Is called with the parameters <code>(item, response, status, headers)</code>.</td>\n      </tr>\n      <tr>\n        <td class="attribute">onSuccessAll</td>\n        <td>Does not take any parameters.</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>Below you can see the methods available on the FileUploader object.</p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Description</th>\n      </tr>\n      <tr>\n        <td class="attribute">addToQueue</td>\n        <td>Adds items to the queue. Takes parameters <code>(files, options, filters)</code> where files is a <code>FileList|File|HTMLInputElement</code>,\n          options is an object and filters is a string.</td>\n      </tr>\n      <tr>\n        <td class="attribute">removeFromQueue</td>\n        <td>Removes an item from the queue. Takes a parameter where the value is a <code>FileItem</code> or index of item.</td>\n      </tr>\n      <tr>\n        <td class="attribute">clearQueue</td>\n        <td>Removes all elements from the queue.</td>\n      </tr>\n      <tr>\n        <td class="attribute">uploadItem</td>\n        <td>Uploads an item. Takes a parameter where the value is a <code>FileItem</code> or index of item.</td>\n      </tr>\n      <tr>\n        <td class="attribute">cancelItem</td>\n        <td>Cancels uploading of item. Takes a parameter where the value is a <code>FileItem</code> or index of item.</td>\n      </tr>\n      <tr>\n        <td class="attribute">uploadAll</td>\n        <td>Uploads all pending items on the queue.</td>\n      </tr>\n      <tr>\n        <td class="attribute">cancelAll</td>\n        <td>Cancels all current uploads.</td>\n      </tr>\n      <tr>\n        <td class="attribute">getNotUploadedItems</td>\n        <td>Returns an array of all pending items on the queue</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>Below is a brief description of the parameters:</p>\n\n<div class="demo-attributes table-responsive">\n  <table class="table">\n    <tbody>\n      <tr>\n        <th>Property</th>\n        <th>Description</th>\n      </tr>\n      <tr>\n        <td class="attribute">item</td>\n        <td>The file to be uploaded.</td>\n      </tr>\n      <tr>\n        <td class="attribute">filter</td>\n        <td>Filters to be applied to the files before adding them to the queue. If the filter returns true the file will be added\n          to the queue.</td>\n      </tr>\n      <tr>\n        <td class="attribute">options</td>\n        <td>Custom properties added to the file uploader.</td>\n      </tr>\n      <tr>\n        <td class="attribute">addedFileItems</td>\n        <td>The list of files to be uploaded.</td>\n      </tr>\n      <tr>\n        <td class="attribute">progress</td>\n        <td>Upload queue progress percentage.</td>\n      </tr>\n      <tr>\n        <td class="attribute">response</td>\n        <td>The response from the server.</td>\n      </tr>\n      <tr>\n        <td class="attribute">status</td>\n        <td>The status code from the server.</td>\n      </tr>\n      <tr>\n        <td class="attribute">headers</td>\n        <td>Headers to be sent along with the files.</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n<p>These callbacks return FileItem objects, which contain the data of your uploaded file. You can then apply your own processing\n  or use the upload method on the FileItem object to send the file to the url you previously set.</p>\n\n<p>If creating a file drop zone, hide the file input with the <code>sr-only</code> class, as this will allow users of assistive\n  technologies to access it via the keyboard.</p>\n\n<p>File upload on click is also available in this drop area by adding the <code>&lt;input type="file"&gt;</code> element. The\n  <code>for</code> attribute of the <code>label</code> should refer to the <code>id</code> of the <code>input</code> element.</p>\n\n<p>Below you can see the sample code used in our example:</p>\n\n<tabset>\n  <tab heading="HTML">\n    <uxd-snippet language="html" [code]="htmlCode"></uxd-snippet>\n  </tab>\n  <tab heading="Javascript">\n    <uxd-snippet language="javascript" [code]="jsCode"></uxd-snippet>    \n  </tab>\n  <tab heading="CSS">\n    <uxd-snippet language="css" [code]="cssCode"></uxd-snippet>    \n  </tab>\n</tabset>\n\n<blockquote>\n  <p>Refer to <a href="https://github.com/nervgh/angular-file-upload/">AngularFileUpload</a> for further details on methods\n    and options available.</p>\n</blockquote>'},2515:function(e,t){e.exports=".file-upload-dropzone {\n  border: 2px dashed rgba(96, 121, 141, 0.8);\n  background: white;\n  font-size: 18px;\n  font-weight: 300;\n  width: 100%;\n  padding-top: 60px;\n  text-align: center;\n  min-height: 150px;\n  color: #676a6c;\n  cursor: pointer;\n}"},2516:function(e,t){e.exports='<div ng-controller="FileUploadCtrl as vm" class="container-fluid">\n    <div class="row">\n        <div class="col-md-12 m-t-md">\n            <div>\n                <label for="file-upload-demo-codepen" nv-file-drop uploader="uploader" class="file-upload-dropzone">\n          Click here or Drag and Drop to upload files\n        </label>\n                <input type="file" id="file-upload-demo-codepen" class="sr-only" nv-file-select uploader="uploader" multiple>\n                <p class="progress-static-text" ng-bind="uploader.progress+\'%\'"></p>\n                <progressbar value="uploader.progress" type="secondary" max="100">\n                </progressbar>\n                <ul ng-if="uploader.queue.length" class="dropzone-queue clearfix">\n                    <li ng-repeat="item in uploader.queue">\n                        <a href="" ng-click="item.remove()">\n                            <span class="facet-selected-name" ng-bind="item.file.name"></span>&nbsp;\n                            <span class="hpe-icon hpe-close"></span>\n                        </a>\n                    </li>\n                </ul>\n                <button type="button" class="btn button-primary" ng-click="uploader.uploadAll()" ng-disabled="!uploader.getNotUploadedItems().length"\n                    disabled="disabled">\n          Upload All\n        </button> &nbsp;\n                <button type="button" class="btn button-secondary" ng-click="uploader.cancelAll()" ng-disabled="!uploader.isUploading" disabled="disabled">\n          Cancel All\n        </button> &nbsp;\n                <button type="button" class="btn button-secondary" ng-click="uploader.clearQueue()" ng-disabled="!uploader.queue.length">\n          Clear All\n        </button>\n            </div>\n        </div>\n    </div>\n</div>'},2517:function(e,t){e.exports="angular.module('app').controller('FileUploadCtrl', ['$scope', 'FileUploader', FileUploadCtrl]);\n\nfunction FileUploadCtrl($scope, FileUploader) {\n  $scope.uploader = new FileUploader();\n}"},2518:function(e,t){e.exports="function FileUploadCtrl($scope, FileUploader) {\n    $scope.uploader = new FileUploader();\n}"}});