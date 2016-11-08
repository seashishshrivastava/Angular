/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('App').controller('SettingCtrl', function ($scope, $rootScope, $element, commonService) {
    $scope.pdf_setting = {};
    $scope.pdf_setting.is_logo = 'no';
    
    $scope.printout_setting = {};
    $scope.printout_setting.is_logo = 'no';
    
    $scope.emalPDFSetting = function(Login_session_key)
    {
        $scope.pdf_setting.LoginSessionKey = Login_session_key;
        var PostData = $scope.pdf_setting;
        commonService.commonApiCall(PostData, 'api/setting/update_email_pdf_setting').then(function (response) {            
            toastr.success(response.Message);
            location.reload();
        }, function (error) {
            toastr.error(error.Message);
        });        
    }
    
    $scope.UploadLogo = function(LoginSessionKey)
    {
        var logo = $('.fileupload-preview').find('img').attr('src');
        if(logo == '' || logo == undefined)
        {
            toastr.error('Invalid file');
            $('#remove').click();
        }
        else
        {
            var PostData = {"LoginSessionKey":LoginSessionKey,logo:logo};
            commonService.commonApiCall(PostData, 'api/setting/upload_logo').then(function (response) {            
                toastr.success(response.Message);
            }, function (error) {
                toastr.error(error.Message);
                $('#remove').click();
            });
        }
    }
    
    $scope.getEmailPdfSetting = function(LoginSessionKey)
    {
        var PostData = {"LoginSessionKey":LoginSessionKey};
        commonService.commonApiCall(PostData, 'api/setting/get_email_pdf_setting').then(function (response) { 
	    if(response.Data != ''){         
	            $scope.pdf_setting = response.Data;
	    }           
            
        }, function (error) {
            toastr.error(error.Message);
        });  
    }
    
    $scope.printoutSetting = function(Login_session_key)
    {
        $scope.printout_setting.LoginSessionKey = Login_session_key;
       
        var PostData = $scope.printout_setting;
        commonService.commonApiCall(PostData, 'api/setting/update_printout_setting').then(function (response) {            
            toastr.success(response.Message);
            location.reload();
        }, function (error) {
            toastr.error(error.Message);
        });        
    }
    
    $scope.getPrintoutSetting = function(LoginSessionKey)
    {
        var PostData = {"LoginSessionKey":LoginSessionKey};
        commonService.commonApiCall(PostData, 'api/setting/get_printout_setting').then(function (response) {  
	    if(response.Data != ''){         
	            $scope.printout_setting = response.Data;
	    }
        }, function (error) {
            toastr.error(error.Message);
        });  
    }
    
    $scope.UploadPrintoutLogo = function(LoginSessionKey)
    {
        var logo = $('.fileupload-preview').find('img').attr('src');
        if(logo == '' || logo == undefined)
        {
            toastr.error('Invalid file');
            $('#remove').click();
        }
        else
        {
            var PostData = {"LoginSessionKey":LoginSessionKey,logo:logo};
            commonService.commonApiCall(PostData, 'api/setting/upload_printout_logo').then(function (response) {            
                toastr.success(response.Message);
            }, function (error) {
                toastr.error(error.Message);
                $('#remove').click();
            });
        }
    }
});
