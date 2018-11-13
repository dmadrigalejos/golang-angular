(function(){
    "use strict";
    angular
        .module("noteApp")
        .controller("ConfirmationController", ConfirmationController);

    ConfirmationController.$inject=['$uibModalInstance', 'content'];

    function ConfirmationController($uibModalInstance, content){

        var vm = this;
        vm.confirm = confirm;
        vm.closeModal = closeModal;
        vm.content = content;

        function confirm(){
        	$uibModalInstance.close(true);
        }

        function closeModal() {
        	$uibModalInstance.close(false);
        }
    }
})();
