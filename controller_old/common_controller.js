
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('App').controller('CommonCtrl', function ($scope, $rootScope, $element, commonServices) {

	$scope.Feedback = {"LoginSessionKey":'',"Type":'Suggestion',"Text":''};
	$scope.feedbackOptions = [{"Type":'Suggestion',"TypeName":'Suggestion'},{"Type":'Issue',"TypeName":'Issue'},{"Type":'Complain',"TypeName":'Complain'}];

	$scope.getPhysioInfo = function(LoginSessionKey){
		$scope.Feedback.LoginSessionKey = LoginSessionKey;
	}
    
	$scope.submitFeedback = function(){
		$('#FeedbackForm').html('');
    	$('#FeedbackForm').html('<i class="fa fa-circle-o-notch fa-spin"></i>');
		commonServices.submitFeedback($scope.Feedback).then(function (response) {
            if (response.ResponseCode == "200") {
				$('#FeedbackForm').html('');
    			$('#FeedbackForm').html('Submit');
    			$('#myModal_feedback').modal('hide');
    			$scope.Feedback.Type = 'Suggestion';
				$scope.Feedback.Text = "";
    			toastr.success(response.Message);
            }else{
            	$('#FeedbackForm').html('');
    			$('#FeedbackForm').html('Submit');
            	toastr.clear();
            	toastr.error(response.Message);
            }
        });
	}

	$scope.resetFeedbackForm = function(){
		$('#FeedbackForm').html('');
		$('#FeedbackForm').html('Submit');
		$scope.Feedback.Type = 'Suggestion';
		$scope.Feedback.Text = "";
	}
});
