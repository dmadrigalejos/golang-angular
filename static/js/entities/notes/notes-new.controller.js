(function () {
    'use strict';

    angular
        .module('noteApp')
        .controller('NewNotesController', NewNotesController);

    NewNotesController.$inject = ['$rootScope', '$stateParams', '$state', 'NotesService'];

    function NewNotesController($rootScope, $stateParams, $state, NotesService) {
        var vm = this;
        
        // variables
        vm.newnote_form = {};
        vm.newnoteFormErrors = [];
        vm.note = {};        
        
        // public functions
        vm.newNote = newNote;
        vm.reset = reset;

        function newNote() {
            if (vm.newnote_form.$valid) {
                NotesService.newNote(vm.note)
                .then(function(result){
                    $state.go('dashboard.notes');
                })
                .catch(function(error){
                    vm.newnote_form.$setDirty();
                    vm.newnoteFormErrors = error.data.errors;
                })
            } else {
                vm.newnote_form.$setDirty();
            }
        }
        
        function reset() {
            vm.note = {};
            vm.newnote_form.$setPristine();
        }
    }
})();