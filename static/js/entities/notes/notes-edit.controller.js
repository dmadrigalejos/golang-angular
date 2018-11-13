(function () {
    'use strict';

    angular
        .module('noteApp')
        .controller('EditNotesController', EditNotesController);

    EditNotesController.$inject = ['$rootScope', '$stateParams', '$state', 'NotesService', 'noteDetails'];

    function EditNotesController($rootScope, $stateParams, $state, NotesService, noteDetails) {
        var vm = this;
        
        // variables
        vm.editnote_form = {};
        vm.editnoteFormErrors = [];
        vm.note = {};

        // public functions
        vm.editNote = editNote;
        vm.reset = reset;
        
        angular.copy(noteDetails.data, vm.note);

        function editNote() {
            if (vm.editnote_form.$valid) {
                NotesService.editNote(vm.note)
                .then(function(result){
                    $state.go('dashboard.notes');
                })
                .catch(function(error){
                    vm.editnote_form.$setDirty();
                    vm.editnoteFormErrors = error.data.errors;
                })
            } else {
                vm.editnote_form.$setDirty();
            }
        }
        
        function reset() {
            angular.copy(noteDetails.data, vm.note);
            vm.editnote_form.$setPristine();
        }
    }
})();