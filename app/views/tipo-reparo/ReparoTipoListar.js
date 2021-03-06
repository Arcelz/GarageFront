app.controller('ReparoTipoListar', function ($scope, $rootScope, DataService) {
    var idModalExclusao;
    var indexRemover;
    $scope.lembretes = [];
    DataService.realizarGet('tipos-reparos').then(function (response) {
        if (response.data.length) {
            $scope.lembretes = response.data;
        } else {
            $scope.messagem = "Nenhum";
        }

    });

    $scope.exibirModal = function (id, index) {
        indexRemover = index;
        $rootScope.idModalExclusao = id.pk_tipo;
        $scope.modulo = 'REPARO TIPO'
        $scope.modulo_nome = id.nome;
        angular.element('#modal_excluir').modal();
    };
    $scope.modalExcluir = function () {
        console.log($rootScope.idModalExclusao);
        DataService.realizarDelete('tipos-reparos/' + $rootScope.idModalExclusao).then(function (data) {
            console.log(data);
            $scope.lembretes.splice(indexRemover, 1);
            angular.element('#modal_excluir').modal('toggle');

        });

    };


});
