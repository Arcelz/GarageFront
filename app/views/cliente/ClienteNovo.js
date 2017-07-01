app.controller('ClienteNovo', function ($scope, $rootScope, $state, DataService, $document, $window, $location) {

    //Função para salvar Funcionario
    $scope.salvar = function () {
        $scope.form.cpf = $("#cpf").val();
        $scope.form.telefone = $("#telefone").val();
        $scope.form.celular = $("#celular").val();
        $scope.form.cep = $("#cep").val();

        if ($scope.form.cpf !== "" && $scope.form.telefone !== "" && $scope.form.celular !== "" && $scope.form.cep !== "") {
            $scope.formulario.$valid = true;

        };

        if ($scope.formulario.$valid) {
            $scope.botao = true; //para desativar o botão para que o usuario não faça varias requisções
            DataService.realizarPost('clientes', $scope.form).then(function (response) {
                if (response.data.status == 400) {
                    $scope.botao = false;
                } else {
                    $scope.botao = true;
                    $scope.form = {};
                    $state.go('common.clienteListar');
                }
            });

        }
    };
    // ----------------FIM-----------------------
});