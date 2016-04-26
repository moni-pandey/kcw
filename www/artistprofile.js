$("document").ready(function() {

location_fetched  = ' ' ;
 ajaxflag = true 
 newindex = 0;
 ACCESS_TOKEN=''
 userid=''
 firsttime=true;
 socialMediaType =''
 lastindex=''
 var cHeight = 0;
var userdata =JSON.parse(localStorage.getItem('loggeduser'))
console.log(userdata)
console.log(localStorage.getItem('lastloggeduser'))
//$('#city').html('in Funds ,' userdata.data.city)
$('.artist-info').html(userdata.user.artistType+'<br><span class="artist-fund-amt">$0</span> in Funds ,'+userdata.user.city+ '</span>')
$(document).bind("deviceready", function() {
			document.addEventListener("backbutton", function() {
						console.log("Disabled Back button");
			});
			});
	//feed trent btn		
 $(document).on('click' , '.feed-btn', function () {
       localStorage.setItem('feedclicked' ,'true');
	 localStorage.setItem('trendclicked' ,'false');
	 localStorage.setItem('loggedINuserpatronid' ,0)
	 localStorage.profileartist=true
      window.location='home1_Patron.html'
	  });
	  
$(document).on('click' , '.trending-btn', function () {
	
localStorage.setItem('feedclicked' ,'false');
localStorage.setItem('trendclicked' ,'true');
localStorage.setItem('loggedINuserpatronid' ,0)
localStorage.profileartist=true
     window.location='home3_Patron.html'
	  });

$('.name-of-artist').text(localStorage.getItem('loggedINusername'));
     
	   callforcarouselimages();
   
	 	
	    if(localStorage.googleLinked=='true')
		{
			   $('.googl_pic').attr('src' ,'./assets/img/g+-31x31-color.png')
			//localStorage.googleLinked =false
			}
     
	     if(localStorage.fbLinked=='true')
		 {
          $('#fb_pic').attr('src' ,'./assets/img/fb-31x31-color.png')
     
		//localStorage.fbLinked =false 
		}  
	     if(localStorage.youLinked=='true')
		 {
           $('.youtube_pic').attr('src' ,'./assets/img/YT-31x31-color.png')
        // localStorage.youLinked=false       
		 }      
		 if(localStorage.instaLinked=='true')
		 {
	     $('.instagram_pic').attr('src' ,'./assets/img/ins-31x31-color.png')
	  //localStorage.instaLinked=false
	  }
	  
	  
	  
                
                    

					  /**on click for fund me button **/
					 $('#fundbtn').on('click',function(){

				              //alert('indside fundme');
					 var a =localStorage.getItem('loggedINuserartistid')	;
					 //alert(a);
						someobj = {};
					someobj.data =[];
				if (checkConnection()) {	$.ajax({
						type : 'GET',
						url: localStorage.getItem('webserviceurl')+"artist/expense",
						contentType: "application/json",
						dataType: "json",
						data : JSON.stringify({
						"artistID" : localStorage.getItem('loggedINuserartistid')
					  }),
					   success : function(data)
								{
							//alert(data);
							localStorage.setItem('newdataa' ,data);
							//alert('loadprof');
								loadprof();
										  
						},error :function (xhr,status,error)
						{
						alert('error')
						//alert(xhr.status);
						//alert(xhr.responseText);
						}
										  
						});} else showAlert("Please Connect to Internet to Login");


					 }); //end fundbtn         


		  
	
	    	/*******for changing  art name n type on image change************/
					
	$(document).on('slide.bs.carousel','#myCarousel',function(e){
		
		//new story 
		

        var $nextImage = null;

        $activeItem = $('.active.item', this);

        if (e.direction == 'left'){
            $nextImage = $activeItem.next('.item').find('img');
			 var cc = $('.carousel-inner .active').next().data('comment')
				 var lc = $('.carousel-inner .active').next().data('likecount')
				 var ta = $('.carousel-inner .active').next().data('art')
				 var na = $('.carousel-inner .active').next().data('caption')
				$('.type-of-art-ccount').text(cc);
				 $('.type-of-art-lcount').text(lc);
				 $('.type-of-art').text(ta);
				 $('.name-of-art').text(na);
			
			
        } else {
			if ($activeItem.index() == 0){
				 
                $nextImage = $('img:last', $activeItem.parent());
				console.log($nextImage)
            } else {
                $nextImage = $activeItem.prev('.item').find('img');
				 var cc = $('.carousel-inner .active').prev().data('comment')
				 var lc = $('.carousel-inner .active').prev().data('likecount')
				 var ta = $('.carousel-inner .active').prev().data('art')
				 var na = $('.carousel-inner .active').prev().data('caption')
				 $('.type-of-art-ccount').text(cc);
				 $('.type-of-art-lcount').text(lc);
				 $('.type-of-art').text(ta);
				 $('.name-of-art').text(na);
				
            }
	    }

        // prevents the slide decrease in height
        if (cHeight == 0) {
           cHeight = $(this).height();
           $activeItem.next('.item').height(cHeight);
        }

        // prevents the loaded image if it is already loaded
        var src = $nextImage.data('lazy-load-src');
        
        if (typeof src !== "undefined" && src != "") {
           $nextImage.attr('src', src)
           $nextImage.data('lazy-load-src', '');
        }
    
		
		
		
		
    // var left = $('#myCarousel').find('.item.active.left');
    // var right = $('#myCarousel').find('.item.active.right');
	/*var parsedata =JSON.parse(localStorage.getItem('cdata'));
	var lastindex = parsedata.art.length 
	var slideFrom = $(this).find('.active').index();
    var slideTo = $(e.relatedTarget).index();
    var direction =e.direction;
	 if(direction=='left')
	 {
	 var cc = $('.carousel-inner .active').next().data('comment')
	 var lc = $('.carousel-inner .active').next().data('likecount')
	 var ta = $('.carousel-inner .active').next().data('art')
	 var na = $('.carousel-inner .active').next().data('caption')
	$('.type-of-art-ccount').text(cc);
     $('.type-of-art-lcount').text(lc);
	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
	 
	 }else{
		 
	 var cc = $('.carousel-inner .active').prev().data('comment')
	 var lc = $('.carousel-inner .active').prev().data('likecount')
	 var ta = $('.carousel-inner .active').prev().data('art')
	 var na = $('.carousel-inner .active').prev().data('caption')
	 $('.type-of-art-ccount').text(cc);
     $('.type-of-art-lcount').text(lc);
	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
		 
	 }
	if(slideTo=='0')
	{   
       console.log('slide to ')
		if(newindex>=lastindex|| newindex==0)
		{ newindex =0
	      console.log('images over ')
		  firsttime=true
		  //callforcarouselimages();
	      SetCrousel();
	    }
	     else	 {
			console.log('images left')
		 $('.type-of-art-ccount').text(parsedata.art[newindex].commentcount);
        $('.type-of-art-lcount').text(parsedata.art[newindex].likecount);
	    $('.type-of-art').text(parsedata.art[newindex].artType);
	       $('.name-of-art').text(parsedata.art[newindex].caption);
			 SetCrousel();
		 }
	}
	*/
	
});
			
  var modalc = $(document).find(".carousel");
	    var hammerobj = new Hammer(modalc[0]);
	    modalc.carousel({
	        pause: true,
	        interval: false
	    });
	    modalc.carousel('pause');

	    hammerobj.on('swipeleft', function(e) {
	        console.log("touch left");
			
	        modalc.carousel('next');
	 var cc = $('.carousel-inner .active').next().data('comment')
	 var lc = $('.carousel-inner .active').next().data('likecount')
	 var ta = $('.carousel-inner .active').next().data('art')
	 var na = $('.carousel-inner .active').next().data('caption')
	$('.type-of-art-ccount').text(cc);
     $('.type-of-art-lcount').text(lc);
	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
	    })
	    hammerobj.on('swiperight', function() {
	        console.log("touch right");
	        modalc.carousel('prev');
			 var cc = $('.carousel-inner .active').prev().data('comment')
	 var lc = $('.carousel-inner .active').prev().data('likecount')
	 var ta = $('.carousel-inner .active').prev().data('art')
	 var na = $('.carousel-inner .active').prev().data('caption')
	 $('.type-of-art-ccount').text(cc);
     $('.type-of-art-lcount').text(lc);
	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
	    })

	
		
	

	
/************* display art comment*****************/
$(document).on('click','.comment-img' ,function() {
localStorage.setItem('fromArtistPage','true');
  var imagid =$('.carousel-inner .active').attr('id')
  //alert(imagid);
  localStorage.setItem('crouselartid' ,imagid)
  localStorage.setItem('fromartistprof' ,'true')
window.location = 'comment_Page_new.html' ;


})




$('.name-of-artist').text(localStorage.getItem('loggedINusername'));


       $('document').append($.cloudinary.unsigned_upload_tag("ah5jlzue", {
        cloud_name: 'lskcw'
    }));
    $('.uploader').unsigned_cloudinary_upload("ah5jlzue", {
        cloud_name: 'lskcw'
    }, {
        multiple: true
    }).bind('cloudinarydone', function(e, data) {
	       // alert('moni');
           //alert(data.result.secure_url);
			localStorage.setItem('uploadedimageurl' ,data.result.secure_url);
			console.log(localStorage.getItem('uploadedimageurl'));
            $('.thumbnails').append('<img src="' + data.result.secure_url + '" style="height:30px;width:30px;">');
              
			 // importart();
		   
		   //initiate_geolocation();
        }

    ).bind('cloudinaryprogress', function(e, data) {
        var progVal = Math.round((data.loaded * 100.0) / data.total);
        $("#uploadprogressbar").css('display','block');
        $("#uploadprogressbar.progress-bar").attr('aria-valuenow', progVal);
        
        if (progVal == "100") {
            $("#uploadprogressbar").css('display','none');
          
		  
		   //alert('Uploaded Successfully');
            console.log(progVal + '%');
			
			initiate_geolocation();
			//$('div.upload input').css({"visibility":'hidden'});
			//$('div.upload input').css({"display":'none'});
        }



    });
	
/* */	
	
$(document).on('click' , '#fb_pic' ,function(e){
console.log('fb_pic');
$(this).attr('src' ,'./assets/img/fb-31x31-color.png')
getfbuserid();
socialMediaType='F'
//getsocialmedia()

});	

$(document).on('click' , '.twitter_pic' ,function(e){
console.log('fb_pic');
$(this).attr('src' ,'./assets/img/twi-31x31-color.png')
//getfbuserid();
gettwitter()

});
$(document).on('click' , '.youtube_pic' ,function(){
console.log('you_pic');

$(this).attr('src' ,'./assets/img/YT-31x31-color.png')
//localStorage.setItem('youtubeclicked' ,'true')
window.location='youtube.html'

});

$(document).on('click' , '.instagram_pic' ,function(){

$(this).attr('src' ,'./assets/img/ins-31x31-color.png')
linkInstagram()

});
$(document).on('click' , '.googl_pic' ,function(){
$(this).attr('src' ,'./assets/img/g+-31x31-color.png')
//getUserid()
//localStorage.refreshgoogletoken=false
localStorage.gpfrstime=true;
socialMediaType=='G'
//window.location='google_gallery.html'
//getsocialmedia()
gplogin()
});



     });                             /**document.ready ends **/


