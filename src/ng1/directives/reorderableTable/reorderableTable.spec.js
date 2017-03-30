describe('reorderable table', function() {
    var $compile, $rootScope, $scope, $timeout;
    var vm = {};
    var element, table_body;

    beforeEach(module("ux-aspects.reorderableTable"));
    beforeEach(module("ux-aspects.safeTimeout"));
    beforeEach(module('ux-aspects.safeEventListener'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$timeout_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        $scope = $rootScope.$new();
    }));

    describe("reorderable table directive", function() {

        beforeEach(function() {
            vm = {};

            // create an array of documents
            vm.documents = [{
                name: 'Document 1',
                author: 'James Gray',
                location: 'Unknown or Invalid Region',
                available: true
            }, {
                name: 'Document 2',
                author: 'Mary Ingram',
                location: 'People\'s Democratic Republic of Yemen',
                available: false
            }, {
                name: 'Document 3',
                author: 'Teresa Reese',
                location: 'Bahamas',
                available: true
            }, {
                name: 'Document 4',
                author: 'Lawrence Santiago',
                location: 'Panama',
                available: false
            }, {
                name: 'Document 5',
                author: 'Randall Logan',
                location: 'Brunei',
                available: true
            }];

            vm.removeRow = function(document) {

                // find the index of the document
                var index = vm.documents.indexOf(document);

                // remove the item from the list
                vm.documents.splice(index, 1);
            };

            vm.on_reorder = function() {
                // perform actions here
            };

            vm.on_reorder_complete = function() {
                // perform actions here
            };
            
            // spy on
            spyOn(vm, 'on_reorder');
            spyOn(vm, 'on_reorder_complete');

            $scope.vm = vm;


            var html =
                '<table class=\"table table-hover\" reorderable-table ng-model=\"vm.documents\" on-reorder=\"vm.on_reorder\" on-reorder-complete=\"vm.on_reorder_complete\">' +
                '\n <thead>' +
                '\n     <th class=\"reorder-column\"></th>' +
                '\n     <th class=\"table-header-text\">Document</th>' +
                '\n     <th class=\"table-header-text\">Author</th>' +
                '\n     <th class=\"table-header-text\">Location</th>' +
                '\n     <th class=\"table-header-text text-center\">Available</th>' +
                '\n     <th class=\"remove-column\"></th>' +
                '\n </thead>' +
                '\n <tbody>' +
                '\n     <tr class=\"table-vertically-center\" ng-repeat=\"document in vm.documents\">' +
                '\n         <td class=\"reorder-column\">' +
                '\n             <div class=\"reorderable-controls\">' +
                '\n                 <div class=\"reorder-up\" reorder-up></div>' +
                '\n                 <div class=\"reorder-drag\" reorder-drag>' +
                '\n                     <span class=\"hpe-icon hpe-drag\"></span>' +
                '\n                 </div>' +
                '\n                 <div class=\"reorder-down\" reorder-down></div>' +
                '\n             </div>' +
                '\n         </td>' +
                '\n         <td class=\"table-primary-text\" ng-bind=\"document.name\"></td>' +
                '\n         <td ng-bind=\"document.author\"></td>' +
                '\n         <td ng-bind=\"document.location\"></td>' +
                '\n         <td class=\"text-center\">' +
                '\n             <span class=\"hpe-icon hpe-active bold-icon text-primary\" ng-if=\"document.available\"></span>' +
                '\n             <span class=\"hpe-icon hpe-close bold-icon text-warning\" ng-if=\"!document.available\"></span>' +
                '\n         </td>' +
                '\n         <td>' +
                '\n             <span class=\"hpe-icon hpe-close remove-row\" ng-click=\"vm.removeRow(document)\"></span>' +
                '\n         </td>' +
                '\n     </tr>' +
                '\n </tbody>' +
                '\n</table>';

            // compile the element
            element = $compile(html)($scope);
            $scope.$digest();
            
            // required to trigger init function
            $timeout.flush();

            table_body = element.find('tbody');
        });


        it('should initialise correctly', function() {
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
        });

        it('should update the rows when model is changed', function() {

            $scope.vm.documents = [{
                name: 'Document 1',
                author: 'James Gray',
                location: 'Unknown or Invalid Region',
                available: true
            }, {
                name: 'Document 2',
                author: 'Mary Ingram',
                location: 'People\'s Democratic Republic of Yemen',
                available: false
            }];

            $scope.$digest();
            
            // expect there to be only two rows now
            expect(table_body.find('tr').length).toBe(2);

        });
        
        it('should remove row when remove button is clicked', function() {
            expect(table_body.find('tr').length).toBe(5);
            
            // find remove button
            var first_row = table_body.find('tr').first();
            var remove_button = first_row.find('.hpe-close');
            
            // click the remove button
            remove_button.click();
            
            $scope.$digest();
            
            expect(table_body.find('tr').length).toBe(4);
            
        });
        
        it('should move row down when down button is clicked', function() {
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 1');            
            expect($scope.vm.documents[1].name).toBe('Document 2');            
            
            // find move down button
            var first_row = table_body.find('tr').first();
            var down_button = first_row.find('.reorder-down');
            
            // click the remove button
            down_button.click();
            
            $scope.$digest();
            
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 2');            
            expect($scope.vm.documents[1].name).toBe('Document 1');
        });
        
        it('should move row down when up button is clicked', function() {
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 1');            
            expect($scope.vm.documents[1].name).toBe('Document 2');            
            
            // find move up button
            var second_row = table_body.find('tr:nth-child(2)').first();
            var up_button = second_row.find('.reorder-up');
            
            // click the remove button
            up_button.click();
            
            $scope.$digest();
            
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 2');            
            expect($scope.vm.documents[1].name).toBe('Document 1');
        });
        
        it('should only move rows up when possible', function() {
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 1');            
            expect($scope.vm.documents[1].name).toBe('Document 2');            
            
            // find move up button
            var first_row = table_body.find('tr').first();
            var up_button = first_row.find('.reorder-up');
            
            // click the remove button
            up_button.click();
            
            $scope.$digest();
            
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 1');            
            expect($scope.vm.documents[1].name).toBe('Document 2');
        });
        
        it('should only move rows down when possible', function() {
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[3].name).toBe('Document 4');            
            expect($scope.vm.documents[4].name).toBe('Document 5');            
            
            // find move down button
            var last_row = table_body.find('tr').last();
            var down_button = last_row.find('.reorder-down');
            
            // click the remove button
            down_button.click();
            
            $scope.$digest();
            
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[3].name).toBe('Document 4');            
            expect($scope.vm.documents[4].name).toBe('Document 5');
        });

        it('should call on-reorder when items are reordered', function() {
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 1');            
            expect($scope.vm.documents[1].name).toBe('Document 2');            
            
            // find move down button
            var first_row = table_body.find('tr').first();
            var down_button = first_row.find('.reorder-down');
            
            // click the remove button
            down_button.click();
            
            $scope.$digest();
            
            expect($scope.vm.on_reorder).toHaveBeenCalled();
            
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 2');            
            expect($scope.vm.documents[1].name).toBe('Document 1');
        });
        
        it('should call on-reorder-complete when items are finished being reordered', function() {
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 1');            
            expect($scope.vm.documents[1].name).toBe('Document 2');            
            
            // find move down button
            var first_row = table_body.find('tr').first();
            var down_button = first_row.find('.reorder-down');
            
            // click the remove button
            down_button.click();
            
            $scope.$digest();
            
            expect($scope.vm.on_reorder).toHaveBeenCalled();
            expect($scope.vm.on_reorder_complete).toHaveBeenCalled();
            
            expect($scope.vm.documents.length).toBe(5);
            expect(table_body.find('tr').length).toBe(5);
            
            expect($scope.vm.documents[0].name).toBe('Document 2');            
            expect($scope.vm.documents[1].name).toBe('Document 1');
        });
    });

});