/**
 * Created by XiMeNa on 22/10/16.
 */
app = angular.module('LogicaApp', ['ngRoute'])

.controller('formController', function ($scope) {
    $scope.tipos = [
        {'name': "Casa", "min_cost": 90000000, "max_cost": 200000000, "min_mtr": 50, "max_mtr": 1000},
        {'name': "Apartamento", "min_cost": 35000000, "max_cost": 250000000, "min_mtr": 25, "max_mtr": 150},

    ];
    $scope.regex = "^[0-10]$";
    $scope.datos = {};
    $scope.listado_estratos = [1,2,3,4,5,6];
    $scope.zonas_comunes = [
        {'id': 'parqueaderos', 'name': 'Parqueaderos'},
        {'id': 'parques', 'name': 'Parques'},
        {'id': 'gimnasios', 'name': 'Gimnasio'},
        {'id': 'piscina', 'name': 'Piscina'},
        {'id': 'salon_comunal', 'name': 'Salón Comunal'},
        {'id': 'vias', 'name': 'Vías Principales'},
        {'id': 'canchas', 'name': 'Canchas'},
        {'id': 'jardin', 'name': 'Jardin'},
        {'id': 'porteria', 'name': 'Porteria'},
        {'id': 'centros', 'name': 'Centros Comerciales'}
    ];

    $scope.actualizar = function(){
        $scope.min = $scope.datos.tipo.min_cost;
        $scope.max = $scope.datos.tipo.max_cost;
        $scope.min_mtr = $scope.datos.tipo.min_mtr;
        $scope.max_mtr = $scope.datos.tipo.max_mtr;
    }
});