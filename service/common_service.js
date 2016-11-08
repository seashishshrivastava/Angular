angular.module('App').service('commonService', function ($q, $http, $rootScope) {
	this.commonApiCall = function (values, url) {
		var deferred = $q.defer();
		$http.post(SITE_URL + url, values).success(function (data) {
			deferred.resolve(data);
		}).error(function (data) {
			deferred.reject(data);
		});
		return deferred.promise;
	}
});



angular.module('App').factory('commonServices', function ($q, $http, appInfo) {
    var apiUrl = appInfo.apiUrl;
    return {
        submitFeedback: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/submitFeedback", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        }
    }
});

//$('#PastPrescriptionDate').datepicker();
