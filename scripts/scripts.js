/**
 * Created by XiMeNa on 22/10/16.
 */
app = angular.module('LogicaApp', ['ngRoute'])

.controller('formController', function ($scope, formService) {

    $scope.data = null;
    $scope.calculo = {"zonas":{}};

    $scope.tipos = [
        {'name': "Casa", "id": "casa", "min_cost": 200000000, "max_cost": 1000000000, "min_mtr": 50, "max_mtr": 1000},
        {'name': "Apartamento", "id": "apto", "min_cost": 140000000, "max_cost": 800000000, "min_mtr": 25, "max_mtr": 150},

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
    };

    $scope.calcular = function(){

        angular.copy($scope.datos.zonas, $scope.calculo.zonas);

        console.log($scope.calculo);

        var data = formService.getData();

        data.success(function(data){
            $scope.data = data;

            //Definición del estrato mediante el precio del inmueble
            var precio_tipo = $scope.data['precio'][$scope.datos.tipo.id];
            angular.forEach(precio_tipo, function(pbt){
                $scope.datos.precio = parseInt($scope.datos.precio);
                if (($scope.datos.precio >= pbt.rango[0]) && ($scope.datos.precio <= pbt.rango[1])){
                    $scope.calculo.precio = pbt.categoria;
                }
            });
            if($scope.data.estrato[$scope.datos.estrato] instanceof Object){
                $scope.calculo.estrato = $scope.data.estrato[$scope.datos.estrato]['precio'][$scope.calculo.precio];
            }else{
                $scope.calculo.estrato = $scope.data.estrato[$scope.datos.estrato];
            }

            //Definición de la luminocidad según el tamaño del inmueble
            var metros_tipo = $scope.data['metros'][$scope.datos.tipo.id];
            angular.forEach(metros_tipo, function(mbt){
                $scope.datos.metros = parseInt($scope.datos.metros);
                if (($scope.datos.metros >= mbt.rango[0]) && ($scope.datos.metros <= mbt.rango[1])){
                    $scope.calculo.metros = mbt.categoria;
                }
            });
            if($scope.data.luz[$scope.datos.luz] instanceof Object){
                $scope.calculo.luz = $scope.data.luz[$scope.datos.luz]['metros'][$scope.calculo.metros];
            }else{
                $scope.calculo.luz = $scope.data.luz[$scope.datos.luz];
            }
            console.log($scope.calculo);
        }).error(function(err){
            console.log("error");
            console.log(err);
            $scope.data = null;
            return null;
        });
        /*Estrato
        *
        *   1-3
        *
        * */
    };


})
.factory('formService', function($http){

    return{

        getData:function(){
            return $http({
                'method': 'GET',
                'url': 'data.json'
            });
        }

    };

});
