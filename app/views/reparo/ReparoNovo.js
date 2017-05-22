app.controller('ReparoNovo', function ($scope, $state, $rootScope, DataService) {
    $scope.tiposResultados = {};
    $scope.veiculosResultados = {};
    DataService.realizarGet('http://ifg.redesbrasil.com/tipos-reparos').then(function (data) {
        $scope.tiposResultados = data.data;
    });
    DataService.realizarGet('http://ifg.redesbrasil.com/veiculos').then(function (data) {
        $scope.veiculosResultados = data.data;
    });
    $scope.salvar = function () {
        if ($scope.form.fkTipo === undefined || $scope.form.fkTipo === "") {
            $scope.form.fkTipo = $("#selectTipo option:selected").val();
        }
        if ($scope.formulario.$valid && $scope.form.fkTipo != "") {
            DataService.realizarPost('http://ifg.redesbrasil.com/reparos', $scope.form).then(function (data) {
                $scope.botao = false;
                $state.go('common.reparoListar');
            });
        }
    }
    $scope.salvarModalTipo = function () {
        if ($scope.modalFormulario.$valid) {
            DataService.realizarPost('http://ifg.redesbrasil.com/tipos-reparos', $scope.modal).then(function (data) {
                $scope.botao = false;
                angular.element('#selectTipo').append('<option  value="' + data.data.pk_tipo + '" selected>' + data.data.nome + '</option>');
                angular.element('#modal_tipo_reparo').modal('toggle');
            });
        }
    }
});