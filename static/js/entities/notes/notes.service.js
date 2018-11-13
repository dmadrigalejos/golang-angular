(function () {
    'use strict';

    angular
        .module('noteApp')
        .factory('NotesService', NotesService);

    NotesService.$inject = ['$http'];

    function NotesService($http) {

        var factory = {
            newNote: newNote,
            getNotes: getNotes,
            getNote: getNote,
            editNote: editNote,
            deleteNote: deleteNote,
        };

        return factory;
        
        function newNote(note) {
            return $http({
                method: 'POST',
                url: 'note',
                data: note
            })
        }
        
        function getNotes(pagination) {
            return $http({
                method: 'GET',
                url: 'note/',
                params: {
                    searchQuery: pagination.notes.searchQuery,
                    pageNumber: pagination.notes.pageNumber,
                    sortBy: pagination.notes.sortBy,
                    order: pagination.notes.order,
                    limit: pagination.itemsPerPage
                }
            })
        }
        
        function getNote(id) {
            return $http({
                metho: 'GET',
                url: 'note/' + escape(id)
            })
        }
        
        function editNote(note) {
            return $http({
                method: 'PUT',
                url: 'note',
                data: note
            })
        }
        
        function deleteNote(id) {
            return $http({
                method: 'DELETE',
                url: 'note/' + id
            })
        }
    }
})();