function importart()
{
//alert('initiate_geolocation();')
//initiate_geolocation();

   var encoded = encodeURIComponent(localStorage.getItem('uploadedimageurl'));
   console.log(encoded)
  
$("body").addClass('loading')
//if (checkConnection()) {	
$.ajax({
      type: 'POST',
      url: localStorage.getItem('webserviceurl')+"artist/importart",
      data:
      {
		artistID : localStorage.getItem('loggedINuserartistid'),
		artType: 'new_art3',
		artUrl:encoded,
		socialMedia :'upload',
		location : location_fetched,
		caption: 'simple paint',
		tags : 'Something,Something'

},
      success: function(data){
      // alert(JSON.stringify(data));
      $("body").removeClass('loading')

	  //alert(data);
  
		console.log('calling from imortatr ')
		callforcarouselimages();
		 showAlert("Uploaded Successfully");
	  
      },
      error: function(xhr, status, error) {
  //var err = eval("(" + xhr.responseText + ")");
  showAlert(xhr.status);
 // alert(xhr.status);
 $("body").removeClass('loading')
  console.log(xhr);
}
    });
	//} else showAlert("Please Connect to Internet to Login");



}
//get lat and longitutde

 function initiate_geolocation() {
	 
	var options = {maximumAge: 0, timeout: 10000, enableHighAccuracy:false};
    
    navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors,options);
