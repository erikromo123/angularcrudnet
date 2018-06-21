var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    debugger;
    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            $scope.Employe = {};
            $scope.Employe.name = $scope.EmpName;
            $scope.Employe.city = $scope.EmpCity;
            $scope.Employe.age = $scope.EmpAge;
            $http({
                method: "post",
                url: "http://localhost:54461/Employee/Insert_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpName = "";
                $scope.EmpCity = "";
                $scope.EmpAge = "";
            })
        } else {
            $scope.Employe = {};
            $scope.Employe.name = $scope.EmpName;
            $scope.Employe.city = $scope.EmpCity;
            $scope.Employe.age = $scope.EmpAge;
            $scope.Employe.id = document.getElementById("EmpID_").value;
            $http({
                method: "post",
                url: "http://localhost:54461/Employee/Update_Employee",
                datatype: "json",
                data: JSON.stringify($scope.Employe)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllData();
                $scope.EmpName = "";
                $scope.EmpCity = "";
                $scope.EmpAge = "";
                document.getElementById("btnSave").setAttribute("value", "Submit");
                document.getElementById("btnSave").style.backgroundColor = "cornflowerblue";
                document.getElementById("spn").innerHTML = "Add New Employee";
            })
        }
    }
    $scope.GetAllData = function () {
        $http({
            method: "get",
            url: "http://localhost:54461/Employee/Get_AllEmployee"
        }).then(function (response) {
            $scope.employees = response.data;
        }, function () {
            alert("Error Occur");
        })
    };
    $scope.DeleteEmp = function (Emp) {
        $http({
            method: "post",
            url: "http://localhost:54461/Employee/Delete_Employee",
            datatype: "json",
            data: JSON.stringify(Emp)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAllData();
        })
    };
    $scope.UpdateEmp = function (Emp) {
        document.getElementById("EmpID_").value = Emp.id;
        $scope.EmpName = Emp.name;
        $scope.EmpCity = Emp.city;
        $scope.EmpAge = Emp.age;
        document.getElementById("btnSave").setAttribute("value", "Update");
        document.getElementById("btnSave").style.backgroundColor = "Green";
        document.getElementById("spn").innerHTML = "Update Employee Information";
    }
});
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});