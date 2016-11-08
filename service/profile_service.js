angular.module('App').factory('profileService', function ($q, $http, appInfo) {
    var apiUrl = appInfo.apiUrl;
    return {
        ChangePassword: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/changePassword", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {getDashboardDetails
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
	    getPhysioInfo: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/getPhysioDetails", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        editGenralInfo: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/GeneralInfo", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateLocation: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateLocation", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },  
        UpdateEducation: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateEducation", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },  
        UpdateSpecializations: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateSpecializations", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateServices: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateServices", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateRegistration: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateRegistration", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateContact: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateContact", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateExperience: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateExperience", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateAward: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateAward", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        UpdateMembership: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/UpdateMembership", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        uploadProfilePic: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/uploadProfilePic", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        uploadProofDetails: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/uploadProofDetails", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
	uploadGallery: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/uploadGallery", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteGallery: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/deleteGallery", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SendApproval: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/SendApproval", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        AddEditStock: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/AddEditStock", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getStockLists: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/getStockLists", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteStock: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/deleteStock", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        AddEditReferral: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/AddEditReferral", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getReferralLists: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/getReferralLists", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
	getPatientList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getPatientList", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteReferral: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/deleteReferral", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        AddEditEnquire: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/AddEditEnquire", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getEnquireLists: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/getEnquireLists", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteEnquire: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/deleteEnquire", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SendMessage: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/SendMessage", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getDashboardDetails: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/getDashboardDetails", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SubscriptionHistory: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/SubscriptionDetail", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        }, 
	EditUserInfo: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/EditUserInfo", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
	EditUserOtherInfo: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/EditUserOtherInfo", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
	EditSocialInfo: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/EditSocialInfo", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getAccountLists: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/getAccountLists", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        check_coupon_code: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/profile/check_coupon_code", reqData).success(function (data) {
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
