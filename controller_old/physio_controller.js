/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('App').controller('PhysioCtrl', function ($scope, $rootScope, $element, physioService) {

	$scope.LoginSessionKey = '';
	$scope.patientInfo = {};
	$scope.Count = 0;
	
	$scope.PatientID = '';
	$scope.IsShow = false;
	$scope.MStatus = [{"Type":"1","Display":"Married"},{"Type":"2","Display":"Un-Married"}]
	$scope.EditLoading = false;

	// search patient parameter
	$scope.PageNo = 1;
	$scope.PageRecord = 20;
	$scope.PatientList = [];
	$scope.PatientLoading = true;
	$scope.search = '';
	$scope.SearchActive = 1;
	$scope.SearchLoading = false;
	$scope.IsSearchActive = 1;

	// invertigation parameter
	$scope.InvestType = '';
	$scope.Investigation = {};
	$scope.Datas = [{'Description':'','Date':'','Image':''}];
	$scope.InvestigationList = {};
	$scope.InvestigationLoading = true;

	// prescription parameter
	$scope.prescriptionOptions = {'Category1':'1','Category2':'1','Category3':'1'};
	$scope.prescriptionList = {};
	$scope.prescriptionImages = {};
	$scope.ShowImageDiv = false;
	$scope.ShowDescriptionDiv = false;
	$scope.PresList = {};
	$scope.PresLoading = true;

	$scope.ElectorPrec = {"LoginSessionKey":'',"PatientID":'','eletrotherapys':[{"Name":'',"Dosage":'',"Days":'',"Remark":''}]};
	$scope.elctorCount =  1;

	$scope.OtherPrec = {"LoginSessionKey":'',"PatientID":'','Others':[{"Description":''}]};
	$scope.otherCount =  1;

	// problem list and aim of physoitherapy
	$scope.Forms = {"LoginSessionKey":'',"PatientID":'',"Type":'','texts':[{"Description":''}]};
	$scope.FormCount =  1;
	$scope.ProblemList = {};
	$scope.ProblemLoading = true;

	// home advice parameter
	$scope.HomeAdviceType = '';
	$scope.HomeAdvices = {"LoginSessionKey":'',"PatientID":'',"Type":'',"Advices":[{'Description':""}]};
	$scope.HomeAdviceList = {};
	$scope.HomeAdviceLoading = true;

	// daily record parameter
	$scope.DailyRecord = {"LoginSessionKey":'',"PatientID":'',"Records":[{'Date':"",'Vitals':"",'Remark':""}]};
	$scope.RecordList = {};
	$scope.RecordLoading = true;

	// bill and account parameter
	$scope.BillLoading = true;
	$scope.FinalAmount = 0;
	$scope.getBillRecords = {};
	$scope.addBillRecord  = {"LoginSessionKey":'',"PatientID":'','Treatment':"",'Description':"",'Session':"",'CostPerSession':"",'Discount':"",'Tax':"",'Total':""};
	$scope.AmountReceive = {"LoginSessionKey":'',"PatientID":'','AmountTotal':""};	
	$scope.AmountLoading = true;
	$scope.getAmountRecords = {};


	$scope.init = function(LoginSessionKey){
		$scope.LoginSessionKey = LoginSessionKey;
	}

	$scope.resetForm = function(Type){
		$('.form-group').removeClass('has-error');
		$('.form-group').removeClass('has-success');
		$('.help-block').remove();
		$('.errorHandler').css('display','none');
		if(Type === 'AddPatient'){
			$scope.patientInfo = {};
			$scope.patientInfo.Gender = 'Male';
			$scope.patientInfo.MaritalStatus = '1';
			$scope.patientInfo.Notes = [{"Text":''}];
			$scope.Count = 0;
			$scope.patientInfo.referredID = '';

		}
	}

	$scope.SetDefaultPara = function(Type){
		$scope.InvestType = Type;
		$scope.Investigation = {};
		$scope.Investigation.Type = Type; 
		$scope.Investigation.LoginSessionKey = $scope.LoginSessionKey;
		//if(Type == '1'){
			$scope.Datas = [{'Description':'','Date':'','Image':''}];
		//}
		setTimeout(function(){
			$('.date-picker').datepicker({
 				autoclose: true
 			});
		},1000);
	}

	$scope.redirect = function(Type){
		if(Type == 'investigation'){
			location.href =  SITE_URL+"patient/investigation/"+$scope.PatientID;
		}else if(Type == 'prescription'){
			location.href =  SITE_URL+"patient/prescription/"+$scope.PatientID;
		}
	}


	$scope.SubmitPhysioDetails = function(){
		setTimeout(function(){
			if($('.form-group').hasClass('has-error')){
				return false;
			}else{
				$scope.ShowLoader('addPatienSubmit');
				
				$scope.patientInfo.ParentPhysioID = $("#UserID").val();
				$scope.patientInfo.ClinicName = $("#clinicName").val()
				$scope.patientInfo.Source = 'web';

				physioService.AddPhysio($scope.patientInfo).then(function (response) {
		            if (response.ResponseCode == "200") {
		            	toastr.success(response.Message);
		     	setTimeout(function(){
		            		location.href = SITE_URL+"physio/ManagePhysio";
		            	},1500);
		            }else{
		            	toastr.error(response.Message);
		            }
		            $scope.RemoveLoader('addPatienSubmit','');
		        });
			}
		},500);
	}

	$scope.SaveInvestigationDetails = function(PatientID){
		for (var i = 0; i < $scope.Datas.length; i++) {
			var text = $('#image_'+i+' .fileupload-preview').find('img').attr('src');
			if(text != '' && text != undefined){
				$scope.Datas[i].Image = text;
			}
		};
		$scope.Investigation.PatientID  = PatientID;
		$scope.Investigation.ReportDetails = $scope.Datas;

		$scope.ShowLoader('SaveInvestigation');
		patientService.SaveInvestigation($scope.Investigation).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
            	$scope.SetDefaultPara($scope.InvestType);
            	$scope.InvestigationLoading = true;
				$scope.getInvestigationList($scope.Investigation.LoginSessionKey,PatientID);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('SaveInvestigation','');
        });
	}

	$scope.getSearchPatientList = function(LoginSessionKey,init){
		if($scope.search !=''){
			$scope.IsSearchActive = 1;
			
			if($scope.search.length>2)
			{
				$scope.SearchLoading = true;
				$scope.getPhysioList(LoginSessionKey,init);
			
			}

		}
		else
		{
			
				$scope.SearchLoading = true;
				$scope.getPhysioList(LoginSessionKey,init);
		}
	}

	$scope.DeletePatient = function(LoginSessionKey,PatientID){
		swal({
            title: "Are you sure?",
            text: "You want to delete patient detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID};
			patientService.deletePatient(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					//location.reload();
					angular.forEach($scope.PatientList, function(value, key){
						if(value.PatientID == PatientID){
							$scope.PatientList.splice(key, 1);
						}
				    });

	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

$scope.delete_physio = function(LoginSessionKey,PhysioID,$index){

		swal({
            title: "Are you sure?",
            text: "You want to delete this physio",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        
		$scope.LoginSessionKey = LoginSessionKey;
		$scope.PhysioID = PhysioID;
		var reqData = {LoginSessionKey:LoginSessionKey,PhysioID:$scope.PhysioID}; 
		physioService.deletePhysio(reqData).then(function (response) {
        
	        if (response.ResponseCode == "200") {
	        	$scope.PatientList.splice($index,1);
	        	swal("Deleted!", response.Message, "success");

	    		toastr.success('Physio removed successfully');
	    	}
	    	else
	    	{
	    		swal("Not Deleted!", response.Message, "error");	
	    	}
		})
	});
}
	$scope.getPhysioList = function(LoginSessionKey,init){
		$scope.LoginSessionKey = LoginSessionKey;

		if(init == '1'){
			$scope.PageNo = 1;
			$scope.PageRecord = 20;
			$scope.PatientList = [];
			$scope.PatientLoading = true;
		}

		var reqData = {LoginSessionKey:LoginSessionKey,PageNo:$scope.PageNo,PageRecord:$scope.PageRecord,Search:$scope.search}; 
		physioService.getPhysioList(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.PatientList = response.Data.PatienList;
            	$scope.TotalRecord = response.Data.TotalRecord;

            	$scope.PaginationShow  = false;
            	if($scope.TotalRecord > $scope.PatientList.length){
            		$scope.PaginationShow  = true;
            	}

            	setTimeout(function(){
					if ($(".tooltips").length) {
		               $('.tooltips').tooltip();
		            }
				},1000);
            	
            }else{
            	toastr.error(response.Message);
            }
            $scope.PatientLoading = false;
            $scope.SearchLoading = false;
        });
	}

	$scope.getPatientDetail = function(LoginSessionKey,PatientID){
		var reqData = {LoginSessionKey:LoginSessionKey,PatientID:PatientID}; 
		patientService.getPatientDetail(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	    $scope.patientInfo 	= response.Data;   
            	    $scope.PatientID 	= response.Data.PatientID; 
            	    $scope.IsShow 		= true; 	
            	    $scope.EditLoading 	= true;
            	    $scope.Count 		= $scope.patientInfo.Notes.length - 1;
            }else{
            	toastr.error(response.Message);
            	setTimeout(function(){
            		location.href = SITE_URL+"patient/search";
            	},500);
            }
        });
	}

	$scope.getPrescriptionList = function(LoginSessionKey){
		$scope.LoginSessionKey = LoginSessionKey;
		var reqData = {LoginSessionKey:LoginSessionKey}; 
		patientService.getPrescriptionList(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
                $scope.prescriptionList = response.Data;
            	$scope.PatientLoading = false;
            }else{
            	toastr.error(response.Message);
            }
        });
	}

	$scope.LoadCategory3 = function(){
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,Category:"3",CatPID:$scope.prescriptionOptions.Category1,CatSPID:$scope.prescriptionOptions.Category2}; 
		$.blockUI({
            message: '<i class="fa fa-spinner fa-spin"></i>'
        });
		patientService.getCategory(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
                $scope.prescriptionList.category_3 = response.Data;
                $scope.prescriptionOptions.Category3 = $scope.prescriptionList.category_3[0].id;
            	$scope.PatientLoading = false;
            }else{
            	toastr.error(response.Message);
            }
            $.unblockUI();
        });
	}

	$scope.SaveElectroPrescription = function(PatientID){
		$scope.ShowLoader('SaveElectroPrescription');
		$scope.ElectorPrec.LoginSessionKey 	= $scope.LoginSessionKey;
		$scope.ElectorPrec.PatientID 		= PatientID;

		patientService.SaveElectroPrescription($scope.ElectorPrec).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
				$scope.ElectorPrec = {"LoginSessionKey":'',"PatientID":'','eletrotherapys':[{"Name":'',"Dosage":'',"Days":'',"Remark":''}]};
				$scope.elctorCount =  1;
				$scope.getPrescList($scope.LoginSessionKey,PatientID);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('SaveElectroPrescription','Submit');
        });
	}

	$scope.SaveOtherPrescription = function(PatientID){
		$scope.ShowLoader('SaveOtherPrescription');
		$scope.OtherPrec.LoginSessionKey 	= $scope.LoginSessionKey;
		$scope.OtherPrec.PatientID 		= PatientID;

		patientService.SaveOtherPrescription($scope.OtherPrec).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
				$scope.OtherPrec = {"LoginSessionKey":'',"PatientID":'','Others':[{"Description":''}]};
				$scope.otherCount =  1;
				$scope.getPrescList($scope.LoginSessionKey, PatientID);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('SaveOtherPrescription','Submit');
        });
	}

	$scope.GetImages = function(){
		$scope.ShowDescriptionDiv = false;
		$scope.ShowImageDiv = true;
		$scope.ShowLoader('getPrescription');
		var reqData = {LoginSessionKey:$scope.LoginSessionKey,Category1:$scope.prescriptionOptions.Category1,Category2:$scope.prescriptionOptions.Category2,Category3:$scope.prescriptionOptions.Category3};
		$scope.LoadingImages = true;
		patientService.GetImages(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.prescriptionImages = response.Data;				
				runImagePicker();
            }else{
            	toastr.error(response.Message);
            }
            $scope.LoadingImages = false;
            $scope.RemoveLoader('getPrescription','Search');
        });
	}

	$scope.AddDescription = function(){
		$.blockUI({
            message: '<i class="fa fa-spinner fa-spin"></i>'
        });
	
        /*$scope.presObj = {};
        $scope.presObj = $scope.prescriptionOptions;*/
        $scope.prescriptionOptions.images = [];
        angular.forEach($scope.prescriptionImages, function(value, key){
			if(value.IsSelected == '1'){
				$scope.prescriptionOptions.images.push(value); 
			}
	    });
    	$.unblockUI();
    	$scope.ShowImageDiv = false;
		$scope.ShowDescriptionDiv = true;
	}

	$scope.SubmitForm = function(LoginSessionKey,PatientID,FormType){
		$scope.Forms.LoginSessionKey = LoginSessionKey;
		$scope.Forms.PatientID = PatientID;
		$scope.Forms.Type = FormType;

		$scope.ShowLoader('FormAction');
		patientService.SubmitForm($scope.Forms).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
            	$scope.ProblemLoading = true;
            	$scope.getProblemList(LoginSessionKey,PatientID,FormType);
				$scope.Forms = {"LoginSessionKey":'',"PatientID":'',"Type":'','texts':[{"Description":''}]};
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('FormAction','');
        });
	}

	$scope.SubmitData = function(PatientID){
		$scope.ShowLoader('submitData');
		$scope.prescriptionOptions.LoginSessionKey = $scope.LoginSessionKey;
		$scope.prescriptionOptions.PatientID = PatientID;
		patientService.SubmitData($scope.prescriptionOptions).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
				$scope.prescriptionOptions = {'Category1':'1','Category2':'1','Category3':'1'};
				$scope.prescriptionImages = {};
				$scope.ShowImageDiv = false;
				$scope.ShowDescriptionDiv = false;
				$scope.getPrescList($scope.LoginSessionKey,PatientID);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('submitData','Submit');
        });
	}

	$scope.SetDefaultHomeAdvice = function(Type,PatientID){
		$scope.HomeAdviceType = Type;
		$scope.HomeAdvices = {"LoginSessionKey":'',"PatientID":'',"Type":'',"Advices":[{'Description':""}]};
		$scope.HomeAdvices.Type = Type; 
		$scope.HomeAdvices.PatientID = PatientID; 
		$scope.HomeAdvices.LoginSessionKey = $scope.LoginSessionKey;
	}

	$scope.SaveHomeAdviceDetails = function(){
		$scope.ShowLoader('SaveHomeAdvice');
		patientService.SaveHomeAdvice($scope.HomeAdvices).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
            	$scope.SetDefaultHomeAdvice($scope.HomeAdviceType,$scope.HomeAdvices.PatientID);
            	$scope.HomeAdviceLoading = false;
				$scope.getHomeAdviceList($scope.HomeAdvices.LoginSessionKey,$scope.HomeAdvices.PatientID);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('SaveHomeAdvice','');
        });
	}

	$scope.SaveDailyRecord = function(LoginSessionKey,PatientID){
		$scope.DailyRecord.LoginSessionKey = LoginSessionKey;
		$scope.DailyRecord.PatientID = PatientID;

		$scope.ShowLoader('DailyRecord');
		patientService.SaveDailyRecord($scope.DailyRecord).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
            	$scope.RecordLoading = true;
            	$scope.getDailyRecordList(LoginSessionKey,PatientID);
            	$scope.DailyRecord = {"LoginSessionKey":'',"PatientID":'',"Records":[{'Date':"",'Vitals':"",'Remark':""}]};
            	setTimeout(function(){
				$('.date-picker').datepicker({
	 				autoclose: true
	 			});
			},1000);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('DailyRecord','Save');
        });
	}

	$scope.getBillRecords = function(LoginSessionKey,PatientID){
		var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID};
		patientService.getBillLists(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.getBillRecords = response.Data.Record;
				$scope.BillLoading = false;
				$scope.FinalAmount = response.Data.TotalAmount;
            }
        });
	}

	$scope.DeleteBill = function(LoginSessionKey,PatientID,BillID){
		swal({
            title: "Are you sure?",
            text: "You want to delete bill detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"BillID":BillID};
			patientService.deleteBill(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					location.reload();
	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

	$scope.getAmountRecords = function(LoginSessionKey,PatientID){
		var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID};
		patientService.getAmountLists(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.getAmountRecords = response.Data.Record;
				$scope.AmountLoading = false;
            }
        });
	}

	$scope.DeleteAmount = function(LoginSessionKey,PatientID,AmountID){
		swal({
            title: "Are you sure?",
            text: "You want to delete amount detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"AmountID":AmountID};
			patientService.deleteAmount(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					location.reload();
	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

	$scope.SaveBill = function(LoginSessionKey,PatientID){
		$scope.addBillRecord.LoginSessionKey = LoginSessionKey;
		$scope.addBillRecord.PatientID = PatientID;

		$scope.ShowLoader('addBillRecord');
		patientService.SaveBill($scope.addBillRecord).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
            	setTimeout(function(){
            		location.reload();
            	},1000);
            	$scope.FinalAmount = $scope.FinalAmount + parseFloat($scope.addBillRecord.Total);
            	$scope.addBillRecord  = {"LoginSessionKey":'',"PatientID":'','Treatment':"",'Description':"",'Session':"",'CostPerSession':"",'Discount':"",'Tax':"",'Total':""};
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('addBillRecord','Save');
        });
	}

	$scope.getProblemList = function(LoginSessionKey,PatientID,Type){
		var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"Type":Type};
		patientService.getProblemLists(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.ProblemList = response.Data.Record;
				$scope.ProblemLoading = false;
            }
        });
	}

	$scope.DeleteForm = function(LoginSessionKey,PatientID,FormID,FormType){
		swal({
            title: "Are you sure?",
            text: "You want to delete form detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"FormID":FormID,"FormType":FormType};
			patientService.deleteForm(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					$scope.ProblemLoading = true;
					$scope.getProblemList(LoginSessionKey,PatientID,FormType);
	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

	$scope.getDailyRecordList = function(LoginSessionKey,PatientID){
		var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID};
		patientService.getDailyRecordList(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.RecordList = response.Data.Record;
				$scope.RecordLoading = false;
            }
        });
	}

	$scope.DeleteRecord = function(LoginSessionKey,PatientID,RecordID){
		swal({
            title: "Are you sure?",
            text: "You want to delete record detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"RecordID":RecordID};
			patientService.deleteRecord(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					$scope.RecordLoading = true;
					$scope.getDailyRecordList(LoginSessionKey,PatientID);
	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

	$scope.getInvestigationList = function(LoginSessionKey,PatientID){
		var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID};
		patientService.getInvestigationList(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.InvestigationList = response.Data.Record;
				$scope.InvestigationLoading = false;
            }
        });
	}
	
	$scope.DeleteInvestigation = function(LoginSessionKey,PatientID,RecordID){
		swal({
            title: "Are you sure?",
            text: "You want to delete investigation detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"RecordID":RecordID};
			patientService.deleteInvestigation(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					$scope.InvestigationLoading = true;
					$scope.getInvestigationList(LoginSessionKey,PatientID);
	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

	$scope.getHomeAdviceList = function(LoginSessionKey,PatientID){
		var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID};
		patientService.getHomeAdviceList(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	$scope.HomeAdviceList = response.Data.Record;
				$scope.HomeAdviceLoading = false;
            }
        });
	}

	$scope.DeleteHomeAdvice = function(LoginSessionKey,PatientID,RecordID){
		swal({
            title: "Are you sure?",
            text: "You want to delete home advice detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"RecordID":RecordID};
			patientService.deleteHomeAdvice(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					$scope.HomeAdviceLoading = false;
					$scope.getHomeAdviceList(LoginSessionKey,PatientID);
	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

	$scope.getPrescList = function(LoginSessionKey, PatientID){
		var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID};
		patientService.getPrescList(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.PresList = response.Data.Record;;
				$scope.PresLoading = true;
            }
        });
	}

	$scope.DeletePres = function(LoginSessionKey,PatientID,RecordID,Type){
		swal({
            title: "Are you sure?",
            text: "You want to delete prescription detail",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function () {
        	var reqData = {"LoginSessionKey" : LoginSessionKey,"PatientID":PatientID,"RecordID":RecordID,"Type":Type};
			patientService.deletePres(reqData).then(function (response) {
	            if (response.ResponseCode == "200") {
					swal("Deleted!", response.Message, "success");
					$scope.getPrescList(LoginSessionKey,PatientID);
					if(Type == '3'){
						$('#otherPres').modal('hide')
					}else if(Type == '2'){
						$('#generalPres').modal('hide')
					}else if(Type == '1'){
						$('#electroPres').modal('hide')
					}
	            }else{
	            	swal("Not Deleted!", response.Message, "error");
	            }
	        });
        });
	}

	$scope.CalculateTotal = function(){
		if($scope.addBillRecord.Session !='' && $scope.addBillRecord.CostPerSession !=''){
			$scope.addBillRecord.Total = parseFloat($scope.addBillRecord.Session) * parseFloat($scope.addBillRecord.CostPerSession);
			if($scope.addBillRecord.Tax != ''){
				$scope.addBillRecord.Total = $scope.addBillRecord.Total + parseFloat($scope.addBillRecord.Tax);
			}

			if($scope.addBillRecord.Discount != ''){
				$scope.addBillRecord.Total = $scope.addBillRecord.Total - parseFloat($scope.addBillRecord.Discount);
			}
		}
	}

	$scope.removeError = function(){
		$scope.AmountReceive = {"LoginSessionKey":'',"PatientID":'','AmountTotal':""};	
	}

	$scope.PrintTable = function(TableID){
		var ignoreColumn = $("#"+TableID).data("ignorecolumn");
		$("#"+TableID).tableExport({
			type: 'pdf',
			escape: 'false',
			ignoreColumn: '['+ignoreColumn+']'
		});
	}

	$scope.AmountInfo = function(LoginSessionKey,PatientID){
		$scope.AmountReceive.LoginSessionKey = LoginSessionKey;
		$scope.AmountReceive.PatientID = PatientID;

		$scope.ShowLoader('AmountForm');
		patientService.SaveAmount($scope.AmountReceive).then(function (response) {
			$('#submitPayment').modal('hide');
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
            	setTimeout(function(){
            		location.reload();
            	},1000);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('AmountForm','Save');
        });
	}

	$scope.addmore = function(Type){
		if(Type == 'ElectroPres'){
			var obj = {"Name":'',"Dosage":'',"Days":'',"Remark":''};
			$scope.ElectorPrec.eletrotherapys.push(obj);
			$scope.elctorCount++;
		}else if(Type == 'OtherPrec'){
			var obj = {"Description":''};
			$scope.OtherPrec.Others.push(obj);
			$scope.otherCount++;
		}else if(Type == 'Forms'){
			var obj = {"Description":''};
			$scope.Forms.texts.push(obj);
			$scope.FormCount++;
		}else if(Type == 'HomeAdvice'){
			var obj = {"Description":''};
			$scope.HomeAdvices.Advices.push(obj);
		}else if(Type == 'DailyRecord'){
			var obj = {'Date':"",'Vitals':"",'Remark':""};
			$scope.DailyRecord.Records.push(obj);
			setTimeout(function(){
				$('.date-picker').datepicker({
	 				autoclose: true
	 			});
			},1000);
		}else{
			var obj = {'Description':'','Date':'','Image':''};
			$scope.Datas.push(obj);
			setTimeout(function(){
				$('.date-picker').datepicker({
	 				autoclose: true
	 			});
			},1000);
		}
	}

	$scope.removeElement = function(type,Obj,index){
		angular.forEach(Obj, function(value, key){
			if(index == key){
				Obj.splice(index, 1);
			}
	    });

		/*if(type == 'Education'){
			$scope.editphysioInfo.Educations = Obj;
		}*/
	}

    $scope.ShowLoader = function(id){
    	$('#'+id).html('');
    	$('#'+id).html('<i class="fa fa-circle-o-notch fa-spin"></i>');
    }

    $scope.RemoveLoader = function(id,Text){
    	$('#'+id).html('');
    	if(Text != ''){
    		$('#'+id).html(Text);
    	}else{
    		$('#'+id).html('Save');
    	}
    }

    $scope.addNotes = function(){
    	$scope.Count++;
    	obj = {"Text":''}; 
    	$scope.patientInfo.Notes.push(obj);
    }

    var runImagePicker = function () {
	  	setTimeout(function(){
		    $('.portfolio-item .chkbox').bind('click', function () {
		        if ($(this).parent().hasClass('selected')) {
		            var index = $(this).parent().parent().attr('data-cat');
		            $scope.prescriptionImages[index].IsSelected = 0;
		            $(this).parent().removeClass('selected').children('a').children('img').removeClass('selected');
		        } else {
		        	var index = $(this).parent().parent().attr('data-cat');
		        	$scope.prescriptionImages[index].IsSelected = 1;
		            $(this).parent().addClass('selected').children('a').children('img').addClass('selected');
		        }
		    });
		},1500);
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
}).directive('floatNumber', function() {
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
        var clean = val.replace(/[^0-9\.]/g, '');
        var decimalCheck = clean.split('.');

        if(!angular.isUndefined(decimalCheck[1])) {
            decimalCheck[1] = decimalCheck[1].slice(0,2);
            clean =decimalCheck[0] + '.' + decimalCheck[1];
        }

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
