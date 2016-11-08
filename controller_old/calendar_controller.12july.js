/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('App').controller('CalendarCtrl', function ($scope, $rootScope, $element, calendarService) {

	// calendar setting parameters

	$scope.IsLoading = true;
	$scope.getInfo = {"LoginSessionKey":''};
	$scope.setting = {};
	$scope.Slots = {};
	$scope.Hours = [{"Type":"24","Display":"12 am"},{"Type":"1","Display":"1 am"},{"Type":"2","Display":"2 am"},
					{"Type":"3","Display":"3 am"},{"Type":"4","Display":"4 am"},{"Type":"5","Display":"5 am"},
					{"Type":"6","Display":"6 am"},{"Type":"7","Display":"7 am"},{"Type":"8","Display":"8 am"},
					{"Type":"9","Display":"9 am"},{"Type":"10","Display":"10 am"},{"Type":"11","Display":"11 am"},
					{"Type":"12","Display":"12 pm"},{"Type":"13","Display":"1 pm"},{"Type":"14","Display":"2 pm"},
					{"Type":"15","Display":"3 pm"},{"Type":"16","Display":"4 pm"},{"Type":"17","Display":"5 pm"},
					{"Type":"18","Display":"6 pm"},{"Type":"19","Display":"7 pm"},{"Type":"20","Display":"8 pm"},
					{"Type":"21","Display":"9 pm"},{"Type":"22","Display":"10 pm"},{"Type":"23","Display":"11 pm"}];

	$scope.Mins = [{"Type":"00","Display":"00 Min"},{"Type":"30","Display":"30 Min"}]
	$scope.Days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

	// calendar params
	$scope.IsGettingParam = true;
	$scope.getCalendarInfo = {"LoginSessionKey":''};
	$scope.addAppointment = {"LoginSessionKey":'',"PatientID":'',"PatientName":'',"PatientMobile":'',"PatientEmail":'',"FromDate":'',"ToDate":'',"StartTime":'',"EndTime":'',"NotifyPatientByEmail":'0',"NotifyPatientBySMS":'0',"NotifyPhysioByEmail":'1',"NotifyPhysioBySMS":'1',"Notes":''};
	$scope.PreviousMonth = '';
	$scope.getCalendarApp = {"LoginSessionKey":''};
	$scope.DeleteEvent = {"LoginSessionKey":'','CalenderID':''};
	$scope.DropEvent = {};
	$scope.EditAppointMent = {};

	var dateToShow, calendar, demoCalendar, eventClass, eventCategory, subViewElement, subViewContent, $eventDetail;
    var defaultRange = new Object;
    defaultRange.start = moment();
    defaultRange.end = moment().add('days', 1);
    $scope.AllCalendraData = [];

	$scope.GetCalendarSetting = function(LoginSessionKey){
		$scope.getInfo.LoginSessionKey = LoginSessionKey;
		calendarService.GetCalendarSetting($scope.getInfo).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.setting 	= response.Data.Setting;
				$scope.Slots 	= response.Data.Slots;
				$scope.IsLoading = false;
            }
        });
	}

	$scope.SubmitCalendarSetting = function(LoginSessionKey){
		$scope.ShowLoader('SettingForm');
		var reqData = {"LoginSessionKey":LoginSessionKey,SettingDetails:$scope.setting};
		calendarService.SaveCalendarSetting(reqData).then(function (response) {
            if (response.ResponseCode == "200") {
            	toastr.success(response.Message);
            }else{
            	toastr.error(response.Message);
            }
            $scope.RemoveLoader('SettingForm');
        });
	}

	$scope.setTime = function(IsAllTimingSame,IsPracticeInTwoSession,index){
		if(IsAllTimingSame == '1'){
			$scope.setting.Timings.StartTime 	= '10';
			$scope.setting.Timings.EndTime 		= '20';
			if(IsPracticeInTwoSession == '0'){
				$scope.setting.Timings.ResumeTime  	= '16';
				$scope.setting.Timings.LunchTime  	= '14';
			}else{
				$scope.setting.Timings.ResumeTime 	= '';
				$scope.setting.Timings.LunchTime 	= '';
				$scope.setting.Timings.ResumeMin  	= '00';
				$scope.setting.Timings.LunchMin  	= '00';
			}
		}else{
			$scope.setting.Timings[index].StartTime 	= '10';
			$scope.setting.Timings[index].EndTime 		= '20';
			if(IsPracticeInTwoSession == '0'){
				$scope.setting.Timings[index].ResumeTime  	= '16';
				$scope.setting.Timings[index].LunchTime  	= '14';
			}else{
				$scope.setting.Timings[index].ResumeTime 	= '';
				$scope.setting.Timings[index].LunchTime 	= '';
				$scope.setting.Timings[index].ResumeMin  	= '00';
				$scope.setting.Timings[index].LunchMin  	= '00';
			}
		}
	}

	$scope.IsDayOpen = function(IsPracticeIsOpen,index){
		if(IsPracticeIsOpen == '0'){
			$scope.setting.Timings[index].IsPracticeInTwoSession = '0';
			$scope.setting.Timings[index].StartTime = '10';
			$scope.setting.Timings[index].EndTime = '20';
		}else{
			$scope.setting.Timings[index].IsPracticeInTwoSession = '0';
			$scope.setting.Timings[index].StartTime = '';
			$scope.setting.Timings[index].EndTime = '';
			$scope.setting.Timings[index].ResumeTime = '';
			$scope.setting.Timings[index].LunchTime = '';
		}
	}

	$scope.SetSettingScope = function(IsAllTimingSame){
		if($('#AllTimeCheckbox').is(':checked')){
			$scope.setting = {"SlotID":$scope.setting.SlotID,"IsAllTimingSame":"0","Timings":[
								{"Day":"1","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1","IsPracticeIsOpen":"1"},
								{"Day":"2","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1","IsPracticeIsOpen":"1"},
								{"Day":"3","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1","IsPracticeIsOpen":"1"},
								{"Day":"4","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1","IsPracticeIsOpen":"1"},
								{"Day":"5","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1","IsPracticeIsOpen":"1"},
								{"Day":"6","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1","IsPracticeIsOpen":"1"},
								{"Day":"7","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1","IsPracticeIsOpen":"1"}
							]};
		}else{
			$scope.setting = {"SlotID":$scope.setting.SlotID,"IsAllTimingSame":"1","Timings":{"Day":"","IsPracticeInTwoSession":"0","StartTime":"10","EndTime":"20","ResumeTime":"","LunchTime":"","StartMin":"00","EndMin":"00","ResumeMin":"00","LunchMin":"00","IsAllTimingSame":"1"}};
		}
	}

	$scope.changeMin = function(SlotId){
		$scope.setting.Timings.StartMin 	= '00';
		$scope.setting.Timings.EndMin  		= '00';
		$scope.setting.Timings.ResumeMin  	= '00';
		$scope.setting.Timings.LunchMin  	= '00';
		/*if(IsAllTimingSame == '1'){
			if(IsPracticeInTwoSession == '1'){
				$scope.setting.Timings.StartMin 	= '';
				$scope.setting.Timings.EndMin  		= '';
				$scope.setting.Timings.ResumeMin  	= '';
				$scope.setting.Timings.LunchMin  	= '';
			}else{
				$scope.setting.Timings.StartMin 	= '00';
				$scope.setting.Timings.EndMin  		= '00';
				$scope.setting.Timings.ResumeMin  	= '00';
				$scope.setting.Timings.LunchMin  	= '00';
			}
		}else{
		}*/
	}

	$scope.ShowLoader = function(id){
    	$('#'+id).html('');
    	$('#'+id).html('<i class="fa fa-circle-o-notch fa-spin"></i>');
    }

    $scope.RemoveLoader = function(id){
    	$('#'+id).html('');
    	$('#'+id).html('Save');
    }

    $scope.ClosePopup = function(){
    	$scope.addAppointment = {"LoginSessionKey":'',"PatientID":'',"PatientName":'',"PatientMobile":'',"PatientEmail":'',"FromDate":'',"ToDate":'',"StartTime":'',"EndTime":'',"NotifyPatientByEmail":'0',"NotifyPatientBySMS":'0',"NotifyPhysioByEmail":'1',"NotifyPhysioBySMS":'1',"Notes":''};
    	hideEditEvent();
    }

    // calendra page funcationality start

    $scope.GetCalendarParam = function(LoginSessionKey){
    	$scope.getCalendarInfo.LoginSessionKey = LoginSessionKey;
    	$scope.addAppointment.LoginSessionKey = LoginSessionKey;
    	$scope.getCalendarApp.LoginSessionKey = LoginSessionKey;
    	$scope.DeleteEvent.LoginSessionKey = LoginSessionKey;
    	$scope.DropEvent.LoginSessionKey = LoginSessionKey;
    	$scope.EditAppointMent.LoginSessionKey = LoginSessionKey;

    	$scope.getCalendarInfo.SubPhysioID = $("#SubPhysioID").val();
		calendarService.GetCalendarInfo($scope.getCalendarInfo).then(function (response) {
            if (response.ResponseCode == "200") {
				$scope.setting 	= response.Data.Setting;
				$scope.IsGettingParam = false;

				setTimeout(function(){ 
					$('#fullCalendar').fullCalendar({
			            header: {
			                left: 'prev,next today',
			                center: 'title',
			                right: 'month,agendaWeek,agendaDay'
			            },
			            minTime:'06:00:00',
			            maxTime:'22:00:00',
			            defaultDate: $scope.setting.defaultDate,
			            firstDay : $scope.setting.currentDay,
			            selectable: true,
				    contentHeight: 'auto',
			            selectConstraint: 'businessHours',
			            eventConstraint: 'businessHours',
			            selectHelper: true,
			            events: function( start, end, callback ) {
			                $('#fullCalendar').fullCalendar('removeEvents');
			                $.blockUI({
			                    message: '<i class="fa fa-spinner fa-spin"></i>'
			                });

			                $scope.getCalendarApp.SubPhysioID = $("#SubPhysioID").val();

			                calendarService.GetAppointmentList($scope.getCalendarApp).then(function (response) {
					            if (response.ResponseCode == "200") {
					            	$scope.AllCalendraData = response.Data.CalendraList;
			                        if(response.Data.TotalRecords >0){
			                            for(var nData in response.Data.CalendraList){
			                                if(response.Data.CalendraList[nData]!==null){
			                                    var details = {
			                                        id: response.Data.CalendraList[nData].CalenderID,
			                                        title: response.Data.CalendraList[nData].FullName,
			                                        start: new Date(response.Data.CalendraList[nData].Year, response.Data.CalendraList[nData].Month, response.Data.CalendraList[nData].Date, response.Data.CalendraList[nData].start_time_one, response.Data.CalendraList[nData].start_time_end),
            										end: new Date(response.Data.CalendraList[nData].Year, response.Data.CalendraList[nData].Month, response.Data.CalendraList[nData].Date, response.Data.CalendraList[nData].end_time_one, response.Data.CalendraList[nData].end_time_end),
			                                        allDay: false,
			                                        className : 'peach-color'
			                                    };
			                                    $('#fullCalendar').fullCalendar('renderEvent', details);
			                                }
			                            }
			                            $.unblockUI();
			                        }else{
			                        	$.unblockUI();
			                        }
					            }
					        });			                
			            },
			            select: function(start, end) {
			            	defaultRange.start = moment(start);

			            	var d1 = new Date();
							var d2 = new Date(moment(defaultRange.start).format('YYYY-MM-DD[T]HH:mm:SS'));

							if(d2 >= d1){
								defaultRange.end = moment(start).add('minutes', $scope.setting.SlotTimingInMin);
				                $.subview({
				                    content: "#newFullEvent",
				                    onShow: function() {
				                        editFullEvent();
				                        runFullCalendarValidation();
				                    },
				                    onHide: function() {
				                        hideEditEvent();
				                    }
				                });
							}else{
								toastr.clear();
								toastr.error('Can create appointment for previous date or time!');
							}
			            },
			            businessHours:$scope.setting.businessHours,
			            allDaySlot: false,
			            defaultView: 'agendaWeek',
			            editable: true,
			            eventLimit: true, // allow "more" link when too many events,
			            slotDuration: $scope.setting.slotDuration,
			            eventDrop: function(event, delta, revertFunc) {

					var d4 = new Date();
					var d5 = new Date(moment(event.start._i).format('YYYY-MM-DD[T]HH:mm:SS'));
				
					if(d5 >= d4){
					    	var oldDate = moment(event.start._i).format('YYYY/MM/DD h:mm A');
					    	var newDate = event.start.format('YYYY/MM/DD h:mm A');
					        
					    	var calendarID = event.id;
					        var some_html = "Reschedule Appointment from "+oldDate+" to "+newDate+" ?<br /><br/>";
								some_html += '<span><b>Notify Patient</b></span>&nbsp;&nbsp;&nbsp;<span><label class="checkbox-inline"><input type="checkbox" id="NotifyPatientBySMS" checked="checked">Via SMS</label></span>&nbsp;&nbsp;&nbsp;<span><label class="checkbox-inline"><input type="checkbox" id="NotifyPatientByEmail" checked="checked">Via Email</label></span><br/><br/>';
								some_html += '<span><b>Notify Physio</b></span>&nbsp;&nbsp;&nbsp;<span><label class="checkbox-inline"><input type="checkbox" id="NotifyPhysioBySMS" checked="checked">Via SMS</label></span>&nbsp;&nbsp;&nbsp;<span><label class="checkbox-inline"><input type="checkbox" id="NotifyPhysioByEmail" checked="checked">Via Email</label></span>';
								bootbox.dialog({
									message : some_html,
									title : "Re-Schedule Appointment",
									buttons : {
										success : {
											label : "Yes",
											className : "btn-success",
											callback : function() {
												$scope.DropEvent.CalenderID 			= event.id;
												$scope.DropEvent.NotifyPhysioByEmail 	= $('#NotifyPhysioByEmail').is(":checked");
												$scope.DropEvent.NotifyPhysioBySMS 		= $('#NotifyPhysioBySMS').is(":checked");
												$scope.DropEvent.NotifyPatientByEmail 	= $('#NotifyPatientByEmail').is(":checked");
												$scope.DropEvent.NotifyPatientBySMS 	= $('#NotifyPatientBySMS').is(":checked");
												$scope.DropEvent.FromDate 				= event.start.format('YYYY/MM/DD');
												$scope.DropEvent.StartTime 				= event.start.format('HH:mm');
												$scope.DropEvent.ToDate 				= event.end.format('YYYY/MM/DD');
												$scope.DropEvent.EndTime 				= event.end.format('HH:mm');
											
												$.blockUI({
								                message: '<i class="fa fa-spinner fa-spin"></i>'
								            });

								            calendarService.UpdateAppointment($scope.DropEvent).then(function (response) {
											    $.unblockUI();
											    if (response.ResponseCode == "200") {
											        $scope.AllCalendraData = $("#fullCalendar").fullCalendar("clientEvents");
										            $.hideSubview();
										            toastr.success('Update successfully');
											    }else{
											    	revertFunc();
											    	toastr.error(response.Message);
											    }
											});
											}
										},
										danger : {
											label : "No",
											className : "btn-danger",
											callback : function() {
												revertFunc();
											}
										}
									}
								});
					}else{
						revertFunc();
						toastr.clear();
						toastr.error('Cannot re-appointment for previous date or time!');
					}
							

			                //$scope.DropEvent.=
			                /*$.ajax({
			                    url: 'process.php',
			                    data: 'type=resetdate&title='+title+'&start='+start+'&end='+end+'&eventid='+event.id,
			                    type: 'POST',
			                    dataType: 'json',
			                    success: function(response){
			                        if(response.status != 'success')                            
			                        revertFunc();
			                    },
			                    error: function(e){                     
			                        revertFunc();
			                        alert('Error processing your request: '+e.responseText);
			                    }
			                });*/
			            },
			            eventClick: function(calEvent, jsEvent, view) {
					var d1 = new Date();
					var d2 = new Date(moment(calEvent.start._i).format('YYYY-MM-DD[T]HH:mm:SS'));
					if(d2 >= d1){
						$('.optionDropDown').css('display','block');
					}else{
						$('.optionDropDown').css('display','none');
					}
			                dateToShow = calEvent.start;
			                $.subview({
			                    content: "#readFullEvent",
			                    startFrom: "right",
			                    onShow: function() {
			                        readFullEvents(calEvent._id);
			                    }
			                });
			            },
			            eventResize: function(event, delta, revertFunc) {
			                revertFunc();
			            },
			            eventDragStop: function (event, jsEvent, ui, view) {
			                /*console.log('eventDragStop function called');
		                    var con = confirm('Are you sure to delete this event permanently?');
		                    if(con == true) {
		                        $.ajax({
		                            url: 'process.php',
		                            data: 'type=remove&eventid='+event.id,
		                            type: 'POST',
		                            dataType: 'json',
		                            success: function(response){
		                                console.log(response);
		                                if(response.status == 'success'){
		                                    $('#full-calendar').fullCalendar('removeEvents');
		                                    getFreshEvents();
		                                }
		                            },
		                            error: function(e){ 
		                                alert('Error processing your request: '+e.responseText);
		                            }
		                        });
		                    }   */
			            }
			        });
				}, 100);
            }
        });
    }

    var readFullEvents = function(el) {

        $(".edit-event").off().on("click", function() {
            subViewElement = $(this);
            subViewContent = subViewElement.attr('href');
            $.subview({
                content: subViewContent,
                onShow: function() {
                    editFullEvent(el);
                },
                onHide: function() {
                    hideEditEvent();
                }
            });
        });

        $(".delete-event").data("event-id", el);

        $("#readFullEvent").find(".delete-event").off().on("click", function() {
            el = $(this).data("event-id");
            bootbox.confirm("Are you sure to cancel?", function(result) {
                if (result) {
                    $.blockUI({
                        message: '<i class="fa fa-spinner fa-spin"></i>'
                    });

                    $scope.DeleteEvent.CalenderID = el;
                    calendarService.DeleteAppointment($scope.DeleteEvent).then(function (response) {
			            $.unblockUI();
			            if (response.ResponseCode == "200") {
			            	$('#fullCalendar').fullCalendar('removeEvents', el);
		                    $scope.AllCalendraData = $("#fullCalendar").fullCalendar("clientEvents");

		                    $.hideSubview();
		                    toastr.success('The event has been successfully deleted!');
			            }else{
			            	toastr.error(response.Message);
			            }
			        });
                }
            });
        });
		

        for (var i = 0; i < $scope.AllCalendraData.length; i++) {
            if ($scope.AllCalendraData[i].CalenderID == el) {

                $("#readFullEvent .event-allday").hide();
                $("#readFullEvent .event-end").empty().hide();

                $("#readFullEvent .event-title").empty().text($scope.AllCalendraData[i].title);
                /*if ($scope.AllCalendraData[i].className == "" || typeof $scope.AllCalendraData[i].className == "undefined") {
                    eventClass = "event-generic";
                } else {
                    eventClass = $scope.AllCalendraData[i].className;
                }
                if ($scope.AllCalendraData[i].category == "" || typeof $scope.AllCalendraData[i].category == "undefined") {
                    eventCategory = "Generic";
                } else {
                    eventCategory = $scope.AllCalendraData[i].category;
                }

                $("#readFullEvent .event-category")
                    .empty()
                    .removeAttr("class")
                    .addClass("event-category " + eventClass)
                    .text(eventCategory);*/
                /*if ($scope.AllCalendraData[i].allDay) {
                    $("#readFullEvent .event-allday").show();
                    $("#readFullEvent .event-start").empty().html("<p>Start:</p> <div class='event-day'><h2>" + moment($scope.AllCalendraData[i].AppointmentDate).format('DD') + "</h2></div><div class='event-date'><h3>" + moment($scope.AllCalendraData[i].AppointmentDate).format('dddd') + "</h3><h4>" + moment($scope.AllCalendraData[i].AppointmentDate).format('MMMM YYYY') + "</h4></div>");
                    if ($scope.AllCalendraData[i].end !== null) {
                        if (moment($scope.AllCalendraData[i].end).isValid()) {
                            $("#readFullEvent .event-end").show().html("<p>End:</p> <div class='event-day'><h2>" + moment($scope.AllCalendraData[i].AppointmentDate).format('DD') + "</h2></div><div class='event-date'><h3>" + moment($scope.AllCalendraData[i].AppointmentDate).format('dddd') + "</h3><h4>" + moment($scope.AllCalendraData[i].AppointmentDate).format('MMMM YYYY') + " </h4></div>");
                        }
                    }
                } else {*/
                $("#readFullEvent .event-start").empty().html("<p>Start:</p> <div class='event-day'><h2>" + moment($scope.AllCalendraData[i].AppointmentDate).format('DD') + "</h2></div><div class='event-date'><h3>" + moment($scope.AllCalendraData[i].AppointmentDate).format('dddd') + "</h3><h4>" + moment($scope.AllCalendraData[i].AppointmentDate).format('MMMM YYYY') + "</h4></div> <div class='event-time'><h3><i class='fa fa-clock-o'></i> " + moment($scope.AllCalendraData[i].AppointmentStartTime, ["HH:mm"]).format("h:mm A") + "</h3></div>");
                if ($scope.AllCalendraData[i].end !== null) {
                    if (moment($scope.AllCalendraData[i].end).isValid()) {
                        $("#readFullEvent .event-end").show().html("<p>End:</p> <div class='event-day'><h2>" + moment($scope.AllCalendraData[i].AppointmentDate).format('DD') + "</h2></div><div class='event-date'><h3>" + moment($scope.AllCalendraData[i].AppointmentDate).format('dddd') + "</h3><h4>" + moment($scope.AllCalendraData[i].AppointmentDate).format('MMMM YYYY') + "</h4></div> <div class='event-time'><h3><i class='fa fa-clock-o'></i> " + moment($scope.AllCalendraData[i].AppointmentEndTime, ["HH:mm"]).format("h:mm A") + "</h3></div>");
                    }
                }
               //}

               	$("#readFullEvent #patientName").empty().html($scope.AllCalendraData[i].FullName);
               	$("#readFullEvent #mobileNumber").empty().html($scope.AllCalendraData[i].MobileNumber);
               	$("#readFullEvent #patientEmail").empty().html($scope.AllCalendraData[i].Email);

                $("#readFullEvent .event-content").empty().html($scope.AllCalendraData[i].Notes);

                break;
            }
        }

    };

    var editFullEvent = function(el) {
        $(".close-new-event").off().on("click", function() {
            $(".back-subviews").trigger("click");
        });
        $(".form-full-event .help-block").remove();
        $(".form-full-event .form-group").removeClass("has-error").removeClass("has-success");
        $eventDetail = $('.form-full-event .summernote');

        $eventDetail.summernote({
            oninit: function() {
                if ($eventDetail.code() == "" || $eventDetail.code().replace(/(<([^>]+)>)/ig, "") == "") {
                    $eventDetail.code($eventDetail.attr("placeholder"));
                }
            },
            onfocus: function(e) {
                if ($eventDetail.code() == $eventDetail.attr("placeholder")) {
                    $eventDetail.code("");
                }
            },
            onblur: function(e) {
                if ($eventDetail.code() == "" || $eventDetail.code().replace(/(<([^>]+)>)/ig, "") == "") {
                    $eventDetail.code($eventDetail.attr("placeholder"));
                }
            },
            onkeyup: function(e) {
                $("span[for='detailEditor']").remove();
            },
            toolbar: [],
            disableDragAndDrop: true
        });
        if (typeof el == "undefined") {
            $(".form-full-event .event-id").val("");
            $(".form-full-event .event-name").val("");
            $(".form-full-event .all-day").bootstrapSwitch('state', false);
            $('.form-full-event .all-day-range').hide();
            $(".form-full-event .event-start-date").val(defaultRange.start);
            $(".form-full-event .event-end-date").val(defaultRange.end);

            $('.form-full-event .no-all-day-range .event-range-date').val(moment(defaultRange.start).format('YYYY/MM/DD') + ' - ' + moment(defaultRange.end).format('YYYY/MM/DD'))
            .daterangepicker({
                startDate: defaultRange.start,
                endDate: defaultRange.end,
                format: 'YYYY/MM/DD'
            });

            $scope.addAppointment.StartTime = moment(defaultRange.start).format('HH:mm');
            $scope.addAppointment.EndTime = moment(defaultRange.end).format('HH:mm');

            $('#ScheduleTiming').html("From "+moment(defaultRange.start).format('h:mm A')+" to "+moment(defaultRange.end).format('h:mm A'));

           /* $('.form-full-event .all-day-range .event-range-date').val(moment(defaultRange.start).format('MM/DD/YYYY') + ' - ' + moment(defaultRange.end).format('MM/DD/YYYY'))
                .daterangepicker({
                    startDate: defaultRange.start,
                    endDate: defaultRange.end
                });*/

            /*$('.form-full-event .event-categories option').filter(function() {
                return ($(this).text() == "Generic");
            }).prop('selected', true);*/
           /* $('.form-full-event .event-categories').selectpicker('render');*/
            $eventDetail.code($eventDetail.attr("placeholder"));
            defaultRange.start = moment();
            defaultRange.end = moment().add('days', 1);

        } else {
        	$("#editEvent .form-full-event .event-id").val(el);
        	runFullCalendarValidation();
            
            for (var i = 0; i < $scope.AllCalendraData.length; i++) {

                if ($scope.AllCalendraData[i].CalenderID == el) {

                	//$scope.EditAppointMent = $scope.AllCalendraData[i];
 	                $("#editEvent #patientName").empty().html($scope.AllCalendraData[i].FullName);
	               	$("#editEvent #mobileNumber").empty().html($scope.AllCalendraData[i].MobileNumber);
	               	$("#editEvent #patientEmail").empty().html($scope.AllCalendraData[i].Email);
	               	$('#editEvent #editnote').code($scope.AllCalendraData[i].Notes);

	               	var Time1 = $scope.AllCalendraData[i].AppointmentDate+" "+$scope.AllCalendraData[i].AppointmentStartTime;
                    var Time2 = $scope.AllCalendraData[i].AppointmentEndDate+" "+$scope.AllCalendraData[i].AppointmentEndTime;
                    
                    $("#editEvent .form-full-event .event-start-date").val(moment(Time1));
                    $("#editEvent .form-full-event .event-end-date").val(moment(Time2));

                    $("#editEvent .form-full-event .app-start-date").val(Time1);
                    $("#editEvent .form-full-event .app-end-date").val(Time2);

                    if (typeof $('#editEvent .form-full-event .no-all-day-range .event-range-date').data('daterangepicker') == "undefined") {
                       
                        $('#editEvent .form-full-event .no-all-day-range .event-range-date').val(moment(Time1).format('YYYY/MM/DD h:mm A') + ' - ' + moment(Time2).format('YYYY/MM/DD h:mm A'))
                            .daterangepicker({
                                startDate: moment(Time1),
                                endDate: moment(Time2),
                                timePicker: true,
                                timePickerIncrement: $scope.setting.SlotTimingInMin,
                                format: 'YYYY/MM/DD h:mm A'
                            });

                        /*$('#editEvent .form-full-event .all-day-range .event-range-date').val(moment(Time1).format('YYYY/MM/DD') + ' - ' + moment(Time2).format('YYYY/MM/DD'))
                            .daterangepicker({
                                startDate: moment(Time1),
                                endDate: moment(Time2)
                            });*/
                    } else {
                    	
                        $('#editEvent .form-full-event .no-all-day-range .event-range-date').val(moment(Time1).format('YYYY/MM/DD h:mm A') + ' - ' + moment(Time2).format('YYYY/MM/DD h:mm A'))
                            .data('daterangepicker').setStartDate(moment(Time1));
                        $('#editEvent .form-full-event .no-all-day-range .event-range-date').data('daterangepicker').setEndDate(moment(Time2));
                        $('#editEvent .form-full-event .all-day-range .event-range-date').val(moment(Time1).format('YYYY/MM/DD') + ' - ' + moment(Time2).format('YYYY/MM/DD'))
                            .data('daterangepicker').setStartDate(Time1);
                        $('#editEvent .form-full-event .all-day-range .event-range-date').data('daterangepicker').setEndDate(Time2);
                    }
                }

            }
        }
        /*$('.form-full-event .all-day').bootstrapSwitch();
        $('.form-full-event .all-day').on('switchChange.bootstrapSwitch', function(event, state) {
            $(".daterangepicker").hide();
            var startDate = moment($("#newFullEvent").find(".event-start-date").val());
            var endDate = moment($("#newFullEvent").find(".event-end-date").val());
            if (state) {
                $("#newFullEvent").find(".no-all-day-range").hide();
                $("#newFullEvent").find(".all-day-range").show();
                $("#newFullEvent").find('.all-day-range .event-range-date').val(startDate.format('MM/DD/YYYY') + ' - ' + endDate.format('MM/DD/YYYY')).data('daterangepicker').setStartDate(startDate);
                $("#newFullEvent").find('.all-day-range .event-range-date').data('daterangepicker').setEndDate(endDate);
            } else {
                $("#newFullEvent").find(".no-all-day-range").show();
                $("#newFullEvent").find(".all-day-range").hide();
                $("#newFullEvent").find('.no-all-day-range .event-range-date').val(startDate.format('MM/DD/YYYY h:mm A') + ' - ' + endDate.format('MM/DD/YYYY h:mm A')).data('daterangepicker').setStartDate(startDate);
                $("#newFullEvent").find('.no-all-day-range .event-range-date').data('daterangepicker').setEndDate(endDate);
            }
        });*/
        $('#editEvent .form-full-event .event-range-date').on('apply.daterangepicker', function(ev, picker) {
            $("#editEvent .form-full-event .event-start-date").val(picker.startDate);
            $("#editEvent .form-full-event .event-end-date").val(picker.endDate);
            $("#editEvent .form-full-event .app-start-date").val(picker.startDate.format('YYYY-MM-DD HH:mm'));
            $("#editEvent .form-full-event .app-end-date").val(picker.endDate.format('YYYY-MM-DD HH:mm'));
        });

        $('#newFullEvent .form-full-event .event-range-date').on('apply.daterangepicker', function(ev, picker) {
            $("#newFullEvent .form-full-event .event-start-date").val(picker.startDate);
            $("#newFullEvent .form-full-event .event-end-date").val(picker.endDate);
        });
    };

    var hideEditEvent = function() {
    	$('#ScheduleTiming').html('');
        $.hideSubview();
        $('.form-full-event .summernote').destroy();
        $(".form-full-event .all-day").bootstrapSwitch('destroy');
    };

    var runFullCalendarValidation = function(el) {
        var formEvent = $('.form-full-event');
        var errorHandler2 = $('.errorHandler', formEvent);
        var successHandler2 = $('.successHandler', formEvent);

        formEvent.validate({
            errorElement: "span", // contain the error msg in a span tag
            errorClass: 'help-block',
            errorPlacement: function(error, element) { // render error placement for each input type
                if (element.attr("type") == "radio" || element.attr("type") == "checkbox") { // for chosen elements, need to insert the error after the chosen container
                    error.insertAfter($(element).closest('.form-group').children('div').children().last());
                } else if (element.parent().hasClass("input-icon")) {

                    error.insertAfter($(element).parent());
                } else {
                    error.insertAfter(element);
                    // for other inputs, just perform default behavior
                }
            },
            ignore: "",
            rules: {
                patientName: {
                    minlength: 2,
                    required: true
                },
                PatientMobile: {
                	number: true,
                    minlength: 10,
                    maxlength: 10,
                    required: true
                },
                PatientEmail: {
                    required: true,
                    email: true
                },
                eventStartDate: {
                    required: true,
                    date: true
                },
                eventEndDate: {
                    required: true,
                    date: true
                }
            },
            /*messages: {
                eventName: "* Please specify the event name"
            },*/
            invalidHandler: function(event, validator) { //display error alert on form submit
                successHandler2.hide();
                errorHandler2.show();
            },
            highlight: function(element) {
                $(element).closest('.help-block').removeClass('valid');
                // display OK icon
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error').find('.symbol').removeClass('ok').addClass('required');
                // add the Bootstrap error class to the control group
            },
            unhighlight: function(element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error');
                // set error class to the control group
            },
            success: function(label, element) {
                label.addClass('help-block valid');
                // mark the current input as valid and display OK icon
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success').find('.symbol').removeClass('required').addClass('ok');
            },
            submitHandler: function(form) {
                successHandler2.show();
                errorHandler2.hide();
                var newEvent = new Object;
                newEvent.title = $(".form-full-event .event-name ").val();
                newEvent.start = new Date($('.form-full-event .event-start-date').val());
                newEvent.end = new Date($('.form-full-event .event-end-date').val());
                newEvent.allDay = $(".form-full-event .all-day").bootstrapSwitch('state');
                newEvent.className = $(".form-full-event .event-categories option:checked").val();
                newEvent.category = $(".form-full-event .event-categories option:checked").text();
                if ($eventDetail.code() !== "" && $eventDetail.code().replace(/(<([^>]+)>)/ig, "") !== "" && $eventDetail.code() !== $eventDetail.attr("placeholder")) {
                    newEvent.content = $eventDetail.code();
                } else {
                    newEvent.content = "";
                }
               
                $.blockUI({
                    message: '<i class="fa fa-spinner fa-spin"></i>'
                });
                
                if ($("#editEvent .form-full-event .event-id").val() !== "") {
                	$scope.EditAppointMent.CalenderID 	= $("#editEvent .form-full-event .event-id").val();
                    $scope.EditAppointMent.StartDate 	= $("#editEvent .form-full-event .app-start-date").val();
                    $scope.EditAppointMent.EndDate 		= $("#editEvent .form-full-event .app-end-date").val();
                    $scope.EditAppointMent.Notes 		= $("#editEvent .summernote").code();
                    
                    calendarService.EditAppointment($scope.EditAppointMent).then(function (response) {
			            if (response.ResponseCode == "200") {
			            	toastr.success(response.Message);
			            	setTimeout(function(){ 
			            		location.reload();
			            	},500);
			            }else{
			            	toastr.error(response.Message);
			            }
			        });

                    /*el = $(".form-full-event .event-id").val();
                    var actual_event = $('#full-calendar').fullCalendar('clientEvents', el);
                    actual_event = actual_event[0];
                    for (var i = 0; i < $scope.AllCalendraData.length; i++) {
                        if ($scope.AllCalendraData[i]._id == el) {
                            newEvent._id = el;
                            var eventIndex = i;
                        }
                    }*/
                    //mockjax simulates an ajax call
                    /*$.mockjax({
                        url: '/event/edit/webservice',
                        dataType: 'json',
                        responseTime: 1000,
                        responseText: {
                            say: 'ok'
                        }
                    });

                    $.ajax({
                        url: '/event/edit/webservice',
                        dataType: 'json',
                        success: function(json) {
                            $.unblockUI();
                            if (json.say == "ok") {

                                $('#full-calendar').fullCalendar('removeEvents', actual_event._id);
                                $('#full-calendar').fullCalendar('renderEvent', newEvent, true);

                                $scope.AllCalendraData = $("#full-calendar").fullCalendar("clientEvents");
                                $.hideSubview();
                                toastr.success('The event has been successfully modified!');
                            }
                        }
                    });*/
                } else {
                	$scope.addAppointment.FromDate = moment(newEvent.start).format('YYYY/MM/DD');
		            $scope.addAppointment.ToDate = moment(newEvent.end).format('YYYY/MM/DD');
		            $scope.addAppointment.Notes = $(".summernote").code();
					
		            $scope.addAppointment.SubPhysioID = $("#SubPhysioID").val();
					calendarService.SaveAppointment($scope.addAppointment).then(function (response) {
			            if (response.ResponseCode == "200") {
			            		
	                        if(response.Data.CalenderDetail.TotalRecords > 0){
	                            for(var nData in response.Data.CalenderDetail.CalendraList){
	                                if(response.Data.CalenderDetail.CalendraList[nData]!==null){
	                                	if($scope.AllCalendraData == undefined){
	                                		$scope.AllCalendraData = response.Data.CalenderDetail.CalendraList;
	                                	}else{
	                                		$scope.AllCalendraData.push(response.Data.CalenderDetail.CalendraList[nData]);
	                                	}                                		

	                                    var details = {
	                                        id: response.Data.CalenderDetail.CalendraList[nData].CalenderID,
	                                        title: response.Data.CalenderDetail.CalendraList[nData].FullName,
	                                        start: new Date(response.Data.CalenderDetail.CalendraList[nData].Year, response.Data.CalenderDetail.CalendraList[nData].Month, response.Data.CalenderDetail.CalendraList[nData].Date, response.Data.CalenderDetail.CalendraList[nData].start_time_one, response.Data.CalenderDetail.CalendraList[nData].start_time_end),
    										end: new Date(response.Data.CalenderDetail.CalendraList[nData].Year, response.Data.CalenderDetail.CalendraList[nData].Month, response.Data.CalenderDetail.CalendraList[nData].Date, response.Data.CalenderDetail.CalendraList[nData].end_time_one, response.Data.CalenderDetail.CalendraList[nData].end_time_end),
	                                        allDay: false,
	                                        className : 'peach-color'
	                                    };
	                                    $('#fullCalendar').fullCalendar('renderEvent', details,true);
	                                }
	                            }
	                            
	                            //$scope.AllCalendraData = $("#fullCalendar").fullCalendar("clientEvents");
	                            //console.log($scope.AllCalendraData);
	                            $.unblockUI();
	                        }
	                        $scope.addAppointment = {"LoginSessionKey":$scope.addAppointment.LoginSessionKey,"PatientID":'',"PatientName":'',"PatientMobile":'',"PatientEmail":'',"FromDate":'',"ToDate":'',"StartTime":'',"EndTime":'',"NotifyPatientByEmail":'0',"NotifyPatientBySMS":'0',"NotifyPhysioByEmail":'1',"NotifyPhysioBySMS":'1',"Notes":''};
                            $.hideSubview();
			            	toastr.success(response.Message);
			            }else{
					$.unblockUI();
			            	toastr.error(response.Message);
			            }
			        });
                }
            }
        });
    };

    // calendra page funcationality end
});
