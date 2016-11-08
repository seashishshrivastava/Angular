angular.module('App').factory('patientService', function ($q, $http, appInfo) {
    var apiUrl = appInfo.apiUrl;
    return {
        appointmentList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/GetPatientAppointment", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        updateAppointment: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/update_appoint_status", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
         AddPatient: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/addPatient", reqData).success(function (data) {
			    //alert('DATA::'+data);															   
				if(data>0){																	   
                	deferred.resolve(data);
					location.href=SITE_URL +"patient/edit/"+data;
					return deferred.promise;
					return false;
				}else{
					deferred.reject('Invalid format. Please try again.');
					return deferred.promise;
				}
                //alert(data[0]['Data']['PatientID']);
                
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveInvestigation: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SaveInvestigation", reqData).success(function (data) {
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
        getPatientDetail: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getPatientDetail", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getPrescriptionList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getPrescriptionList", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getCategory: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getCategory", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        GetImages: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getImages", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SubmitData: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/submitData", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveElectroPrescription: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SaveElectroPrescription", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveOtherPrescription: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SaveOtherPrescription", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SubmitForm: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SubmitForm", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveHomeAdvice: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SaveHomeAdvice", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveDailyRecord: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SaveDailyRecord", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveBill: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SaveBill", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getBillLists: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getBillLists", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteBill: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deleteBill", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        SaveAmount: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/SaveAmount", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deletePatient: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deletePatient", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getAmountLists: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getAmountLists", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteAmount: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deleteAmount", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getProblemLists: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getProblemLists", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteForm: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deleteForm", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getDailyRecordList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getDailyRecordList", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteRecord: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deleteRecord", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getInvestigationList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getInvestigationList", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteInvestigation: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deleteInvestigation", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getHomeAdviceList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getHomeAdviceList", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deleteHomeAdvice: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deleteHomeAdvice", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        getPrescList: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/getPrescList", reqData).success(function (data) {
                deferred.resolve(data);
                //alert("success" + data)
            }).error(function (data) {
                deferred.reject(data);
                //alert("error")
            });
            return deferred.promise;
        },
        deletePres: function (reqData) {
            var deferred = $q.defer();
            $http.post(SITE_URL + "api/patient/deletePres", reqData).success(function (data) {
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
