// Application setup by Dharmedra

$(document).ready(function () {
    angular.bootstrap(document, ['App']);
});
angular.module('App', ['ReUsableControl', 'ngSanitize']).config([
    '$parseProvider', function ($parseProvider) {
        return $parseProvider.unwrapPromises(true);
    }
]);

// ServiceUrl
angular.module('App')
        .factory('appInfo', function () {
            return {
                serviceUrl: base_url + 'api/'
            }
        });


/*angular.module('App').run(function ($http) {
    $http.defaults.headers.common['Accept-Language'] = accept_language;
});*/


/* ReUsableControl Module
 ===========================*/
angular.module('ReUsableControl', [])
        .directive('uixInput', uixInput)
        .directive('uixTextarea', uixTextarea)

function uixInput() {
    return {
        restrict: 'EA',
        replace: true,
        template: '<input>',
        link: function ($scope, iElm, iAttrs) {
            iElm.loadControl();
        }
    }
}
function uixTextarea() {
    return {
        restrict: 'EA',
        replace: true,
        template: '<textarea />',
        link: function ($scope, iElm, iAttrs) {
            setTimeout(function () {
                iElm.loadControl()
            }, 500);
        }
    }
}

// Temporary data 
angular.module('App')
        .factory('tmpJson', function () {
            return {
                serviceUrl: base_url + 'assets/js/JsonData/'
            }
        })

/*Editable Region*/
$.fn.wallPostActivity = function () {
    //$(this).find('.media-thumb').imagefill();
    $(this).find('.media-block.fiveimgs').BlocksIt({
        numOfCol: 2,
        offsetX: 1,
        offsetY: 1,
        blockElement: '.media-thumbwrap'
    });
    //$(this).find('.composer textarea').autoGrowInput();
}

// Global Controller

