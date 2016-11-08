angular.module('App').factory('calendarService', function ($q, $http, appInfo) {
    var apiUrl = appInfo.apiUrl;
    return {
        GetCalendarSetting: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/GetCalendarSetting", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveCalendarSetting: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/SaveCalendarSetting", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        GetCalendarInfo: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/GetCalendarInfo", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveAppointment: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/SaveAppointment", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        GetAppointmentList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/GetAppointmentList", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        DeleteAppointment: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/DeleteAppointment", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateAppointment: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateAppointment", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        EditAppointment: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/EditAppointment", reqData).success(function (data) {
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