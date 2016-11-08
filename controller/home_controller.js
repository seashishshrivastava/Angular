/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('App').controller('HomeCtrl', function ($scope, $rootScope, $element, homeService) {

	$scope.physio = {"ClinicName":'',"FirstName":'',"LastName":'',"MobileNumber":'',"Email":'',"Source":'Web'};
    $scope.responseMess = "You have some form errors. Please check below.";
    $scope.IsRegError = 1;
    $scope.IsRegLoader = 0; 
     
    $scope.physioLogin = {"Username":'',"Password":'',"Source":'Web'};
    $scope.IsLogError = 1;
    $scope.IsLogLoader = 0;

    $scope.physioForgetPassword = {"Username":''};
    $scope.IsForgetError = 1;
    $scope.IsForgetLoader = 0;

	$scope.removeError = function(){
		$('.form-group').removeClass('has-error');
		$('.help-block').remove();
		$('.errorHandler').css('display','none');
	}
    
	$scope.registerPhysio = function(){

		if(!$scope.physio.ClinicName || !$scope.physio.FirstName || !$scope.physio.LastName || !$scope.physio.MobileNumber || !$scope.physio.Email){
			return false;
		}else{
		    $scope.IsRegLoader = 1; 
			$('.errorHandler').css('display','none');
			homeService.Registration($scope.physio).then(function (response) {
				$('.errorHandler').css('display','block');
	            if (response.ResponseCode == "200") {
                    $scope.responseMess = response.Message;
    				$scope.IsRegError = 0;
    				$scope.physio = {"ClinicName":'',"FirstName":'',"LastName":'',"MobileNumber":'',"Email":'',"Source":'Web'};
                } else {
                    $scope.responseMess = response.Message;
    				$scope.IsRegError = 1;
                }
                 $scope.IsRegLoader = 0; 
	        });
		}
	}
	
	$scope.registerPatients = function(){
		//alert('Loading...');
		$('.errorHandler').css('display','block');
		if(!$scope.physioLogin.Name){
			$scope.IsLogError = 1;
			$scope.responseMess = 'Please enter your name.';
			return false;
		}else if(!$scope.physioLogin.Address){
			$scope.IsLogError = 1;
			$scope.responseMess = 'Please enter your address.';
			return false;
		}else if(!$scope.physioLogin.Email){
			$scope.IsLogError = 1;
			$scope.responseMess = 'Please enter your Email.';
			return false;
		}else if(!$scope.physioLogin.Mobile){
			$scope.IsLogError = 1;
			$scope.responseMess = 'Please enter your mobile.';
			return false;
		}else if(!$scope.physioLogin.MemberShip){
			$scope.IsLogError = 1;
			$scope.responseMess = 'Please enter your qualification type.';
			return false;
		}else{
			$scope.IsRegLoader = 1; 
			$('.errorHandler').css('display','none');
			homeService.registerPatients($scope.physio).then(function (response) {
				$('.errorHandler').css('display','block');
	            alert(response.ResponseCode);
				if (response.ResponseCode == "200") {
                    $scope.responseMess = response.Message;
    				$scope.IsRegError = 0;
    				$scope.physio = {"ClinicName":'',"FirstName":'',"LastName":'',"MobileNumber":'',"Email":'',"Source":'Web'};
                } else {
                    $scope.responseMess = response.Message;
    				$scope.IsRegError = 1;
                }
                 $scope.IsRegLoader = 0; 
	        });
		}		
	}
	
	$scope.callLoginFunc = function(e){
		if(e.which == 13) {
			$scope.loginPhysio();	  
			e.preventDefault();
			e.stopPropagation();   
	    }
	}

	$scope.loginPhysio = function(){
		$('.errorHandler').css('display','block');
		if(!$scope.physioLogin.Username){
			$scope.IsLogError = 1;
			$scope.responseMess = 'Please enter username';
			return false;
		}else if(!$scope.physioLogin.Password){
			$scope.IsLogError = 1;
			$scope.responseMess = 'Please enter password';
			return false;
		}else{
		    $scope.IsLogLoader = 1;
			$('.errorHandler').css('display','none');
			homeService.Login($scope.physioLogin).then(function (response) {
				$('.errorHandler').css('display','block');
	            if (response.ResponseCode == "200") {
                    $scope.responseMess = response.Message;
    				$scope.IsLogError = 0;
    				$scope.physioLogin = {"Username":'',"Password":'',"Source":'Web'};
    				console.log($(window).width());
    				
    				if($(window).width() < 769)
    				{
    					console.log('mobile');
    					window.location.href = "mobile";
    				}
    				else{
    					console.log('Desktop'); 
    					window.location.href = "calendar";
    				}

                } else {
                    $scope.responseMess = response.Message;
    				$scope.IsLogError = 1;
                }
                 $scope.IsLogLoader = 0;
	        });
		}
	}

	$scope.ForgetPWDPhysio = function(){
		if(!$scope.physioForgetPassword.Username){
			return false;
		}else{
			$scope.IsForgetLoader = 1;
			$('.errorHandler').css('display','none');
			homeService.ForgetPassword($scope.physioForgetPassword).then(function (response) {
				$('.errorHandler').css('display','block');
	            if (response.ResponseCode == "200") {
                    $scope.responseMess = response.Message;
    				$scope.IsForgetError = 0;
    				$scope.physioForgetPassword = {"Username":''};
                } else {
                    $scope.responseMess = response.Message;
    				$scope.IsForgetError = 1;
                }
                $scope.IsForgetLoader = 0;
	        });
		}
	}


});