/*	if(location_fetched!=" ")
		 
    
  else{
	  				  
		 navigator.notification.alert(
            'enable location services ',  // message
            alertDismissed,         // callback
            'Kcw',            // title
            'ok'                  // buttonName
        );
	  
	  
  }
      */      
        }
 
   function handle_errors(error)
        {
            switch(error.code)
            {
                case error.PERMISSION_DENIED: showAlert("user did not share geolocation data enable location service"); 
                break;
 
                case error.POSITION_UNAVAILABLE:  showAlert("could not detect current position ,enable location service");
                break;
 
                case error.TIMEOUT: showAlert("retrieving position timed out ,enable location service");
                break;
 
                default: alert("unknown error");
                break;
            }
        }
 
        function handle_geolocation_query(position){
           // alert('Lat: ' + position.coords.latitude +
              //    ' Lon: ' + position.coords.longitude);
				  
				 location_fetched = position.coords.latitude + ',' + position.coords.longitude ;
				 // alert(location);
				  //alert('calling imoprtart');
				importart();
				 
			    
	
				  
        }

function loadprof()
{
window.location='fundArtist_Artist.html';


}




function callforcarouselimages()
{
/*if(localStorage.bckbtn)
	{newindex=0
firsttime=true
localStorage.bckbtn=false;
}*/
	//$("body").addClass("loading")
	
	//alert(localStorage.getItem('loggedINuserartistid'));
	console.log(localStorage.getItem('fbsignup'));
	// if(ajaxflag) 
	  
		  $.ajax({
	    type : 'GET',
	    url: localStorage.getItem('webserviceurl')+"artist/profile",
		contentType: "application/json",
	    dataType: "json",
		data : {
		"artistID" :localStorage.getItem('loggedINuserartistid'),
},
	   success : function(data)
			    { 
				//alert('inside getArtistSuccess loaddddddddd');
				//alert(data);
				//$("body").removeClass("loading")
				console.log(data)
			    var cdat = JSON.stringify(data);
				console.log(cdat);
				localStorage.setItem('cdata','');
				//alert(localStorage.getItem('cdata'));
				localStorage.setItem('cdata' ,cdat);
				//alert("images are loaded!");
			   // setCrousel();  
			   console.log('calling set')
			  
			    //SetCrousel(); 
                 setcarousel()				
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);
	//$("body").removeClass("loading")
	}						 
		
		
		});//end of ajax call 

		  
		  
	  
	
	
}