angular.module('App').controller('reportAbuseCtrl', function ($scope, $http, appInfo, $rootScope) {
    $scope.flagUserOrActivity = function () {
        var LoginSessionKey = $('#LoginSessionKey').val();
        var Type = $('.flagType').val();
        var TypeID = $('.typeID').val();
        var IsMedia = $('.IsMedia').val();
        var FlagReason = '';
        $('.reportAbuseDesc:checkbox:checked').each(function () {
            FlagReason += $(this).val() + ',';
        });

        var EntityGUID = $('#entity_id').val();
        if (Type == 'Activity') {
            EntityGUID = TypeID;
        }
        
         $("#flagSubmitButton").attr('disabled','disabled');

        jsonData = {LoginSessionKey: LoginSessionKey, EntityType: Type, EntityGUID: EntityGUID, FlagReason: FlagReason,IsMedia:IsMedia};
        alertify.dismissAll();
        $http.post(appInfo.serviceUrl + 'flag', jsonData).success(function (response) {

            $( "#flagSubmitButton" ).prop( "disabled", false );
            
            if (response.ResponseCode == 200) {
                alertify.success('Post abused successfully.');
                $('#reportAbuse').modal('hide');
                if ($('#tid-' + TypeID).length > 0) {
                    $('#tid-' + TypeID).hide();
                    $('#tid2-' + TypeID).show();
                }
                if ($('#tid-user-' + TypeID).length > 0) {
                    $('#tid-user-' + TypeID).hide();
                    $('#tid2-user-' + TypeID).show();
                }
                if ($('#reportAbuseLink').length > 0) {
                    $('#reportAbuseLink').hide();
                    $('#reportAbuseLink2').show();
                }
                $('.reportAbuseDesc:checkbox').removeAttr('checked');
                //$('#reportAbuseLink').attr('src','javascript:void(0)');
                //$('#reportAbuseLink').html('src','javascript:void(0)');
            }
            else {
                alertify.error(response.Message);
            }
        });
    }
    
    $scope.$on('fbShareEmit', function(event){
                //extraParams.Entity.PostContent.toString()
                var content = $rootScope.shareContent.content;
                var extra_content = $rootScope.shareContent.contentExtra;
                var url = '';
                var MediaActivityGUID = $rootScope.shareContent.MediaActivityGUID;
                var Picture = $rootScope.shareContent.Picture;

                if(content==""){
                    content = extra_content;
                }

                if(content.length>=92)
                {
                    content = content+'...';
                }
                //if(typeof $rootScope.shareContent.UserGUID!=undefined && typeof $rootScope.shareContent.ActivityGuID!=undefined && $rootScope.shareContent.UserGUID!=""&&$rootScope.shareContent.ActivityGuID!=""){
                //    url = base_url+'user/'+$rootScope.shareContent.UserGUID+'/'+$rootScope.shareContent.ActivityGuID;
                //}
                
                //var picture='';
/*                if(typeof extra_content != 'undefined' && extra_content !=''){

                    var url = $("#contantToShare").children('.URLattachData').children('.attach_content').children('.atc_info').children('a').attr('href');
                    


                }else*/ if(typeof $rootScope.shareContent.UserGUID!=undefined && typeof $rootScope.shareContent.ActivityGuID!=undefined && $rootScope.shareContent.UserGUID!=""&&$rootScope.shareContent.ActivityGuID!=""){
                    
                    
                    var LoginSessionKey = $('#LoginSessionKey').val();

                    if($rootScope.shareContent.ActivityTypeID==1)
                    {
                        url = base_url+'user/'+$rootScope.shareContent.UserGUID+'/'+$rootScope.shareContent.ActivityGuID;

                        if(url && MediaActivityGUID!='')
                        {
                            url= url+'?Media='+MediaActivityGUID;
                        }

                        sharethisonfb(content,Picture,url);
                    }
                    else if($rootScope.shareContent.ActivityTypeID==8)
                    {
                        reqData = {ActivityTypeID:$rootScope.shareContent.ActivityTypeID,ModuleID:3,ModuleEntityID:$rootScope.shareContent.ModuleEntityID,LoginSessionKey:LoginSessionKey}
                        $http.post(appInfo.serviceUrl + 'activity/getTypeGUID', reqData).success(function (response) {   

                            url = base_url+'user/'+response.GUID+'/'+$rootScope.shareContent.ActivityGuID;

                            if(url && MediaActivityGUID!='')
                            {
                                url= url+'?Media='+MediaActivityGUID;
                            }

                            sharethisonfb(content,Picture,url);

                        });
                    }
                    else if($rootScope.shareContent.ActivityTypeID==16)
                    {
                        reqData = {ActivityTypeID:$rootScope.shareContent.ActivityTypeID,ModuleID:14,ModuleEntityID:$rootScope.shareContent.ModuleEntityID,LoginSessionKey:LoginSessionKey}
                        $http.post(appInfo.serviceUrl + 'activity/getTypeGUID', reqData).success(function (response) {   
                            
                            //console.log(response);

                            url = base_url+'events/event_wall/'+response.GUID+'/'+$rootScope.shareContent.ActivityGuID;

                            if(url && MediaActivityGUID!='')
                            {
                                url= url+'?Media='+MediaActivityGUID;
                            }

                            sharethisonfb(content,Picture,url);
                        });
                    }
                    else if($rootScope.shareContent.ActivityTypeID==31)
                    {
                        reqData = {ActivityTypeID:$rootScope.shareContent.ActivityTypeID,ModuleID:19,ModuleEntityID:$rootScope.shareContent.ModuleEntityID,LoginSessionKey:LoginSessionKey}
                        $http.post(appInfo.serviceUrl + 'activity/getTypeGUID', reqData).success(function (response) { 

                            url = base_url+'interest/interest_wall/'+response.GUID+'/'+$rootScope.shareContent.ActivityGuID; 
                        
                            if(url && MediaActivityGUID!='')
                            {
                                url= url+'?Media='+MediaActivityGUID;
                            }

                            sharethisonfb(content,Picture,url); 
                            
                        });
                    }
                }

               



            });
    $scope.$on('twitterShareEmit', function(event){
        var content = $rootScope.shareContent.content;
        var extra_content = $rootScope.shareContent.contentExtra;
        if(typeof extra_content=='undefined'){
            extra_content = '';
        }
        var url = '';
  
        if(content==""){
            content = extra_content;
        }

        content = content.replace(/&nbsp;/gi,'');

        //var tweet = encodeURI('https://twitter.com/intent/tweet?text='+content);
        var MediaActivityGUID = $rootScope.shareContent.MediaActivityGUID;

        //var picture='';
/*        if(typeof extra_content != 'undefined' && extra_content !=''){
            url = $("#contantToShare").children('.URLattachData').children('.attach_content').children('.atc_info').children('a').attr('href');
        }else */if(typeof $rootScope.shareContent.UserGUID!=undefined && typeof $rootScope.shareContent.ActivityGuID!=undefined && $rootScope.shareContent.UserGUID!=""&&$rootScope.shareContent.ActivityGuID!=""){

                    
                    
                    var LoginSessionKey = $('#LoginSessionKey').val();

                    if($rootScope.shareContent.ActivityTypeID==1)
                    {
                        url = base_url+'user/'+$rootScope.shareContent.UserGUID+'/'+$rootScope.shareContent.ActivityGuID;

                        if(url!=""){

                            if(url && MediaActivityGUID!='')
                            {
                                url= url+'?Media='+MediaActivityGUID;
                            }
                            //tweet = encodeURI('https://twitter.com/intent/tweet?url='+url);
                            tweet = encodeURI('https://twitter.com/intent/tweet?text='+content+'&url='+url+'&via=Ybann.com');
                        }
                        var win = window.open(tweet, '_blank');
                        win.focus();
                        $("#sharePopUpModal").modal('hide');
                    }
                    else if($rootScope.shareContent.ActivityTypeID==8)
                    {
                        reqData = {ActivityTypeID:$rootScope.shareContent.ActivityTypeID,ModuleID:3,ModuleEntityID:$rootScope.shareContent.ModuleEntityID,LoginSessionKey:LoginSessionKey}
                        $http.post(appInfo.serviceUrl + 'activity/getTypeGUID', reqData).success(function (response) {   

                            url = base_url+'user/'+response.GUID+'/'+$rootScope.shareContent.ActivityGuID;

                            if(url!=""){

                                if(url && MediaActivityGUID!='')
                                {
                                    url= url+'?Media='+MediaActivityGUID;
                                }
                                //tweet = encodeURI('https://twitter.com/intent/tweet?url='+url);
                                tweet = encodeURI('https://twitter.com/intent/tweet?text='+content+'&url='+url+'&via=Ybann.com');
                            }
      
                            var win = window.open(tweet, '_blank');
                            win.focus();
                            $("#sharePopUpModal").modal('hide');
                        });
                    }
                    else if($rootScope.shareContent.ActivityTypeID==16)
                    {
                        reqData = {ActivityTypeID:$rootScope.shareContent.ActivityTypeID,ModuleID:14,ModuleEntityID:$rootScope.shareContent.ModuleEntityID,LoginSessionKey:LoginSessionKey}
                        $http.post(appInfo.serviceUrl + 'activity/getTypeGUID', reqData).success(function (response) {   
                            
                                url = base_url+'events/event_wall/'+response.GUID+'/'+$rootScope.shareContent.ActivityGuID;

                                if(url!=""){

                                    if(url && MediaActivityGUID!='')
                                    {
                                        url= url+'?Media='+MediaActivityGUID;
                                    }
                                    //tweet = encodeURI('https://twitter.com/intent/tweet?url='+url);
                                    tweet = encodeURI('https://twitter.com/intent/tweet?text='+content+'&url='+url+'&via=Ybann.com');
                                }
                                var win = window.open(tweet, '_blank');
                                win.focus();
                                $("#sharePopUpModal").modal('hide');
                        });
                    }
                    else if($rootScope.shareContent.ActivityTypeID==31)
                    {
                        reqData = {ActivityTypeID:$rootScope.shareContent.ActivityTypeID,ModuleID:19,ModuleEntityID:$rootScope.shareContent.ModuleEntityID,LoginSessionKey:LoginSessionKey}
                        $http.post(appInfo.serviceUrl + 'activity/getTypeGUID', reqData).success(function (response) { 

                            url = base_url+'interest/interest_wall/'+response.GUID+'/'+$rootScope.shareContent.ActivityGuID; 
                        
                                if(url!=""){

                                    if(url && MediaActivityGUID!='')
                                    {
                                        url= url+'?Media='+MediaActivityGUID;
                                    }
                                    //tweet = encodeURI('https://twitter.com/intent/tweet?url='+url);
                                    tweet = encodeURI('https://twitter.com/intent/tweet?text='+content+'&url='+url+'&via=Ybann.com');
                                }
                                var win = window.open(tweet, '_blank');
                                win.focus();
                                $("#sharePopUpModal").modal('hide');
                            
                        });
                    }
                
        }
            

        

    });
    

    $scope.AllCommunities = [];    
    $scope.NoCommunities = false;    

    var intoInterest = 0

    $scope.getAllCommunities = function()
    {       
            var LoginSessionKey = $('#LoginSessionKey').val();
            var GUIDUser = $("#GUIDUser").val();

            Search = $('#searchFirstInterest').val();

            $('#loaderInterest').show();

            var reqData = {LoginSessionKey:LoginSessionKey,GUIDUser:GUIDUser,PageNo:1,PageSize:1000,Search:Search}

            if(intoInterest==0)
            {
                intoInterest =1;
                $scope.AllCommunities = [];  
                $http.post(appInfo.serviceUrl + 'community/searchCommunity', reqData).success(function (response) {
                    
                    if(response.Data)
                    $scope.AllCommunities = response.Data;


                    if($scope.AllCommunities.length<1 )
                    {
                        $scope.NoCommunities = true;
                        $('#noRecordsInterest').text('No interest found');
                    }else{
                        $scope.NoCommunities = false;
                    }
                    
                    $('#loaderInterest').hide();
                    //$scope.$apply();   
                    
                    

                    intoInterest =0;
                    
                });


            }
    }

    $scope.createWelcomePost = function (Url)
    {  

        $scope.LoginSessionKey = $('#LoginSessionKey').val();
      
        reqData = {LoginSessionKey: $scope.LoginSessionKey};
        $http.post(appInfo.serviceUrl + 'wallpost/WelcomePost', reqData).success(function (response) {
          
            if (response.ResponseCode == 200)
            {

                window.location = Url;
               
            }
            else
                alertify.error(response.Message);
        });
    }
    
    $scope.FollowInterestBusy = false;
    $scope.UserInterestCount = 0;    

    var LoginRoleID = $("#LoginRoleID").val();

    $scope.FollowInterest = function (CID,IsSignup)
    {  
        $scope.FollowInterestBusy = true;
        $('#followBtn-'+CID).attr('disabled',true);
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
        $scope.CommunityGUID = CID;
        reqData = {LoginSessionKey: $scope.LoginSessionKey, CommunityGUID: $scope.CommunityGUID,IsSignup:IsSignup};
        followText = $('#followBtn-'+CID+' span').text().toLowerCase();
        $http.post(appInfo.serviceUrl + 'community/join_drop_community', reqData).success(function (response) {
            alertify.dismissAll();
            if (response.ResponseCode == 200)
            {
                alertify.success(response.Message);

                $scope.UserInterestCount = response.UserInterestCount;

                if($scope.UserInterestCount==3)
                {
                   

                    var ConfirmMsg = "You have successfully followed 3 interest press ok to move for further activities & esc to follow more interests";

                    if(LoginRoleID==6)
                    {
                        ConfirmMsg = "You have successfully followed 3 interest press ok to complete your profile setup & esc to follow more interests";
                    }

                  alertify.confirm(ConfirmMsg, function (e) {
                 
                    if (e) {
                        }
                    }).set('onok', function(closeEvent){ 

                        var URL = site_url+'dashboard';

                        if(LoginRoleID==6)
                        {
                            URL = site_url+'userprofile/about_user';
                        }

                         $scope.createWelcomePost(URL);
                    
                    } ).set('labels', {ok:'ok', cancel:'esc'});
                    
                    $(".ajs-header").text('Ybann');
                    $(".ajs-cancel").addClass('ajs-ok'); 

                }

                if(followText=='follow'){                  
                    if(IsSignup==1){
                        $('#followBox-'+CID).fadeOut();
                    }else{
                        $('#followBtn-'+CID).removeClass('btn-default');
                        $('#followBtn-'+CID+' span').text('Following');
                        $('#followBtn-'+CID).addClass('following');
                        $('#followBtn-'+CID).addClass('btn-primary');
                        //$('#followBtn-'+CID).attr('disabled',true);
                    }
                }else{
                    $('#followBtn-'+CID+' span').text('Follow');
                    $('#followBtn-'+CID).removeClass('following');
                    $('#followBtn-'+CID).removeClass('btn-primary');
                }
            }
            else
                alertify.error(response.Message);
        });
    }
    
    
    /*
    $scope.FollowInterest = function (CID)
    { 
        followText = $('#followBtn-'+CID+' span').text().toLowerCase();
        if(followText=='follow'){
            $('#followCheck-'+CID).prop("checked",true);
            $('#followBtn-'+CID+' span').text('Following');
            $('#followBtn-'+CID).addClass('following');
            $('#followBtn-'+CID).addClass('btn-primary');
        }else{
            $('#followCheck-'+CID).prop("checked",false);
            $('#followBtn-'+CID+' span').text('Follow');
            $('#followBtn-'+CID).removeClass('following');
            $('#followBtn-'+CID).removeClass('btn-primary');
        }
    }
    */
   
    $scope.continueAfterFollow = function (Url)
    { 
        $scope.LoginSessionKey = $('#LoginSessionKey').val();
        reqData = {LoginSessionKey: $scope.LoginSessionKey};
        $http.post(appInfo.serviceUrl + 'community/getUserinteresCount', reqData).success(function (response) {
            if(response.Data.InterestCount>=3){
                //window.location = Url;
                $scope.createWelcomePost(Url);


            }else{
                alertify.error('You must select minimum three interest to continue.');
                return false;
            }
        });
    }


    $scope.userCommunity = [];    

    var into =0;

    $scope.getUserCommunity = function()
    {       
            var LoginSessionKey = $('#LoginSessionKey').val();
            var GUIDUser = $("#loginGuID").val();

            Search = $('#searchforInterest').val();

            $('#loaderShareCommunity').show();
            
            MusicInterestID = $("#MusicInterestID").val();


            var reqData = {LoginSessionKey:LoginSessionKey,GUIDUser:GUIDUser,PageNo:1,PageSize:100,Search:Search,join:'1',Type:'share'}


            if($rootScope.ShareCommunity.ShareType=='Track' || $rootScope.ShareCommunity.ShareType=='AlbumTrack' ||  $rootScope.ShareCommunity.ShareType=='MusicVideo')
            {
                reqData.CommunityID = $("#MusicInterestID").val();   
            }
            

            if(into==0)
            {
                into =1;
                $scope.userCommunity = [];  
                $http.post(appInfo.serviceUrl + 'community/communityListing', reqData).success(function (response) {
                    
                    if(response.Data)
                    $scope.userCommunity = response.Data;


                    if($scope.userCommunity.length<1 )
                    {
                        $('#noRecordsCommunity').text('No interest found');
                    }
                    
                    $('#loaderShareCommunity').hide();
                    //$scope.$apply();   
                    
                    setTimeout(function(){
                    
                    var limit = 2;
                        
                    $('input.checkBoxInterest').change(function(e) {

                        alertify.dismissAll();
                      
                        var CommunityGUID = $('input:checkbox[name="CommunityGUID[]"]:checked')
                        .map(function () {
                            return $(this).val()
                        })
                        .get();

                       if(CommunityGUID.length > limit) {
                        alertify.error('You can select maximum two interests at once');
                        this.checked = false;
                       }

                    });

                    },1000)

                    into =0;
                });
            }
    }

    $scope.ShareInCommunity = function()
    {

        var CommunityGUID = $('input:checkbox[name="CommunityGUID[]"]:checked')
        .map(function () {
            return $(this).val()
        })
        .get();   


        if(CommunityGUID.length==0)
        {
            alertify.error('Please select atleast one interest to share');
            return false;
        }
        else if(CommunityGUID.length>2)
        {
            alertify.error('You can select maximum two interests at once');
            return false;
        }

        var ActivityGUID = $("#shareActivityGUID").val();
        var ShareType = $("#ShareType").val();

        var NewsFeedData = '';

        var FeedID = '';

        if(ShareType=='NewsStand')
        {
            NewsFeedData = $('#NewsFeedData').html();
            FeedID = $rootScope.SharedFeedID;
        }


        
        reqData = {EntityGUID:ActivityGUID,LoginSessionKey:LoginSessionKey,ModuleID:19,ModuleEntityGUID:CommunityGUID,ActivityTypeID:1,VisibleFor:1,ShareType:ShareType,NewsFeedData:NewsFeedData,FeedID:FeedID};

        reqData.ActivityTypeID = '';

        if($rootScope.ShareCommunity.ActivityTypeID!='')
        {
            reqData.ActivityTypeID = $rootScope.ShareCommunity.ActivityTypeID;

        }

         $http.post(appInfo.serviceUrl + 'activity/ShareInCommunity', reqData).success(function (response) {

            if(response.ResponseCode==200)
            {
                alertify.success(response.Message);
            }
            else {
                alertify.error(response.Message);
            }

            $("#CommunityShareModal").modal('hide');
                  
            if($rootScope.ShareCommunity.ShareType=='Track' || $rootScope.ShareCommunity.ShareType=='AlbumTrack')
            {
                var scope = angular.element($("#WallPostCtrl")).scope();
                
                if($rootScope.ShareCommunity.ShareType=='Track')
                scope.EpTracks[$rootScope.ShareCommunity.index].SharedInCommunity=1;

                if($rootScope.ShareCommunity.ShareType=='AlbumTrack')
                scope.TrackList[$rootScope.ShareCommunity.index].SharedInCommunity=1;
                
                console.log('into');
            }   


         });

    }


    $scope.joinFirstInterest = function(redirectUrl)
    {

        var CommunityGUID = $('input:checkbox[name="interestGUID[]"]:checked')
        .map(function () {
            return $(this).val()
        })
        .get();   


        if(CommunityGUID.length<3)
        {
            alertify.error('Please select minimum three interest');
            return false;
        }
        

        ActivityGUID = $("#shareActivityGUID").val();

        reqData = {LoginSessionKey:LoginSessionKey,CommunityGUID:CommunityGUID};

         $http.post(appInfo.serviceUrl + 'community/JoinFirstInterests', reqData).success(function (response) {

            if(response.ResponseCode==200)
            {
                alertify.success(response.Message);

                setTimeout(function(){ window.location = redirectUrl;},1000)
               
            }
            else {
                alertify.error(response.Message);
            }

           //$("#AllCommunityListModal").modal('hide');
         });

    }

    $scope.sharePost = function () {

        var type=$('#wall_type').val();

        var ModuleID            = $(".ModuleIDShare").val();
        var ModuleEntityGUID    = $(".ModuleEntityGUIDShare").val();
        var ActivityGUID        = $(".ActivityGUIDShare").val();
        var ActivityTypeID      = $(".ActivityTypeIDShare").val();
        var VisibleFor          = $(".VisibleForShare").val();

        var MusicShareID        = $(".MusicShareID").val();

        var isNewsFeed          = $("#isNewsFeed").val();


       

        var postShareCont = document.getElementById("postShareCont").value;


        var LoginSessionKey = $('#LoginSessionKey').val();
        
        if(isNewsFeed==0)
        {


            reqData = {EntityGUID:ActivityGUID,LoginSessionKey:LoginSessionKey,ModuleID:ModuleID,ModuleEntityGUID:ModuleEntityGUID,ActivityTypeID:ActivityTypeID,VisibleFor:VisibleFor,ShareContant:postShareCont,MusicShareID:MusicShareID};

            $("#loaderSharePost").show();
            $("#shareButton").attr('disabled', 'disabled');

             $http.post(appInfo.serviceUrl + 'activity/share', reqData).success(function (response) {
             alertify.dismissAll();
             if(response.ResponseCode == 200){  
                alertify.success('Post shared successfully');
                
                var isLoginUser = $("#isLoggedInuser").val();

            if( (type=='dashboard' || type=='Self Wall') && isLoginUser == 1)
            setTimeout(function(){ location.reload();},500); 
            } else {
                alertify.error(response.Message);
            }
            
            $("#sharePopUpModal").modal('hide');
            $("#loaderSharePost").hide();
            $("#shareButton").removeAttr('disabled');

            });

     }
     else
     {      
            var EntityID = $("#UserID").val();
            var PostUrlData = $("#contantToShare").html();

            reqData = {PostContent:postShareCont,LoginSessionKey:LoginSessionKey,Postlocation:'',PostTypeID:2,EntityID:EntityID,WallType:'dashboard',PostUrlData:PostUrlData,VisibleFor:VisibleFor,MusicShareID:MusicShareID};
            
            $http.post(appInfo.serviceUrl + 'wallpost/createWallPost', reqData).success(function (response) {
             alertify.dismissAll();
             if(response.ResponseCode == 200){  
                alertify.success('Post shared successfully');
                
                var isLoginUser = $("#isLoggedInuser").val();
            } 
            
            $("#sharePopUpModal").modal('hide');
            
            });

     }

        
    }


    $scope.SliderImages = [];

    $scope.getSliderImages = function()
    {

         $http.post(appInfo.serviceUrl + 'signup/getSliderImages').success(function (response) {

            if(response.ResponseCode==200)
            {
                $scope.SliderImages = response.Data;
                
            }
            
            setTimeout(function(){


                $('.bxslider').bxSlider({
                    pager:false,
                        // CONTROLS
                controls: false,
                nextText: 'Next',
                prevText: 'Prev',
                nextSelector: null,
                prevSelector: null,
                autoControls: false,
                startText: 'Start',
                stopText: 'Stop',
                autoControlsCombine: false,
                autoControlsSelector: null,
                speed: 4000,
                infiniteLoop: false,

                // AUTO
                auto: 20000,
                pause: 20000,
                autoStart: true,
                autoDirection: 'next',
                autoHover: false,
                autoDelay: 0,
                autoSlideForOnePage: false,

                onSlideBefore: function(){

                    var imageHeight = $('.bxslider li img').height();
                    //console.log(imageHeight);
                    $('.bxslider li, .sliderwrap').height(imageHeight);

                }

                });
            sliderImage();

            },0);


         });

    }


});

$(document).ready(function(){

    $('input#searchforInterest').keyup(function (e) {
        if ($('#searchforInterest').val().length >= 2 || $('#searchforInterest').val().length < 1) {
            $('#searchInterest').trigger('click');
        }
    });

    $('input#searchFirstInterest').keyup(function (e) {
        if ($('#searchFirstInterest').val().length >= 2 || $('#searchFirstInterest').val().length < 1) {
            $('#InterestFirstSearch').trigger('click');
        }
    });

var limit = 2;

setTimeout(function(){

$('input.checkBoxInterest').change(function(e) {

   if($(this).siblings(':checked').length >= limit) {
       this.checked = false;
   }

});

},1000)



});

/*$(document).ready(function () {
    $('#Globalsearch').bind("keypress", function (e) {
        if (e.keyCode == 13 && $('#Globalsearch').val() != '')
            angular.element(document.getElementById('SearchCtrl')).scope().CommunityList('search');
    });
});*/