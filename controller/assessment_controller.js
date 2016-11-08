/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('App').controller('AssessmentCtrl', function ($scope, $rootScope, $element, commonService,$timeout) {
        
    $scope.showAssessmentForm = function(active_tab) {
        alert("hello");
        $scope.active_tab = active_tab;
    }
    $scope.saveAssessment = function(LoginSessionKey,type)
    {
        if(type==9)
        {
            var image = $('.fileupload-preview').find('img').attr('src');
            if(image == '' || image == undefined)
            {
               
                toastr.error('Invalid file');
                $('#remove').click();
            }
            $scope.assessmentObj.image = image;
        }
        angular.element("#assessment").addClass("loader");
        $scope.assessmentObj.assessment_type = type;
        var patient_id = $scope.assessmentObj.patient_id;
        $scope.assessmentObj.LoginSessionKey = LoginSessionKey;
        var PostData = $scope.assessmentObj;
        commonService.commonApiCall(PostData, 'api/assessment/save_patients_assessment').then(function (response) {
            $scope.assessmentObj = {};
            $scope.resetAssessmentObj();
            toastr.success(response.Message);
            angular.element("#assessment").removeClass("loader");
            $scope.assessmentObj.patient_id = patient_id;
//            $timeout(function(){
//                $scope.getPatientAssessment(LoginSessionKey,patient_id,type);
//            },1000)
        }, function (error) {
            toastr.error(error.Message);
        });  
    }
    
    $scope.addField = function(type,subcat)
    {
        if(type==1)
        {
            obj = {"text":''}; 
            $scope.chief_complaint.push(obj);
        }
        if(type==2)
        {
            obj = {"text":'other'}; 
            $scope.vitals.push(obj);
        }
        if(type==3)
        {
            obj = {"text":'other'}; 
            $scope.risk_factor.push(obj);
        }
        if(type==4)
        {
            obj = {"0":'',"1":"","2":""}; 
            $scope.associated_problem.push(obj);
        }
        if(type==5)
        {
            obj = {"text":''}; 
            $scope.on_observation.push(obj);
        }
        if(type==6)
        {
            obj = {"text":''}; 
            $scope.on_palpation.push(obj);
        }
        if(type==7)
        {
            obj = {"text":'other'}; 
            $scope.history.push(obj);
        }
        if(type==8)
        {
            obj = {"text":'other'}; 
            $scope.anthroprometric_data.push(obj);
        }
        if(type==9)
        {
            obj = {"text":'other'}; 
            $scope.posture.push(obj);
        }
        if(type==10)
        {   
            if(subcat=='active')
            {
                obj = {"0":'',"1":'',"2":'',"3":''}; 
                $scope.range_motion_active.push(obj);
            }
            else
            {
                obj = {"0":'',"1":'',"2":'',"3":''}; 
                $scope.range_motion_passive.push(obj);
            }
            
        }
        if(type==11)
        {
            obj = {"0":'',"1":'',"2":'',"3":''};
            $scope.manual_muscle_testing.push(obj);
        }
        if(type==12)
        {
            obj = {"0":'',"1":''}; 
            $scope.reflex_integrity.push(obj);
        }
        if(type==13)
        {
            obj = {"text":'other'}; 
            $scope.other_motor_function.push(obj);
        }
        if(type==14)
        {
            obj = {"0":'',"1":"","2":""}; 
            $scope.sensory_examination.push(obj);
        }
        if(type==15)
        {
            if(subcat=='gross')
            {
                obj = {"text":'other'}; 
                $scope.coordination_gross.push(obj);
            }
            else if(subcat=='fine')
            {
                obj = {"0":''}; 
                $scope.coordination_fine.push(obj);
            }
            else
            {
                obj = {"0":'',"1":"","2":""}; 
                $scope.coordination_scales.push(obj);
            }
           
        }
        if(type==16)
        {
            if(subcat=='sensory_element')
            {
                obj = {"text":'other'}; 
                $scope.balance_sensory_element.push(obj);
            }
            else if(subcat=='name_of_activity')
            {
                obj = {"0":'',"1":''}; 
                $scope.balance_name_of_activity.push(obj);
            }
            else if(subcat=='dynamic_balance')
            {
                obj = {"0":'',"1":''}; 
                $scope.balance_dynamic_balance.push(obj);
            }
            else if(subcat=='d')
            {
                obj = {"0":'',"1":'',"2":''}; 
                $scope.balance_d.push(obj);
            }
        }
        if(type==17)
        {
            if(subcat=='kinematic_analysis')
            {
                obj = {"text":''}; 
                $scope.gait_kinematic_analysis.push(obj);
            }
            else if(subcat=='test')
            {
                obj = {"0":'',"1":''}; 
                $scope.gait_test.push(obj);
            }
            else
            {
                obj = {"0":'',"1":''}; 
                $scope.gait_parameter.push(obj);
            }
        }
        if(type==18)
        {
            obj = {"0":'',"1":'',"2":''}; 
            $scope.assistive_and_adaptive_devices.push(obj);
        }
        if(type==19)
        {
            obj = {"0":'',"1":'',"2":''}; 
            $scope.orthosis_prosthesis.push(obj);
        }
        if(type==20)
        {
            obj = {"text":''}; 
            $scope.ergonomic_or_body_mechanics.push(obj);
        }
        if(type==21)
        {
            if(subcat=='a')
            {
                obj = {"text":''}; 
                $scope.self_care_a.push(obj);
            }
            else
            {
                obj = {"0":'',"1":''}; 
                $scope.self_care_b.push(obj);
            }
        }
        if(type==22)
        {
            obj = {"0":'',"1":'',"2":''}; 
            $scope.special_test.push(obj);
        }
        if(type==23)
        {
            if(subcat=='a')
            {
                obj = {"text":''}; 
                $scope.level_of_consciousness_a.push(obj);
            }
            else if(subcat=='b')
            {
                obj = {"text":''}; 
                $scope.level_of_consciousness_b.push(obj);
            }
            else if(subcat=='c')
            {
                obj = {"text":''}; 
                $scope.level_of_consciousness_c.push(obj);
            }
            else if(subcat=='d')
            {
                obj = {"text":''}; 
                $scope.level_of_consciousness_d.push(obj);
            }
            else
            {
                obj = {"0":'',"1":'',"2":''}; 
                $scope.level_of_consciousness_scales.push(obj);
            }            
        }
        if(type==24)
        {
            if(subcat=='a')
            {
                obj = {"text":''}; 
                $scope.cognitive_function_a.push(obj);
            }
            else if(subcat=='b')
            {
                obj = {"text":''}; 
                $scope.cognitive_function_b.push(obj);
            }
            else if(subcat=='c')
            {
                obj = {"text":''}; 
                $scope.cognitive_function_c.push(obj);
            }
            else if(subcat=='d')
            {
                obj = {"text":''}; 
                $scope.cognitive_function_d.push(obj); 
            }
            else
            {
                obj = {"0":'',"1":'',"2":''}; 
                $scope.cognitive_function_scales.push(obj);
            }
            
        }
        if(type==25)
        {
            obj = {"text":'other'}; 
            $scope.speech_communication.push(obj);
        }
        if(type==26)
        {
            obj = {"text":'other'}; 
            $scope.meningeal_irritation.push(obj);
        }
        if(type==27)
        {
            obj = {"text":'other'}; 
            $scope.increased_intracranial_pressure.push(obj);
        }
        if(type==28)
        {
            obj = {"0":'',"1":'',"2":''}; 
            $scope.cranial_nerve_integrity.push(obj);
        }
        if(type==29)
        {
            obj = {"text":'other'}; 
            $scope.autonomic_nervous_system.push(obj);
        }
        if(type==30)
        {
            if(subcat=='pain')
            {
                obj = {"0":'',"1":'',"2":''}; 
                $scope.pain.push(obj);
            }
            else
            {
                obj = {"0":'',"1":'',"2":''}; 
                $scope.pain_scale.push(obj);
            }
            
        }
        if(type==31)
        {
            if(subcat=='a')
            {
                obj = {"0":'',"1":'',"2":''}; 
                $scope.perceptual_function_a.push(obj); 
            }
            else
            {
                obj = {"0":'',"1":'',"2":''}; 
                $scope.perceptual_function_b.push(obj); 
            }          
        }
        if(type==32)
        {
            if(subcat=='pulse')
            {
                obj = {"text":''}; 
                $scope.pulse.push(obj);
            }
            else if(subcat=='heart_rate')
            {
                obj = {"text":''}; 
                $scope.heart_rate.push(obj);
            }
            else if(subcat=='heart_sound')
            {
                obj = {"text":''}; 
                $scope.heart_sound.push(obj);
            }
            else if(subcat=='heart_rhythm')
            {
                obj = {"text":''}; 
                $scope.heart_rhythm.push(obj);
            }
            else if(subcat=='ecg')
            {
                obj = {"text":''}; 
                $scope.ecg.push(obj);
            }
            else if(subcat=='bp')
            {
                obj = {"text":''}; 
                $scope.bp.push(obj);
            }
            else if(subcat=='respiratory_rate')
            {
                obj = {"text":''}; 
                $scope.respiratory_rate.push(obj);
            }
            else if(subcat=='oxygen_saturation')
            {
                obj = {"text":''}; 
                $scope.oxygen_saturation.push(obj);
            }
            else if(subcat=='pain_if_any')
            {
                obj = {"text":''}; 
                $scope.pain_if_any.push(obj);
            }            
        }
        if(type==33)
        {
            if(subcat=='diaphoresis')
            {
                obj = {"text":''}; 
                $scope.diaphoresis.push(obj);                
            }
            else if(subcat=='arterial_pulse')
            {
                obj = {"text":''}; 
                $scope.arterial_pulse.push(obj);
            }
            else if(subcat=='skin_temp')
            {
                obj = {"text":''}; 
                $scope.skin_temp.push(obj);
            }
            else if(subcat=='arterial_pulse')
            {
                obj = {"text":''}; 
                $scope.arterial_pulse.push(obj);
            }
            else if(subcat=='skin_color')
            {
                obj = {"text":''}; 
                $scope.skin_color.push(obj);                
            }
            else if(subcat=='skin_temp')
            {
                obj = {"text":''}; 
                $scope.skin_temp.push(obj);                
            }
            else if(subcat=='skin_changes')
            {
                obj = {"text":''}; 
                $scope.skin_changes.push(obj);                
            }
            else if(subcat=='intermittent_claudication')
            {
                obj = {"text":''}; 
                $scope.intermittent_claudication.push(obj);                
            }
            else if(subcat=='edema')
            {
                obj = {"text":''}; 
                $scope.edema.push(obj);                
            }
            else if(subcat=='percussion_test')
            {
                obj = {"text":''}; 
                $scope.percussion_test.push(obj);                
            }
            else if(subcat=='trendelenburg_test')
            {
                obj = {"text":''}; 
                $scope.trendelenburg_test.push(obj);                
            }            
            else if(subcat=='lymphatic_system')
            {
                obj = {"text":''}; 
                $scope.lymphatic_system.push(obj);                
            }            
        }
        if(type==34)
        {
            if(subcat=='pruritus')
            {
                obj = {"text":''}; 
                $scope.pruritus.push(obj);                
            }
            else if(subcat=='urticaria')
            {
                obj = {"text":''}; 
                $scope.urticaria.push(obj);                 
            }
            else if(subcat=='rash')
            {
                 obj = {"text":''}; 
                $scope.rash.push(obj);                
            }
            else if(subcat=='xeroderma')
            {
                obj = {"text":''}; 
                $scope.xeroderma.push(obj);                 
            }
            else if(subcat=='edema')
            {
                obj = {"text":''}; 
                $scope.edema.push(obj);                
            }
            else if(subcat=='changes_in_nail')
            {
                obj = {"text":''}; 
                $scope.changes_in_nail.push(obj);                 
            }
            else if(subcat=='skin_pigmentation')
            {
                obj = {"text":''}; 
                $scope.skin_pigmentation.push(obj);                 
            }
            else if(subcat=='skin_color')
            {
                obj = {"text":''}; 
                $scope.skin_color.push(obj);                 
            }
            else if(subcat=='hydrosis')
            {
                obj = {"text":''}; 
                $scope.hydrosis.push(obj);                 
            }
            else if(subcat=='skin_temp')
            {
                obj = {"text":''}; 
                $scope.skin_temp.push(obj);                 
            }
            else if(subcat=='hair_change')
            {
                obj = {"text":''}; 
                $scope.hair_change.push(obj);                
            }            
            else if(subcat=='lesion')
            {
                obj = {"text":''}; 
                $scope.lesion.push(obj);                
            }            
            else if(subcat=='ulcer')
            {
                obj = {"text":''}; 
                $scope.ulcer.push(obj);                
            }        
        }
        if(type==35)
        {
            obj = {"0":'',"1":'','2':''}; 
            $scope.scales.push(obj);
        }
        if(type==36)
        {
            obj = {"text":''}; 
            $scope.other.push(obj);
        }
    }
    
    $scope.resetAssessmentObj = function()
    {
        angular.element("#assessment").addClass("loader");
         $scope.assessmentObj = {};
        $scope.assessmentObj.other = [];
        $scope.assessmentObj.complaints_patient = [];
        $scope.assessmentObj.problem_name = [];
        $scope.assessmentObj.since = [];
        $scope.assessmentObj.remark = [];
        $scope.assessmentObj.active_joint_name = [];
        $scope.assessmentObj.active_right = [];
        $scope.assessmentObj.active_left = [];
        $scope.assessmentObj.active_target = [];
        $scope.assessmentObj.passive_joint_name = [];
        $scope.assessmentObj.passive_right = [];
        $scope.assessmentObj.passive_left = [];
        $scope.assessmentObj.passive_target = [];
        $scope.assessmentObj.type_of_reflex = [];
        $scope.assessmentObj.name_of_scale = [];
        $scope.assessmentObj.name_of_test = [];
        $scope.assessmentObj.score = [];
        $scope.assessmentObj.result = [];
        $scope.assessmentObj.cn_name = [];
        $scope.assessmentObj.palpate = [];
        $scope.assessmentObj.calculate = [];
        $scope.assessmentObj.auscultate = [];
        $scope.assessmentObj.heart_rhythm = [];
        $scope.assessmentObj.ecg = [];
        $scope.assessmentObj.bp = [];
        $scope.assessmentObj.respiratory_rate = [];
        $scope.assessmentObj.oxygen_saturation = [];
        $scope.assessmentObj.pain_if_any = [];
        $scope.assessmentObj.other_field = [];
        $scope.assessmentObj.other_value = [];
        $scope.assessmentObj.other_field_gross = [];
        $scope.assessmentObj.other_value_gross = [];
        $scope.assessmentObj.other_field_sensory_element = [];
        $scope.assessmentObj.other_value_sensory_element = [];
        $scope.assessmentObj.diaphoresis = [];
        $scope.assessmentObj.arterial_pulse = [];
        $scope.assessmentObj.skin_color = [];
        $scope.assessmentObj.skin_temp = [];
        $scope.assessmentObj.skin_changes = [];
        $scope.assessmentObj.intermittent_claudication = [];
        $scope.assessmentObj.edema = [];
        $scope.assessmentObj.percussion_test = [];
        $scope.assessmentObj.trendelenburg_test = [];
        $scope.assessmentObj.lymphatic_system = [];
        $scope.assessmentObj.pruritus = [];
        $scope.assessmentObj.urticaria = [];
        $scope.assessmentObj.rash = [];
        $scope.assessmentObj.xeroderma = [];
        $scope.assessmentObj.edema = [];
        $scope.assessmentObj.changes_in_nail = [];
        $scope.assessmentObj.skin_pigmentation = [];
        $scope.assessmentObj.hydrosis = [];
        $scope.assessmentObj.hair_change = [];
        $scope.assessmentObj.lesion = [];
        $scope.assessmentObj.ulcer = [];
        $scope.assessmentObj.on_observation = [];
        $scope.assessmentObj.on_palpation = [];
        $scope.assessmentObj.muscle_name = [];
        $scope.assessmentObj.right = [];
        $scope.assessmentObj.left = [];
        $scope.assessmentObj.target = [];
        $scope.assessmentObj.area_of_examination = [];
        $scope.assessmentObj.type_of_sensation = [];
        $scope.assessmentObj.fine = [];
        $scope.assessmentObj.kinematic_analysis = [];
        $scope.assessmentObj.name_of_parameter = [];
        $scope.assessmentObj.purpose = [];
        $scope.assessmentObj.name = [];
        $scope.assessmentObj.ergonomic_or_body_mechanics = [];
        $scope.assessmentObj.eye_open = [];
        $scope.assessmentObj.eye_closed = [];
        $scope.assessmentObj.name_of_activity = [];
        $scope.assessmentObj.response = [];
        $scope.assessmentObj.test = [];
        $scope.assessmentObj.self_care = [];
        $scope.assessmentObj.orientation = [];
        $scope.assessmentObj.response_to_stimuli = [];
        $scope.assessmentObj.behaviour = [];
        $scope.assessmentObj.remark_scale = [];
        $scope.assessmentObj.memory = [];
        $scope.assessmentObj.attention = [];
        $scope.assessmentObj.higher_function = [];
        $scope.assessmentObj.type = [];
        $scope.assessmentObj.location = [];
        $scope.assessmentObj.serverity = [];
        $scope.assessmentObj.activity_name = [];
        $scope.assessmentObj.activity_result = [];
        $scope.assessmentObj.activity_remark = [];
        $scope.assessmentObj.scale_score = [];
        $scope.assessmentObj.scale_remark = [];
        $scope.assessmentObj.per_test = [];

        $scope.chief_complaint = [{"text":'Complaints of patient'}];
        $scope.vitals = [];
        $scope.risk_factor = [];
        $scope.associated_problem = [{"0":'Problem Name',"1":"Since","2":"Remark"}];
        $scope.on_observation = [{"text":'On Observation'}];
        $scope.on_palpation = [{"text":'On Palpation'}];
        $scope.history = [];
        $scope.anthroprometric_data = [];
        $scope.posture = []; 
        $scope.range_motion = [];
        $scope.range_motion_active = [{"0":'Joint name',"1":"Right","2":"Left","3":"Target"}];
        $scope.range_motion_passive = [{"0":'Joint name',"1":"Right","2":"Left","3":"Target"}]; 
        $scope.manual_muscle_testing = [{"0":'Muscle name',"1":"Right","2":"Left","3":"Target"}]; 
        $scope.reflex_integrity = [{"0":'Reflex Name',"1":"Remark"}]; 
        $scope.other_motor_function = []; 
        $scope.sensory_examination = [{"0":'Area of Examination',"1":"Type of Sensation","2":"Remark"}]; 
        $scope.coordination_gross = []; 
        $scope.coordination_fine = [{"0":"Fine"}]; 
        $scope.coordination_scales = [{"0":"Name of Scale","1":"Score","2":"Remark"}]; 
        $scope.balance_sensory_element = []; 
        $scope.balance_name_of_activity = [{"0":"Eye open","1":"Eye Closed"}]; 
        $scope.balance_dynamic_balance = [{"0":"Name of Activity","1":"Response"}]; 
        $scope.balance_d = [{"0":"Name of Scale","1":"Score","2":"Remark"}]; 
        $scope.gait_kinematic_analysis = [{"text":"Kinematic Analysis"}]; 
        $scope.gait_test = [{"0":"Test","1":"Remark"}]; 
        $scope.gait_parameter = [{"0":"Name of Parameter","1":"Score"}]; 
        $scope.assistive_and_adaptive_devices = [{"0":"Name","1":"Purpose","2":'Remark'}]; 
        $scope.orthosis_prosthesis = [{"0":"Name","1":"Purpose","2":'Remark'}]; 
        $scope.ergonomic_or_body_mechanics = [{"text":"Ergonomic or body mechanics"}]; 
        $scope.self_care_a = [{"text":"Self Care"}]; 
        $scope.self_care_b = [{"0":"Name of Scale","1":"Score","2":"Remark"}]; 
        $scope.special_test = [{"0":"Name of Test","1":"Result","2":"Remark"}]; 
        $scope.level_of_consciousness_a = [{"text":"Orientation"}]; 
        $scope.level_of_consciousness_b = [{"text":"Response to Stimuli"}]; 
        $scope.level_of_consciousness_c = [{"text":"Behaviour"}]; 
        $scope.level_of_consciousness_d = [{"text":"Remark"}]; 
        $scope.level_of_consciousness_scales = [{"0":"Name of Scale","1":'Score',"2":'Remark'}]; 
        $scope.cognitive_function_a = [{"text":"Memory"}]; 
        $scope.cognitive_function_b = [{"text":"Attention"}]; 
        $scope.cognitive_function_c = [{"text":"Behaviour"}]; 
        $scope.cognitive_function_d = [{"text":"Higher Function"}]; 
        $scope.cognitive_function_scales = [{"0":"Name of Test","1":'Result',"2":'Remark'}]; 
        $scope.speech_communication = []; 
        $scope.meningeal_irritation = []; 
        $scope.increased_intracranial_pressure = []; 
        $scope.autonomic_nervous_system = []; 
        $scope.cranial_nerve_integrity = [{"0":"CN Name","1":'Result',"2":'Remark'}]; 
        $scope.pain = [{"0":"Type","1":'Location',"2":'Severity'}]; 
        $scope.pain_scale = [{"0":"Name of Scale","1":'Score',"2":'Remark'}]; 
        $scope.perceptual_function_a = [{"0":"Activity name","1":'Result',"2":'Remark'}]; 
        $scope.perceptual_function_b = [{"0":"Name of Scale","1":'Score',"2":'Remark'}]; 
        $scope.pulse = [{'text':'Palpate'}]; 
        $scope.heart_rate = [{'text':'Calculate'}]; 
        $scope.heart_sound = [{'text':'Auscultate'}]; 
        $scope.heart_rhythm = [{'text':'Heart Rhythm'}]; 
        $scope.ecg = [{'text':'ECG'}]; 
        $scope.bp = [{'text':'BP'}]; 
        $scope.respiratory_rate = [{'text':'Respiratory rate'}]; 
        $scope.oxygen_saturation = [{'text':'Oxygen Saturation'}]; 
        $scope.pain_if_any = [{'text':'Pain if any'}]; 
        $scope.diaphoresis = [{'text':'Diaphoresis'}];
        $scope.arterial_pulse = [{'text':'Arterial pulse'}];
        $scope.skin_temp = [{'text':'Skin Temp'}];
        $scope.skin_color = [{'text':'Skin Color'}];
        $scope.skin_changes = [{'text':'Skin Changes'}];
        $scope.intermittent_claudication = [{'text':'Intermittent Claudication'}];
        $scope.edema = [{'text':'Edema'}];
        $scope.percussion_test = [{'text':'Percussion test'}];
        $scope.trendelenburg_test = [{'text':'Trendelenburg test'}];
        $scope.lymphatic_system = [{'text':'Lymphatic system'}];
        $scope.pruritus = [{'text':'Pruritus'}];
        $scope.urticaria = [{'text':'Urticaria'}];
        $scope.rash = [{'text':'Rash'}];
        $scope.xeroderma = [{'text':'Xeroderma'}];    
        $scope.changes_in_nail = [{'text':'Changes in nail'}];
        $scope.skin_pigmentation = [{'text':'Skin pigmentation'}];
        $scope.hydrosis = [{'text':'Hydrosis'}];
        $scope.hair_change = [{'text':'Hair Change'}];
        $scope.lesion = [{'text':'Lesion'}];
        $scope.ulcer = [{'text':'Ulcer'}];
        $scope.scales = [{"0":"Name of Scale","1":'Score',"2":'Remark'}];
        $scope.other = [{"text":"Other"}];
        angular.element("#assessment").removeClass("loader");
    }
    
    $scope.getSelectedForm = function(LoginSessionKey,patient_id)
    {
        $scope.assessmentObj.patient_id = patient_id;
        $scope.assessmentObj.LoginSessionKey = LoginSessionKey;
        var PostData = $scope.assessmentObj;
        commonService.commonApiCall(PostData, 'api/assessment/get_filled_form_list').then(function (response) {
            $scope.selectedResult = response.Data.result;
        }, function (error) {
            toastr.error(error.Message);
        }); 
    }
    $scope.getPatientAssessment = function(LoginSessionKey,patient_id,main_cat_id)
    {
        $scope.assessmentObj.patient_id = patient_id;
        $scope.assessmentObj.LoginSessionKey = LoginSessionKey;
        $scope.assessmentObj.main_cat_id = main_cat_id;
        var PostData = $scope.assessmentObj;
        commonService.commonApiCall(PostData, 'api/assessment/get_patient_assessment').then(function (response) {
            $scope.assementResult = response.Data.result;
            $scope.assementDate = response.Data.assessment_date;
        }, function (error) {
            toastr.error(error.Message);
        }); 
    }
    $scope.getAllPatientAssessment = function(LoginSessionKey,patient_id)
    {
//        angular.element("#ass_preview").addClass("loader");
        $scope.assessmentObj.patient_id = patient_id;
        $scope.assessmentObj.LoginSessionKey = LoginSessionKey;
        var PostData = $scope.assessmentObj;
        commonService.commonApiCall(PostData, 'api/assessment/get_all_patient_assessment').then(function (response) {
            $scope.assementResult = response.Data.result;
            angular.element("#ass_preview").removeClass("loader");
        }, function (error) {
            toastr.error(error.Message);
        }); 
    }
    $scope.removeAssessment = function(LoginSessionKey,assessment_id,ass_id)
    {    
        var patient_id = $scope.assessmentObj.patient_id;
        $scope.assessmentObj.LoginSessionKey = LoginSessionKey;
        $scope.assessmentObj.ass_id = ass_id;
        var PostData = $scope.assessmentObj;
        if(confirm("Are you sure you want to delete!"))
        {
            commonService.commonApiCall(PostData, 'api/assessment/remove_last_assessment').then(function (response) {
                toastr.success(response.Message);
                $scope.getAllPatientAssessment(LoginSessionKey,patient_id);
            }, function (error) {
                toastr.error(error.Message);
            }); 
        }
    }
    $scope.resetAssessmentObj();
    $scope.getSelectedForm = function(LoginSessionKey,patient_id)
    {
        $scope.assessmentObj.patient_id = patient_id;
        $scope.assessmentObj.LoginSessionKey = LoginSessionKey;
        var PostData = $scope.assessmentObj;
        commonService.commonApiCall(PostData, 'api/assessment/get_filled_form_list').then(function (response) {
            $scope.selectedResult = response.Data.result;
        }, function (error) {
            toastr.error(error.Message);
        }); 
    }
});
