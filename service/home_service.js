angular.module('App').factory('homeService', function ($q, $http, appInfo) {
    var apiUrl = appInfo.apiUrl;
    return {
        Registration: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/signup/addPhysio", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
		registerPatients: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/signup/registerOutsidePatient", reqData).success(function (data) {
                alert("success" + data);
				deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        }, 
        Login: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/signup/physioLogin", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        ForgetPassword: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/signup/forgetPassword", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
    }
});