function setcarousel()
{
$('#myCarousel ol').html("");
$('#crouselItems').html(" ");



	
 var parsedata =JSON.parse(localStorage.getItem('cdata'));
  console.log(parsedata);
  if(parsedata.art.length=='0')
		 return;
   $('.type-of-art').text(parsedata.art[0].artType);
	$('.name-of-art').text(parsedata.art[0].caption);
	$('.type-of-art-ccount').text(parsedata.art[0].commentcount);
	$('.type-of-art-lcount').text(parsedata.art[0].likecount);
  for(var k = 0 ;k<parsedata.art.length  ;k++)
  {    
       var cHTML=""
	   console.log(k)
	   console.log(parsedata.art[k].artType)
	   console.log(parsedata.art[k].caption)
	   console.log(parsedata.art[k].commentcount)
	   console.log(parsedata.art[k].likecount)
	   
     var uri_dec = decodeURIComponent(parsedata.art[k].url)
	     	if(parsedata.art[k].url!="null")
		       {
				   console.log(parsedata.art[k].url)
			   }
			else
				{	
			     console.log('null')
			uri_dec='./assets/img/no_img.jpg'
			   }
		if(k==0)
		{
			if(uri_dec.indexOf('video')> -1)		   
                cHTML='<video width="100%" height="200px"  controls  ><source src="'+uri_dec+'"  type="video/mp4"></video>'
		  else
			     cHTML = '<img src="'+uri_dec+'"alt="Chania" style="height:200px">' 
			
		}
else
	
	     if(uri_dec.indexOf('video')> -1)		   
                cHTML='<video width="100%" height="200px"  controls   ><source src="'+uri_dec+'"  type="video/mp4"></video>'
		  else
			     cHTML = '<img data-lazy-load-src="'+uri_dec+'"alt="Chania" style="height:200px">' 
	var v =k+1		 
			 
		if(k==0)	 
		{	 
     $('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+k+'" class="active" id="'+parsedata.art[k].artID+'li"></li>\
											');
	 $('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
		'+cHTML+'\
		<div class="carousel-caption">\
        <p>'+v+' / '+parsedata.art.length+'</p>\
       \
      </div>\
		</div>\
	     ');			 
		} 
else{
	
	 $('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+k+'" class="active" id="'+parsedata.art[k].artID+'li"></li>\
											');
	 $('#crouselItems').append('<div class="item lazy-load" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
		'+cHTML+'\
		<div class="carousel-caption">\
        <p>'+v+' / '+parsedata.art.length+'</p>\
       \
      </div>\
		</div>\
	     ');	
}	

	
  }
}




function gplogin() {
    if (checkConnection()) {
        window.plugins.googleplus.login({
			'offline': true,
			'scopes': 'https://picasaweb.google.com/data/ https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.stream.read' 

			
            }, gpLoginSuccess,
            function(gpLoginError) {
                showAlert('gpLoginError: ' + gpLoginError);
            });
    } else showAlert("Please Connect to Internet to Login");
}







var gpLoginSuccess = function(gpUserData) {
    //Success Method of Google Login
    localStorage.setItem('googlelogindata', JSON.stringify(gpUserData));
	  
	//alert(JSON.stringify(gpUserData));
	
	localStorage.usergpmail=gpUserData.email 
	localStorage.access_tokeng = gpUserData.oauthToken
	localStorage.addtoken=gpUserData.oauthToken
	 localStorage.addemail=gpUserData.email
	 //localStorage.addid=fbPermissions.id
	window.location="google_gallery.html" 
	
	
   
};

function callyoutubechannel() {
	
	
	
		
		  $.ajax({
	    type : 'GET',
	    url: 'https://www.googleapis.com/youtube/v3/channels',
		
		data : {
		"part" : 'contentDetails',
         "mine" : 'true',
	
          "access_token":ACCESS_TOKEN
},
	   success : function(data)
			    { 
				
				console.log(data);
			 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	

}
/*
function getUserid() {
	
	
	if (checkConnection()) {
        window.plugins.googleplus.login({
			'offline': true,
		'scopes': 'https://picasaweb.google.com/data/  '

			
            }, gpLoginSuccess,
            function(gpLoginError) {
                showAlert('gpLoginError: ' + gpLoginError);
            });
    } else showAlert("Please Connect to Internet to Login");
	
	
}
*/
/*
var gpLoginSuccess = function(gpUserData) {
    //Success Method of Google Login
 
	alert(JSON.stringify(gpUserData));
	userid = gpUserData.email 
	
	  $.ajax({
	    type : 'GET',
	    url: 'https://picasaweb.google.com/data/feed/api/user/'+userid ,
		
		data : {
		'alt':'json',
		"access_token":gpUserData.oauthToken,
		"access":'all'
},
	   success : function(data)
			    { 
				//returns all the album 
				
				console.log(data);
				localStorage.setItem('googleAlbum', JSON.stringify(data.feed))
				console.log(localStorage.getItem('googleAlbum'));
			//	Window.location='google_gallery.html'
			 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	
	
   
};

*/

function getfbuserid()
{
	 if (checkConnection()) {
        facebookConnectPlugin.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                localStorage.fbuserid = response.authResponse.userID;
				//alert(localStorage.getItem('fbuserid'));
                localStorage.fbaccesstoken = response.authResponse.accessToken;
				
                fetchFBDetails();
            } else if (response.status === 'not_authorized') {
                facebookConnectPlugin.login(["public_profile", "email"], function(userData) {
                        fbLoginSuccess(userData)
                    },
                    function(fbLoginError) {
                        showAlert("fbLoginError" + JSON.stringify(fbLoginError));
                    });
            } else {
                facebookConnectPlugin.login(["public_profile", "email"], function(userData) {
                        fbLoginSuccess(userData)
                    },
                    function(fbLoginError) {
                        showAlert("fbLoginError" + JSON.stringify(fbLoginError));
                    });
            }
        }, function(data) {
            console.warn(data);
        });
    } else showAlert("Please Connect to Internet to Login");
	
	
	
}



var fbLoginSuccess = function(fbUserData) {
  fetchFBDetails();

};

function fetchFBDetails() {
    //Method to Extract Data from Facebook after Login
    /**added name parameter ,reuired for signin/login api included picture**/
    facebookConnectPlugin.api("/me?fields=email,name,picture", ['public_profile' ,"user_photos"],
        function(fbPermissions) {
         
		     localStorage.id=fbPermissions.id
		     localStorage.fbuserid=fbPermissions.id
			  localStorage.ftoken=fbPermissions.accessToken
			 localStorage.fbaccesstoken=fbPermissions.accessToken
			 localStorage.email=fbPermissions.email
			 //for adddsocila
		    localStorage.addtoken=fbPermissions.accessToken
	       localStorage.addemail=fbPermissions.email
	      localStorage.addid=fbPermissions.id
			 window.location='facebook_Gallery.html'
		
			
        },
        function(fetchFBDetailsError) {
            alert("fetchFBDetailsError: " + JSON.stringify(fetchFBDetailsError));
        }


    );
}



function alertDismissed()
{


}



   function linkInstagram() {
    // Method to Link Instagram account to KCW
    var instagramClientId = "2449c6ccef5e4d75ad8e5a0118797058";
    var redirect_uri = "http://localhost/callback/";
    if (checkConnection()) {
        if (localStorage.getItem('instagramtoken') == null)
            var instaWindow = openBrowser("https://api.instagram.com/oauth/authorize/?client_id=" + instagramClientId + "&redirect_uri=" + redirect_uri + "&response_type=token");
        else {
			
			//showAlert("You have already Linked Instagram")
		getinstaalbum()};
    } else showAlert("Please Connect to Internet to Login");
    instaWindow.addEventListener('loadstart', function(event) {
        if ((event.url).indexOf(redirect_uri) === 0) {
            var instagramAccessToken = (event.url).split('#access_token=')[1] || '';
            if (instagramAccessToken !== null)
			{
			localStorage.setItem('instagramtoken', instagramAccessToken);
			getinstaalbum()}
            else
                showAlert("Couldn't Authenticate your Instagram account");
            instaWindow.close();
        }

    });
}


function getinstaalbum()
{
	
	  $.ajax({
	    type : 'GET',
	    url: 'https://api.instagram.com/v1/users/self/media/recent?access_token='+localStorage.instagramtoken ,
		
		data : {
		
},
	   success : function(data)
			    { 
				
	  localStorage.instaAlbum= JSON.stringify(data)
	  localStorage.frominstagram=true
	  window.location="album_Name.html"
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	
	
	
}


function ADDSocialm()
{   
	 //localStorage.addtoken
	 //localStorage.addemail
	 //localStorage.addid
	var userdata =JSON.parse(localStorage.getItem('loggeduser'))
	var b = 	{"artistid":userdata.user.artistID,
		"token":localStorage.addtoken,
		"email":localStorage.addemail,
		"smacctid":localStorage.addid,
		"token1":"",
		"token2":"",
		"token3":"",
		"token4":"",
		"token5":"",
		"token6":"",
		"type":userdata.user.usertype

}
console.log(b)
		  $.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+'artist/add/socialmedia',
		
		data : {
		"artistid":userdata.user.artistID,
		"token":localStorage.addtoken,
		"email":localStorage.addemail,
		"smacctid":localStorage.addid,
		"token1":"",
		"token2":"",
		"token3":"",
		"token4":"",
		"token5":"",
		"token6":""

},
	   success : function(data)
			    { 
				
				console.log(data);
			  if(socialMediaType=='F')
			  {
				  getfbuserid();
			  }else if(socialMediaType=='G')
			  {
				gplogin();
			  }
				 
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	

}

function getsocialmedia()
{     
      var userdata =JSON.parse(localStorage.getItem('loggeduser'))
	
	 $.ajax({
	    type : 'GET',
	    url: localStorage.getItem('webserviceurl')+'artist/get/socialmedia',
		
		data : {
		"artistid":userdata.user.artistID,
		"type":socialMediaType
		

},
	   success : function(data)
			    { 
            var accountfind = socialMediaType ;
				if(data.accounts.length=='0')
				{
					ADDSocialm()
				}
			    else
				
				{
					for(var k =0 ;k <data.accounts.length ;k++)
					{
						if(socialMediaType == data.accounts[k].smAcctType)
						{   // accflag=true
					
					if(socialMediaType=='F')
					{	 localStorage.id=data.accounts[k].smAcctID
							 localStorage.fbuserid=data.accounts[0].smAcctID
							  localStorage.ftoken=data.accounts[0].token
							 localStorage.fbaccesstoken=data.accounts[0].token
							 localStorage.email=data.accounts[0].email
							 window.location='facebook_Gallery.html'
						}
								else   if(socialMediaType=='G')
					{
						  localStorage.usergpmail=data.accounts[0].email 
						   localStorage.access_tokeng = data.accounts[0].token
						  window.location="google_gallery.html" 
					
								}
								else {
									
			//		
								}
									
					
					}
					}
				/*	if(accflag)
				  {
					  
					  if(socialMediaType=='F')
			    {
				 localStorage.id=data.accounts[0].smAcctID
		     localStorage.fbuserid=data.accounts[0].smAcctID
			  localStorage.ftoken=data.accounts[0].token
			 localStorage.fbaccesstoken=data.accounts[0].token
			 localStorage.email=data.accounts[0].email
			 window.location='facebook_Gallery.html'
				
			    }else   if(socialMediaType=='G')
	{
	      localStorage.usergpmail=data.accounts[0].email 
	       localStorage.access_tokeng = data.accounts[0].token
	      window.location="google_gallery.html" 
	
				}
				else {
					
ADDSocialm()
					
				}
				
				}*/
				}
				
			console.log(data);
			 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	
	
}

function gettwitter()
{
    TwitterConnect.login(
        function(result) {
            console.log(result);
            localStorage.setItem('twitterlogindata', JSON.stringify(result));
	      var grant_type = '3nq2n2CUO66WnhLUgkXqDdhL:hFEd1G8YMcHNqNsn4GaM321m78bvAJLNtT4Il1kCuHaHmDGHEh'
		   var client_credentials =window.btoa(grant_type)
		   var consumer_key="g3nq2n2CUO66WnhLUgkXqDdhL" 
		   var  consumer_secret ="hFEd1G8YMcHNqNsn4GaM321m78bvAJLNtT4Il1kCuHaHmDGHEh"
			   	 $.ajax({
	    type : 'POST',
	    url:'https://api.twitter.com/oauth2/token',
	     headers: {
    "Authorization": "Basic " + window.btoa(consumer_key + ":" + consumer_secret),
    "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
    
  },
		data : {
		 "grant_type" : "client_credentials"	
		},  
	 success : function(data)
			    { 
				console.log(data);
			$.ajax({
	    type : 'GET',
	   url:'https://api.twitter.com/1.1/statuses/user_timeline.json',
     headers: {
   "Authorization": "Bearer  " + window.btoa(data.access_token),
 
 },
data : {

"count":"100",
"screen_name":"pandeymoni08"
},
  success : function(data)
   { console.log(data)
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		})	 
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});  
	 },
        function(error) {
            console.log('Error logging in');
            console.log(error);
        }
    );
    console.log("Twitter Method end");
	
	
	
	/* $.ajax({
	    type : 'GET',
	    url:'https://api.twitter.com/1.1/statuses/user_timeline.json',
		data : JSON.stringyfy({
		"consumer_key": 'g3nq2n2CUO66WnhLUgkXqDdhL',
          "consumer_secret": 'hFEd1G8YMcHNqNsn4GaM321m78bvAJLNtT4Il1kCuHaHmDGHEh',
	       "access_token": result.token,
          "access_token_secret": result.secret,
    "screen_name": result.userName,
       
    }),
	   success : function(data)
			    { 
				
				console.log(data);
			 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	
*/
	
	
	
}
