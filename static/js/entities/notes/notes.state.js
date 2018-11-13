(function () {
    'use strict';

    angular
        .module("noteApp")
        .config(stateConfig)

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
    	
        $stateProvider
        .state('dashboard.notes',{
            url: '/notes',
            controller: 'NotesController',
            controllerAs: 'vmNotes',
            templateUrl: 'js/entities/notes/notes.html'
        })
        .state('dashboard.notesnew',{
            url: '/notes/new',
            controller: 'NewNotesController',
            controllerAs: 'vmNewNotes',
            templateUrl: 'js/entities/notes/notes-new.html'
        })
        .state('dashboard.notesedit',{
            url: '/notes/edit/:id',
            controller: 'EditNotesController',
            controllerAs: 'vmEditNotes',
            templateUrl: 'js/entities/notes/notes-edit.html',
            resolve: {
                noteDetails: ['NotesService', '$stateParams',
                    function (NotesService, $stateParams) {
                        return NotesService.getNote($stateParams.id);
                    }
                ]
            }
        })
    }
})();