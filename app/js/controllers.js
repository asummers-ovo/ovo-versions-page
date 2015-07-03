'use strict';

/* Controllers */

var versionsApp = angular.module('versionsApp', []);

versionsApp.controller('VersionsController', function ($scope, $http) {


    function getSprayVersion(name, boxName) {
        function sendRequest() {
            var devService = "http://" + boxName + "01.dev.ptl.ovotech.org.uk:8081";
            var uatService1 = "http://" + boxName + "01.uat.ptl.ovotech.org.uk:8081";
            var uatService2 = "http://" + boxName + "02.uat.ptl.ovotech.org.uk:8081";
            var pgService1 = "http://" + boxName + "01.g.prd.ptl.ovotech.org.uk:8081";
            var pgService2 = "http://" + boxName + "03.g.prd.ptl.ovotech.org.uk:8081";
            var pbService1 = "http://" + boxName + "01.b.prd.ptl.ovotech.org.uk:8081";
            var pbService2 = "http://" + boxName + "02.b.prd.ptl.ovotech.org.uk:8081";

            $http.get(devService + "/info").success(function (data) {
                $scope.devVersions.push({
                    serviceName: name,
                    serviceVersion: data.version + "-" + data.buildNumber
                });
            });

            $http.get(uatService1 + "/info").success(function (data1) {
                $http.get(uatService2 + "/info").success(function (data2) {
                    $scope.uatVersions.push({
                        serviceName: name,
                        serviceVersion1: data1.version + "-" + data1.buildNumber,
                        serviceVersion2: data2.version + "-" + data2.buildNumber
                    });
                });
            });

            $http.get(pgService1 + "/info").success(function (data1) {
                $http.get(pgService2 + "/info").success(function (data2) {
                    $scope.pgVersions.push({
                        serviceName: name,
                        serviceVersion1: data1.version + "-" + data1.buildNumber,
                        serviceVersion2: data2.version + "-" + data2.buildNumber
                    });
                });
            });

            $http.get(pbService1 + "/info").success(function (data1) {
                $http.get(pbService2 + "/info").success(function (data2) {
                    $scope.pbVersions.push({
                        serviceName: name,
                        serviceVersion1: data1.version + "-" + data1.buildNumber,
                        serviceVersion2: data2.version + "-" + data2.buildNumber
                    });
                });
            });
        }

        return sendRequest();
    }

    function getDropwizardVersion(name, service) {
        function sendRequest() {
            $http.get(service + "/healthcheck").success(function (data) {
                $scope.versions.push({
                    serviceName: name,
                    serviceVersion: data
                });
            });
        }

        return sendRequest();
    }


  $scope.loadData = function() {
    $scope.devVersions = [];
    $scope.uatVersions = [];
    $scope.pgVersions = [];
    $scope.pbVersions = [];
    getSprayVersion("Gentrack Rest Service", "gt");
    getSprayVersion("Public API PAYM", "paym-api");
    getSprayVersion("Public API Portal", "api");
  };

  $scope.loadData();
});