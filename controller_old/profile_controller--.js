/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('App').controller('ProfileCtrl', function ($scope, $rootScope, $element, profileService,$http) {

	$scope.CPassword = {"LoginSessionKey":'',"CurentPassword":'',"NewPassword":'',"confirmPassword":''};
	$scope.IsCPError = 0;
	$scope.responseMess = '';
	$('.errorHandler').css('display','none');

	$scope.IsLoading = true;
	$scope.getInfo = {"LoginSessionKey":''};
	$scope.physioInfo = {};
	$scope.editphysioInfo = {};

	// model parameters
	$scope.formloading = false;
	$scope.responseMess1 = "You have some form errors. Please check below.";
    $scope.IsGeneralInfoError = 0;
    $scope.IsLocationInfoError = 0;
    $scope.responseContactMess = '';
    $scope.IsProofUpload = 0;
    $scope.proofOptions = [{"Type":'0',"TypeName":'Other Proof'},{"Type":'1',"TypeName":'Qualification Proof'},{"Type":'2',"TypeName":'Education Proof'},{"Type":'3',"TypeName":'Id Proof'}];
    $scope.Proof = {"ProofType":'0',"ProofDescription":''};

    // stock page
    $scope.StockLoading = true;
    $scope.Stock = {"LoginSessionKey":'',"StockID":'',"StockLists":[{"Name":'',"Description":'',"Make":'',"DOP":'',"Warrenty":'',"Remark":''}]};
    $scope.stockInfo = {};

    // referral page
    $scope.ReferralLoading = true;
    $scope.Referral = {"LoginSessionKey":'',"ReferralID":'',"ReferralLists":[{"Name":'',"Qualification":'',"MobileNumber":'',"Email":'',"Address":'',"Remark":''}]};
    $scope.referralInfo = {};
	$scope.SendType = 1;
	$scope.text1 = {};
	$scope.text1.Conetnt = '';
	$scope.text1.Subject = '';
	$scope.SendTextLimit = 160;

	// enquire page
    $scope.EnquireLoading = true;
    $scope.Enquire = {"LoginSessionKey":'',"EnquireID":'',"EnquireLists":[{"Name":'',"MobileNumber":'',"Email":'',"Address":'',"Remark":''}]};
    $scope.enquireInfo = {};

    // account page
    $scope.AccountLoading = true;
    $scope.accountInfo = {};
	
	// dashboard details
	$scope.dashboard = {};
	$scope.DashboardLoading = true;

	$scope.resetForm = function(){
		$scope.CPassword = {"CurentPassword":'',"NewPassword":'',"confirmPassword":''};
	}
    
	$scope.changePassword = function(LoginSessionKey){
		$('.errorHandler').css('display','block');
		if(!$scope.CPassword.CurentPassword || !$scope.CPassword.CurentPassword || !$scope.CPassword.confirmPassword){
			$scope.IsCPError = 1;
			$scope.responseMess = 'Please fill all form details';
			return false;
		}else if($scope.CPassword.confirmPassword !== $scope.CPassword.NewPassword){
			$scope.IsCPError = 1;
			$scope.responseMess = 'New Password did not match with confirm password.';
			return false;
		}else{
			$scope.CPassword.LoginSessionKey = LoginSessionKey;
			$('.errorHandler').css('display','none');
			profileService.ChangePassword($scope.CPassword).then(function (response) {
				$('.errorHandler').css('display','block');
	            if (response.ResponseCode == "200") {
                    $scope.responseMess = response.Message;
    				$scope.IsCPError = 0;
    				$scope.CPassword = {"CurentPassword":'',"NewPassword":'',"confirmPassword":''};
                } else {
                    $scope.responseMess = response.Message;
    				$scope.IsCPError = 1;
                }
	        });
		}
	}

	$scope.getPhysioInfo = function(LoginSessionKey){
		$scope.getInfo.LoginSessionKey = LoginSessionKey;
		profileService.getPhysioInfo($scope.getInfo).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.physioInfo = response.Data;
				//$scope.editphysioInfo = angular.copy($scope.physioInfo);
				$scope.IsLoading = false;
            }
        });
	}

	$scope.EditGeneralInfo = function(LoginSessionKey,type){

		if(type == 'form'){
			$('#form').submit();
			$('.errorHandler').css('display','block');
			if(!$scope.editphysioInfo.GeneralInfo.ClinicName || !$scope.editphysioInfo.GeneralInfo.FirstName || !$scope.editphysioInfo.GeneralInfo.LastName){
				$scope.IsGeneralInfoError = 1;
				return false;
			}else{
				$scope.formloading = true;
				$scope.ShowLoader('LocationForm');
				var reqData = {"LoginSessionKey":LoginSessionKey,"Description":$scope.editphysioInfo.GeneralInfo.Description,"YearOfExperience":$scope.editphysioInfo.GeneralInfo.YearOfExperience,"ClinicName":$scope.editphysioInfo.GeneralInfo.ClinicName,"FirstName":$scope.editphysioInfo.GeneralInfo.FirstName,"LastName":$scope.editphysioInfo.GeneralInfo.LastName,"Gender":$scope.editphysioInfo.GeneralInfo.Gender,"DOB":$scope.editphysioInfo.GeneralInfo.DOB};
				profileService.editGenralInfo(reqData).then(function (response) {
		            if (response.ResponseCode == "200") {
		            	$scope.physioInfo.GeneralInfo = $scope.editphysioInfo.GeneralInfo;
		            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		            	$scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage; 
		            	$('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	
		            	$('.errorHandler').css('display','none');
		            	$scope.IsGeneralInfoError = 0;
						$('#editGenearlInfo').modal('hide');
						$scope.formloading = false;
		            }else{
		            	$scope.responseMess = response.Message;
		            	$('.errorHandler').css('display','block');
		            }
		            $scope.RemoveLoader('LocationForm');
		        });
			}
		}else if(type == 'form2'){
			$('#form2').submit();
			$('.errorHandler').css('display','block');
			if(!$scope.editphysioInfo.GeneralInfo.City || !$scope.editphysioInfo.GeneralInfo.Locality){
				$scope.IsLocationInfoError = 1;
				return false;
			}else{
				$scope.formloading = true;
				var reqData = {"LoginSessionKey":LoginSessionKey,"Address":$scope.editphysioInfo.GeneralInfo.Address,"City":$scope.editphysioInfo.GeneralInfo.City,"Locality":$scope.editphysioInfo.GeneralInfo.Locality};
				profileService.UpdateLocation(reqData).then(function (response) {
		            if (response.ResponseCode == "200") {
		            	$scope.physioInfo.GeneralInfo = $scope.editphysioInfo.GeneralInfo; 
		            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		            	$scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;
		            	$('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	           	
		            	$('.errorHandler').css('display','none');
		            	$('#editLocationInfo').modal('hide');
		            	$scope.IsLocationInfoError = 0;
						$scope.formloading = false;
				toastr.success(response.Message);
		            }
		        });
			}
		}else if(type == 'form3'){
			$scope.ShowLoader('GeneralForm');
			var reqData = {"LoginSessionKey":LoginSessionKey,"AdditionalNumber":$scope.editphysioInfo.GeneralInfo.PhoneNumber,"AdditionalEmail":$scope.editphysioInfo.GeneralInfo.AdditionalEmail};
			profileService.UpdateContact(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
	            	$scope.physioInfo.GeneralInfo = $scope.editphysioInfo.GeneralInfo;
	            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		            $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage; 
		            $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	           	
	            	$('.errorHandler').css('display','none');
	            	$('#editContactInfo').modal('hide');
	            }else{
	            	$scope.responseContactMess = response.Message;
	            	$('.errorHandler').css('display','block');
	            }
	            $scope.RemoveLoader('GeneralForm');
	        });
		}
	}

	$scope.EditEducationInfo = function(LoginSessionKey){
		$scope.ShowLoader('EducationForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,DegreeDetails:$scope.editphysioInfo.Educations}
		profileService.UpdateEducation(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.physioInfo.Educations = $scope.editphysioInfo.Educations; 
            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		        $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;  
		        $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	         	
            	$('.errorHandler').css('display','none');
            	$('#editEducationInfo').modal('hide');
            	$scope.RemoveLoader('EducationForm');
            }
        });
	}

	$scope.EditSpecializationInfo = function(LoginSessionKey){
		$scope.ShowLoader('SpecializationForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,SpecializationsDetails:$scope.editphysioInfo.Specializations}
		profileService.UpdateSpecializations(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.physioInfo.Specializations = $scope.editphysioInfo.Specializations; 
            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		        $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;      
		        $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	     	
            	$('.errorHandler').css('display','none');
            	$('#editSpecializationInfo').modal('hide');
            	$scope.RemoveLoader('SpecializationForm');
            }
        });
	}

	$scope.EditServiceInfo = function(LoginSessionKey){
		$scope.ShowLoader('ServiceForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,ServicesDetails:$scope.editphysioInfo.Services}
		profileService.UpdateServices(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.physioInfo.Services = $scope.editphysioInfo.Services;
            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		        $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;   
		        $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	         	
            	$('.errorHandler').css('display','none');
            	$('#editServiceInfo').modal('hide');
            	$scope.RemoveLoader('ServiceForm');
            }
        });
	}

	$scope.EditRegistrationInfo = function(LoginSessionKey){
		$scope.ShowLoader('RegistrationForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,RegistrationDetails:$scope.editphysioInfo.Registrations}
		profileService.UpdateRegistration(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.physioInfo.Registrations = $scope.editphysioInfo.Registrations;  
            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		        $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;   
		        $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	      	
            	$('.errorHandler').css('display','none');
            	$('#editRegistrationInfo').modal('hide');
            	$scope.RemoveLoader('RegistrationForm');
            }
        });
	}

	$scope.EditExperienceInfo = function(LoginSessionKey){
		$scope.ShowLoader('ExperienceForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,ExperienceDetails:$scope.editphysioInfo.Experiences}
		profileService.UpdateExperience(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.physioInfo.Experiences = $scope.editphysioInfo.Experiences;   
            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		        $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;       
		        $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	  	
            	$('.errorHandler').css('display','none');
            	$('#editExperienceInfo').modal('hide');
            	$scope.RemoveLoader('ExperienceForm');
            }
        });
	}

	$scope.EditAwardInfo = function(LoginSessionKey){
		$scope.ShowLoader('AwardForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,AwardDetails:$scope.editphysioInfo.Awards}
		profileService.UpdateAward(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.physioInfo.Awards = $scope.editphysioInfo.Awards;            	
            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		        $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;
		        $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	
            	$('.errorHandler').css('display','none');
            	$('#editAwardInfo').modal('hide');
            	$scope.RemoveLoader('AwardForm');
            }
        });
	}

	$scope.EditMembershipInfo = function(LoginSessionKey){
		$scope.ShowLoader('MembershipForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,MembershipDetails:$scope.editphysioInfo.Memberships}
		profileService.UpdateMembership(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.physioInfo.Memberships = $scope.editphysioInfo.Memberships;  
            	$scope.physioInfo.GeneralInfo.IsProfileCompleted = response.Data.IsProfileCompleted;
		        $scope.physioInfo.GeneralInfo.ProfilePercentage  = response.Data.ProfilePercentage;
		        $('#ProfilePerUpdate').html('Your profile is '+$scope.physioInfo.GeneralInfo.ProfilePercentage+'% completed. ');     	         	
            	$('.errorHandler').css('display','none');
            	$('#editMembershipInfo').modal('hide');
            	$scope.RemoveLoader('MembershipForm');
            }
        });
	}

	$scope.UploadImage = function(LoginSessionKey){
		var text = $('.fileupload-preview').find('img').attr('src');
		if(text == '' || text == undefined){
			toastr.error('Invalid file');
			$('#remove').click();
		}else{
			var reqData = {"LoginSessionKey":LoginSessionKey,ProfilePic:text}
			profileService.uploadProfilePic(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
	            	toastr.success(response.Message);
	            	location.reload();
	            }else{
	            	toastr.error(response.Message);
	            	$('#remove').click();
	            }
	        });
		}
	}

	$scope.UploadProofImage = function(LoginSessionKey){
		$('.errorHandler').css('display','block');
		$scope.responseProof = '';
		var text = $('.proof .fileupload-preview').find('img').attr('src');
		if(text == '' || text == undefined){
			$scope.responseProof = "Invalid file uploaded.";
			$('#removeproof').click();
		}else if($scope.Proof.ProofDescription == ''){
			$scope.responseProof = "Please provide proof description.";
		}else{
			$scope.ShowLoader('UploadPPImage');
			$('.errorHandler').css('display','none');
			var reqData = {"LoginSessionKey":LoginSessionKey,Type:$scope.Proof.ProofType,Description:$scope.Proof.ProofDescription,ProofImage:text};
			profileService.uploadProofDetails(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
			toastr.success(response.Message);
	            	$scope.Proof = {"ProofType":'0',"ProofDescription":''};
	            	$('#removeproof').click();
			location.reload();
	            }else{
	            	$scope.responseProof = response.Message;
	            	//$('#remove').click();
	            }
			$scope.RemoveLoader('UploadPPImage');
	        });
		
		}
	}	

	$scope.IsUserInfoError = 0;$scope.responseMess2 = '';
	$scope.EditUserInfo = function(LoginSessionKey){
		$scope.ShowLoader('UsernameForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,UserDetails:$scope.editphysioInfo.GeneralInfo}
		profileService.EditUserInfo(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
		toastr.success(response.Message);
            	$scope.physioInfo.GeneralInfo.Username = $scope.editphysioInfo.GeneralInfo.Username;
            	$('#editUsername').modal('hide');
            }else{
            	$('.errorHandler1').css('display','block');
            	$scope.IsUserInfoError = 1;
            	$scope.responseMess2 = response.Message;
            }
            $scope.RemoveLoader('UsernameForm');
        });
	}

	$scope.removeError1 = function(){
    	$scope.IsUserInfoError = 0;
    	$('.errorHandler1').css('display','none');
	}

	$scope.ApprovalMess = '';
	$scope.SendApproval = function(LoginSessionKey){
		$scope.ShowLoader('SendApproval');
		var reqData = {"LoginSessionKey":LoginSessionKey}
		profileService.SendApproval(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.ApprovalMess = response.Message;
            	$scope.physioInfo.GeneralInfo.IsSentForApproval = 1;
            	$scope.RemoveLoader('SendApproval');
            }else{
            	$scope.RemoveLoader('SendApproval');
            }
        });
	}

	// Stock Code Start
	$scope.getStockLists = function(LoginSessionKey){
		$scope.IsStockEdit = 0;
		var reqData = {"LoginSessionKey" : LoginSessionKey};
		profileService.getStockLists(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.stockInfo = response.Data;
				$scope.StockLoading = false;
            }
        });
	}

	$scope.AddStock = function(LoginSessionKey){
		$scope.Stock.LoginSessionKey = LoginSessionKey;
		$scope.ShowLoader('AddStock');
		$scope.IsStockEdit = 0;
		profileService.AddEditStock($scope.Stock).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);

            	if($scope.Stock.StockID == ''){
            		$scope.StockLoading = true;
    				$scope.stockInfo = {};
	            	$scope.getStockLists(LoginSessionKey);
	            }else{
	            	angular.forEach($scope.stockInfo, function(value, key){
						if($scope.Stock.StockID == value.StockID){
							$scope.stockInfo.splice(key, 1);
							$scope.Stock.StockLists[0].StockID = $scope.Stock.StockID;
							$scope.stockInfo.push($scope.Stock.StockLists[0]);
						}
				    });
	            }

				$scope.Stock = {"LoginSessionKey":'',"StockID":'',"StockLists":[{"Name":'',"Description":'',"Make":'',"DOP":'',"Warrenty":'',"Remark":''}]};            	
				$scope.RemoveLoader('AddStock');
				setTimeout(function(){
					$('.date-picker1').datepicker({
	     				autoclose: true
	     			});
	     			
	     			$('.date-picker2').datepicker({
	     				autoclose: true
	     			});
				},1000);
            }else{
            	toastr.error(response.Message);
            }
        });
	}

	$scope.DeleteStock = function(LoginSessionKey,StockID){
            swal({
                title: "Are you sure?",
                text: "You want to delete stock detail",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            },
            function () {
            	$scope.IsStockEdit = 0;
            	var reqData = {"LoginSessionKey" : LoginSessionKey,"StockID":StockID};
				profileService.deleteStock(reqData).then(function (response) {
		            if (response.ResponseCode == "200") {
		            	angular.forEach($scope.stockInfo, function(value, key){
							if(StockID == value.StockID){
								$scope.stockInfo.splice(key, 1);
							}
					    });
						swal("Deleted!", response.Message, "success");
		            }else{
		            	swal("Not Deleted!", response.Message, "error");
		            }
		        });
                
            });
	}

	$scope.IsStockEdit = 0;
	$scope.EditStock = function(StockID){
		angular.forEach($scope.stockInfo, function(value, key){
			if(StockID == value.StockID){
				$scope.IsStockEdit = 1;
				setTimeout(function(){
					$('.date-picker1').datepicker({
	     				autoclose: true
	     			});
	     			
	     			$('.date-picker2').datepicker({
	     				autoclose: true
	     			});
				},1000);

				var DOP = value.DOP;
				if(DOP == '0000-00-00'){
					DOP = '';
				}

				var Warrenty = value.Warrenty;
				if(Warrenty == '0000-00-00'){
					Warrenty = '';
				}
				$scope.Stock = {"LoginSessionKey":'',"StockID":value.StockID,"StockLists":[{"Name":value.Name,"Description":value.Description,"Make":value.Make,"DOP":DOP,"Warrenty":Warrenty,"Remark":value.Remark}]};
				console.log($scope.Stock);
			}
	    });
	}
	// Stock Code End

	// Referral Code Start
	$scope.getReferralLists = function(LoginSessionKey){
		$scope.IsReferralEdit = 0;
		var reqData = {"LoginSessionKey" : LoginSessionKey};
		profileService.getReferralLists(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.referralInfo = response.Data;
				$scope.ReferralLoading = false;
            }
        });
	}

	$scope.AddReferral = function(LoginSessionKey){
		$scope.Referral.LoginSessionKey = LoginSessionKey;
		$scope.ShowLoader('AddReferral');
		$scope.IsReferralEdit = 0;
		profileService.AddEditReferral($scope.Referral).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);

            	if($scope.Referral.ReferralID == ''){
            		$scope.ReferralLoading = true;
    				$scope.referralInfo = {};
	            	$scope.getReferralLists(LoginSessionKey);
	            }else{
	            	angular.forEach($scope.referralInfo, function(value, key){
						if($scope.Referral.Referred == value.Referred){
							$scope.referralInfo.splice(key, 1);
							$scope.Referral.ReferralLists[0].Referred = $scope.Referral.Referred;
							$scope.referralInfo.push($scope.Referral.ReferralLists[0]);
						}
				    });
	            }

	            $scope.Referral = {"LoginSessionKey":'',"ReferralID":'',"ReferralLists":[{"Name":'',"Qualification":'',"MobileNumber":'',"Email":'',"Address":'',"Remark":''}]}; 	
				$scope.RemoveLoader('AddReferral');
            }else{
            	toastr.error(response.Message);
            }
        });
	}

	$scope.DeleteReferral = function(LoginSessionKey,ReferralID){
            swal({
                title: "Are you sure?",
                text: "You want to delete referral detail",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            },
            function () {
            	$scope.IsReferralEdit = 0;
            	var reqData = {"LoginSessionKey" : LoginSessionKey,"Referred":ReferralID};
				profileService.deleteReferral(reqData).then(function (response) {
		            if (response.ResponseCode == "200") {
		            	angular.forEach($scope.referralInfo, function(value, key){
							if(ReferralID == value.Referred){
								$scope.referralInfo.splice(key, 1);
							}
					    });
						swal("Deleted!", response.Message, "success");
		            }else{
		            	swal("Not Deleted!", response.Message, "error");
		            }
		        });
                
            });
	}

	$scope.IsReferralEdit = 0;
	$scope.EditReferral = function(ReferralID){
		angular.forEach($scope.referralInfo, function(value, key){
			if(ReferralID == value.Referred){
				$scope.IsReferralEdit = 1;
				$scope.Referral = {"LoginSessionKey":'',"Referred":value.Referred,"ReferralLists":[{"Name":value.Name,"Qualification":value.Qualification,"MobileNumber":value.MobileNumber,"Email":value.Email,"Address":value.Address,"Remark":value.Remark}]};
			}
	    });
	}

	// Referral Code End

	// Enquire Code Start
	$scope.getEnquireLists = function(LoginSessionKey){
		$scope.IsEnquireEdit = 0;
		var reqData = {"LoginSessionKey" : LoginSessionKey};
		profileService.getEnquireLists(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.enquireInfo = response.Data;
				$scope.EnquireLoading = false;
            }
        });
	}

	$scope.AddEnquire = function(LoginSessionKey){
		$scope.Enquire.LoginSessionKey = LoginSessionKey;
		$scope.ShowLoader('AddReferral');
		$scope.IsReferralEdit = 0;
		profileService.AddEditEnquire($scope.Enquire).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);

            	if($scope.Enquire.EnquireID == ''){
            		$scope.EnquireLoading = true;
    				$scope.enquireInfo = {};
	            	$scope.getEnquireLists(LoginSessionKey);
	            }else{
	            	angular.forEach($scope.enquireInfo, function(value, key){
						if($scope.Enquire.EnquireID == value.EnquireID){
							$scope.enquireInfo.splice(key, 1);
							$scope.Enquire.EnquireLists[0].EnquireID = $scope.Enquire.EnquireID;
							$scope.enquireInfo.push($scope.Enquire.EnquireLists[0]);
						}
				    });
	            }

	            $scope.Enquire = {"LoginSessionKey":'',"EnquireID":'',"EnquireLists":[{"Name":'',"MobileNumber":'',"Email":'',"Address":'',"Remark":''}]}; 	
				$scope.RemoveLoader('AddEnquire');
            }else{
            	toastr.error(response.Message);
            }
        });
	}

	$scope.DeleteEnquire = function(LoginSessionKey,EnquireID){
            swal({
                title: "Are you sure?",
                text: "You want to delete enquire detail",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                closeOnConfirm: false
            },
            function () {
            	$scope.IsEnquireEdit = 0;
            	var reqData = {"LoginSessionKey" : LoginSessionKey,"EnquireID":EnquireID};
				profileService.deleteEnquire(reqData).then(function (response) {
		            if (response.ResponseCode == "200") {
		            	angular.forEach($scope.enquireInfo, function(value, key){
							if(EnquireID == value.EnquireID){
								$scope.enquireInfo.splice(key, 1);
							}
					    });
						swal("Deleted!", response.Message, "success");
		            }else{
		            	swal("Not Deleted!", response.Message, "error");
		            }
		        });
                
            });
	}

	$scope.IsEnquireEdit = 0;
	$scope.EditEnquire = function(EnquireID){
		angular.forEach($scope.enquireInfo, function(value, key){
			if(EnquireID == value.EnquireID){
				$scope.IsEnquireEdit = 1;
				$scope.Enquire = {"LoginSessionKey":'',"EnquireID":value.EnquireID,"EnquireLists":[{"Name":value.Name,"MobileNumber":value.MobileNumber,"Email":value.Email,"Address":value.Address,"Remark":value.Remark}]};
			}
	    });
	}

	// Enquire Code End

	$scope.SendArr = [];
	$scope.GetReferredIds = function(Id){
		if($('#data_'+Id).is(':checked')){
			$scope.SendArr.push(Id);
		}else{
			var index = $scope.SendArr.indexOf(Id);
			$scope.SendArr.splice(index, 1);
		}
	}

	$scope.GetEnquireIds = function(Id){
		if($('#data_'+Id).is(':checked')){
			$scope.SendArr.push(Id);
		}else{
			var index = $scope.SendArr.indexOf(Id);
			$scope.SendArr.splice(index, 1);
		}
	}

	$scope.SetSendType = function(Type){
		$scope.SendType = Type;
	}

	$scope.CountChar = function(){
		if($scope.text1.Conetnt.length == '160'){
			$scope.SendTextLimit = 0;
		}else{
			$scope.SendTextLimit = 160;
			if($scope.text1.Conetnt.length < $scope.SendTextLimit){
				$scope.SendTextLimit = $scope.SendTextLimit - $scope.text1.Conetnt.length;
			}
		}
	}

	$scope.SendMessage = function(LoginSessionKey,Type){
		if($scope.SendArr == ''){
			toastr.error("Please select atleast one person");
			return false;
		}else if($scope.text1.Conetnt == ''){
			toastr.error("Please enter send message");
			return false;
		}else if($scope.text1.Conetnt.length < 20){
			toastr.error("Message length should be greater than 20.");
			return false;
		}

		var reqData = {"LoginSessionKey":LoginSessionKey,"Type":Type,"SenderList":$scope.SendArr,"SendText":$scope.text1.Conetnt,"Subject":$scope.text1.Subject,"SendType":$scope.SendType};
		$scope.ShowLoader('SendMessage');
		profileService.SendMessage(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
    			$scope.SendType = 1;
				$scope.text1 = {};
				$scope.text1.Conetnt = '';
				$scope.text1.Subject = '';
				$scope.SendTextLimit = 160;
				$scope.RemoveLoader('SendMessage');
        		setTimeout(function(){
					location.reload();
				},1000);
            }else{
            	toastr.error(response.Message);
            }
        });
	}

	$scope.SendMessageToPatient = function(LoginSessionKey,PatientID){
		if($scope.text1.Conetnt == ''){
			toastr.error("Please enter send message");
			return false;
		}else if($scope.text1.Conetnt.length < 20){
			toastr.error("Message length should be greater than 20.");
			return false;
		}

		$scope.SendArr.push(PatientID);
		var reqData = {"LoginSessionKey":LoginSessionKey,"Type":"Patient","SenderList":$scope.SendArr,"SendText":$scope.text1.Conetnt,"Subject":$scope.text1.Subject,"SendType":$scope.SendType};
		$scope.ShowLoader('SendMessage');
		profileService.SendMessage(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
    			$scope.SendType = 1;
				$scope.text1 = {};
				$scope.text1.Conetnt = '';
				$scope.text1.Subject = '';
				$scope.SendTextLimit = 160;
				$scope.RemoveLoader('SendMessage');
        		setTimeout(function(){
					location.reload();
				},1000);
            }else{
            	toastr.error(response.Message);
            }
        });
	}

	$scope.PrintTable = function(TableID){
		var ignoreColumn = $("#"+TableID).data("ignorecolumn");
		$("#"+TableID).tableExport({
			type: 'pdf',
			escape: 'false',
			ignoreColumn: '['+ignoreColumn+']'
		});
	}

	$scope.getDashboardDetails = function(LoginSessionKey){
		var reqData = {"LoginSessionKey" : LoginSessionKey};
		profileService.getDashboardDetails(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.dashboard = response.Data;
				$scope.DashboardLoading = false;
            }
        });
	}

	$scope.getAccountLists = function(LoginSessionKey){
		var reqData = {"LoginSessionKey" : LoginSessionKey};
		profileService.getAccountLists(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.AccountLoading = false;
    			$scope.accountInfo = response.Data.Record;
            }
        });
	}

	$scope.addmore = function(type){
		var obj = {};
		if(type == 'Education'){
			obj = {"Year":"","DegreeName":"","CollageName":""}; 
			$scope.editphysioInfo.Educations.push(obj);
		} else if(type == 'Specialization'){
			obj = {"SpecializationName":""}; 
			$scope.editphysioInfo.Specializations.push(obj);
		} else if(type == 'Service'){
			obj = {"ServiceName":""}; 
			$scope.editphysioInfo.Services.push(obj);
		} else if(type == 'Registration'){
			obj = {"Year":"","RegistrationID":"","RegistrationFrom":""}; 
			$scope.editphysioInfo.Registrations.push(obj);
		} else if(type == 'Experience'){
			obj = {"FromYear":"","ToYear":"","Designation":"","CollageName":"","Locality":""}; 
			$scope.editphysioInfo.Experiences.push(obj);
		} else if(type == 'Award'){
			obj = {"Award":"","Year":""}; 
			$scope.editphysioInfo.Awards.push(obj);
		} else if(type == 'Membership'){
			obj = {"Membership":""}; 
			$scope.editphysioInfo.Memberships.push(obj);
		} else if(type == 'Stock'){
			obj = {"Name":'',"Description":'',"Make":'',"DOP":'',"Warrenty":'',"Remark":''};
			$scope.Stock.StockLists.push(obj);
			setTimeout(function(){
				$('.date-picker1').datepicker({
     				autoclose: true
     			});
     			
     			$('.date-picker2').datepicker({
     				autoclose: true
     			});
     		
			},1000);
		} else if(type == 'Referral'){
			obj = {"Name":'',"Qualification":'',"MobileNumber":'',"Email":'',"Address":'',"Remark":''};
			$scope.Referral.ReferralLists.push(obj);
		} else if(type == 'Enquire'){
			obj = {"Name":'',"MobileNumber":'',"Email":'',"Address":'',"Remark":''};
			$scope.Enquire.EnquireLists.push(obj);
		}
	}

	$scope.removeElement = function(type,Obj,index){
		angular.forEach(Obj, function(value, key){
			if(index == key){
				Obj.splice(index, 1);
			}
	    });

		if(type == 'Education'){
			$scope.editphysioInfo.Educations = Obj;
		}
	}


		
	$scope.couponCode = "";
	$scope.physioFee = 6000;
	
	$scope.discount = 00;

	$scope.couponSuccess = false;

	$scope.paymentBtnText = 'Proceed to pay';

	
	$scope.applyCoupon = function()
	{

		var LoginSessionKey = $("#LoginSessionKey").val();

		if($scope.couponCode=='physiotry')
		{
			$scope.physioFee = 1;
			$scope.discount = 5999;
			$scope.couponSuccess = true;
		}
		else
		{	
			var reqData = {"LoginSessionKey" : LoginSessionKey,CouponCode:$scope.couponCode};
			profileService.check_coupon_code(reqData).then(function (response) {

					if(response.ResponseCode==200)
					{
						$scope.discount = response.Data.Amount;
						$scope.physioFee = 6000 - response.Data.Amount;
						$scope.couponSuccess = true;
					}
					else
					{
							var shortCutFunction = 'error';
							var msg = response.Message;
							var $toast = toastr[shortCutFunction](msg, '');
					}
			});


		}
	}

	$scope.removeCoupon = function()
	{
		
		$scope.physioFee = 6000;
		$scope.discount = 00;
		$scope.couponSuccess = false;
	}



	$scope.assignObj = function (text,obj){
		$scope.removeError();
		/*if(text == 'GenearlInfo'){
			$scope.editphysioInfo = angular.copy($scope.physioInfo);
		}

		if(text == 'EducationInfo'){*/
			$scope.editphysioInfo = angular.copy($scope.physioInfo);
		//}
	}

	$scope.removeError = function(){
		$('.form-group').removeClass('has-error');
		$('.help-block').remove();
		$('.errorHandler').css('display','none');
		$('.form-group').removeClass('has-success');

		$scope.IsGeneralInfoError = 0;
		$scope.IsLocationInfoError = 0;
		$('.symbol').removeClass('ok');
		$('.symbol').addClass('required');
	}
    
    $scope.ShowLoader = function(id){
    	$('#'+id).html('');
    	$('#'+id).html('<i class="fa fa-circle-o-notch fa-spin"></i>');
    }

    $scope.RemoveLoader = function(id){
    	$('#'+id).html('');
    	if(id=="SendApproval"){
    		$('#'+id).html('Send For Approval');
    	}else{
    		$('#'+id).html('Save');
    	}
    }

    $scope.subscriptionHistory = "";
    $scope.getSubscriptionHistory = function(LoginSessionKey){
		$scope.IsEnquireEdit = 0;
		var reqData = {"LoginSessionKey" : LoginSessionKey};
		profileService.SubscriptionHistory(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.subscriptionHistory = response.Data;
				$scope.EnquireLoading = false;
            }
        });
	}

	$scope.PostPaymentData = {key:'',hash:'',txnid:'',email:'',phone:'',productinfo:'',surl:'',furl:'',action:'',firstname:''}
	
	$scope.proceesPayment = false;

	$scope.beforeMakePayment = function(LoginSessionKey)
	{	

		$scope.PostPaymentData = {};

		reqData = {LoginSessionKey:LoginSessionKey,Amount:$scope.physioFee}

		$http.post(SITE_URL+ 'api/profile/pre_payment', reqData).success(function (response) {   

			$scope.PostPaymentData = response.Data;
			
			$scope.paymentBtnText = 'Please wait...';
			$scope.proceesPayment = true;	

			setTimeout(function(){
				$("#PaymentSubmit").submit();
			},2000);

		});
	}

	$scope.PaymentHistory  = [];

	$scope.getBillingHistory = function(LoginSessionKey)
	{
		$scope.PostPaymentData = {};

		reqData = {LoginSessionKey:LoginSessionKey}

		$http.post(SITE_URL+ 'api/profile/payment_history', reqData).success(function (response) {   

			$scope.PaymentHistory = response.Data;
		
		});
	}

}).filter('abs', function () {
  return function(val) {
    return Math.abs(val);
  }
}).filter('range', function() {
  return function(input, total) {
    total = parseInt(total);

    for (var i=0; i<total; i++) {
      input.push(i);
    }

    return input;
  };
}).directive('validNumber', function() {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        if (angular.isUndefined(val)) {
            var val = '';
        }
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });

      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});
