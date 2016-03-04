$("document").ready(function() {
	ACCESS_TOKEN =''
	videoplaylistid= new Array()
	playlistid =''
	devkey = 'AIzaSyA2JIFOgNwJSHRHKggrNDI5judZ-d_mooY'
	prokey ='AIzaSyCQA1c7IStW4PmK-DvY2KwKxZeMDv_65Yw'
	useremail=''
	//alert('ready')
	//$('video, audio').mediaelementplayer();
	  document.addEventListener('backbutton', function(e) {  console.log('backbuttonpressed');
         localStorage.youLinked = true ;
		 localStorage.bckbtn=true
		 parent.history.back();
	}, false);
document.addEventListener('deviceready', function()
{  window.plugins.googleplus.login({
			'offline': true,
			'scopes':"https://www.googleapis.com/auth/youtubepartner-channel-audit"
       }, gpLoginSuccess,
            function(gpLoginError) {
                showAlert('gpLoginError: ' + gpLoginError);
            });
}, true)
	   
			
	$(document).on('click' ,'.album-pic' ,function(e){
		var channelid = e.target.id
		
	})		
   
});
var gpLoginSuccess = function(gpUserData) {
    //Success Method of Google Login
  //alert(JSON.stringify(gpUserData));
	 ACCESS_TOKEN =gpUserData.oauthToken
	 useremail =gpUserData.email
   /* if(localStorage.getItem('youtubeclicked')=='true')	 
	{		
      localStorage.setItem('youtubeclicked' ,'false')*/
	  getChannelID()
	/*}
	else
	{
		
		
		//getGoogleAlbum()
	}
		*/
};  

function getChannelID() {
	  $.ajax({
	    type : 'GET',
	    url: 'https://www.googleapis.com/youtube/v3/channels',
		contentType: "application/json",
	    dataType: "json",
		data : {
		"part" : 'contentDetails',
         "mine" : 'true',
	    "access_token":ACCESS_TOKEN
},
	   success : function(data)
			    { 
				
				console.log(data);
				for(var k=0 ;k< data.items.length ;k++)
				{ playlistid  =   data.items[k].contentDetails.relatedPlaylists.uploads
			      console.log(playlistid)
				  videoplaylistid.push(playlistid);
				  retriveVideos();
			    }
			 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	
	
}



function retriveVideos() {
	
		  $.ajax({
	    type : 'GET',
	    url: 'https://www.googleapis.com/youtube/v3/playlistItems',
		contentType: "application/json",
	    dataType: "json",
		data : {
		"part":"snippet",
         "maxResults":10,
         "playlistId":playlistid,
         "key": prokey,
	    
},
	   success : function(data)
			    { 
				
				    var videothumbnail = JSON.stringify(data);
			   console.log(videothumbnail)
				localStorage.setItem('videothumbnail' ,videothumbnail);
				var parsedata =JSON.parse(localStorage.getItem('videothumbnail'));
	

		 for(var k=0;k < parsedata.items.length; k++)
		 {$('.container-fluids').append('<div class="row" width="300px" style="border: 1px solid white;margin-bottom:5px" >\
	                                    <div class="col-xs-12 ">\
									 			<video preload="auto" width="100%" height="200px" preload="auto" id="'+parsedata.items[k].snippet.resourceId.videoId+'"  controls="controls"  poster="'+parsedata.items[k].snippet.thumbnails.medium.url+'">\
                                                <source type="video/youtube" src="https://www.youtube.com/watch?v='+parsedata.items[k].snippet.resourceId.videoId+'" >\
                                                    </video> </div>')	;
			
                  var selector= '#'+parsedata.items[k].snippet.resourceId.videoId
                $(selector).mediaelementplayer();			
		 }	
	
	} ,
	
	error: function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});
	
	
	
}
