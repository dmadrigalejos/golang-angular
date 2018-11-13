(function () {
    'use strict';

    angular
        .module('noteApp')
        .controller('NotesController', NotesController);

    NotesController.$inject = ['$rootScope', '$stateParams', '$state', '$uibModal', 'NotesService'];

    function NotesController($rootScope, $stateParams, $state, $uibModal, NotesService) {
        var vm = this;
        
        vm.search = search;
        
        // variables
        vm.notes = [];
        vm.itemsPerPageOption = [10, 25, 50 , 100];
        vm.pagination = {
                maxSize: 5,
                itemsPerPage: 10,
                notes: {
                    totalItems: vm.notes.length > 0 ? vm.notes.length : 0,
                    searchQuery: '',
                    pageNumber: 1,
                    sortBy: 'title',
                    order: 'ASC'
                }
            };
        
        // public functions
        vm.search = search;
        vm.sort = sort;
        vm.keySearch = keySearch;
        vm.deleteNote = deleteNote;
        
        search();
        
        function search() {
        	NotesService.getNotes(vm.pagination)
        	.then(function(result){
        		vm.notes = result.data.Notes;
        		
        		vm.pagination = {
                    maxSize: 5,
                    itemsPerPage: vm.pagination.itemsPerPage,
                    notes: {
                    	totalItems: vm.notes ? result.data.TotalRows : 0,
                        searchQuery: vm.pagination.notes.searchQuery,
                        pageNumber: vm.pagination.notes.pageNumber,
                        sortBy: vm.pagination.notes.sortBy,
                        order: vm.pagination.notes.order
                    }
                };
        	})
        	.catch(function(error){
        		
        	});
        }
        
        function keySearch(event) {
            if (event.keyCode == 13) {
                search();
            }
        }
        
        function sort(sortBy) {
        	vm.pagination.notes.sortBy = sortBy;
        	vm.pagination.notes.order = vm.pagination.notes.order === 'ASC' ? 'DESC' : 'ASC';
        	search();
        }
        
        function deleteNote(id) {
        	var content = {
                title: "Delete",
                body: 'Are you sure you want to delete this note?'
            };
            var modalInstance = $uibModal.open({
                controller: 'ConfirmationController',
                controllerAs: 'vmConfirmation',
                templateUrl: 'js/components/confirmation/confirmation.html',
                size: 'md',
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    content: content
                }
            })

            modalInstance.result.then(function (response) {
                if (response) {
                    NotesService.deleteNote(id)
                    .then(function(result){
                        search();
                        modalInstance.close();
                    })
                }
            })
        }
    }
})();