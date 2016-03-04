
	 $(document).ready(function(){
	 userid = ''
	 userId = ''
	 albumid = ''
	 at=''
	 document.addEventListener('deviceready', function() {
	 
	 if(localStorage.access_tokeng)
		    loadalbum();
		else
		{
			
		 if (checkConnection()) {
	     alert('calling goog')
        window.plugins.googleplus.login({
			'offline': true,
		'scopes': 'https://picasaweb.google.com/data/  '

			
            }, gpLoginSuccess,
            function(gpLoginError) {
                showAlert('gpLoginError: ' + gpLoginError);
            });
    } else showAlert("Please Connect to Internet to Login");	
			
			
			
		}
	
	 });
	 	document.addEventListener('backbutton', function(e) {  console.log('backbuttonpressed');
         localStorage.googleLinked = true ;
		 localStorage.bckbtn=true
		 parent.history.back();
	}, false); 
	
	
			//connectg()
	 $(document).on('click' ,'.album-image' ,function(e){
	  albumid= e.target.id;
	  localStorage.picalbumid=e.target.id;
	  localStorage.fromgoogle=true
	  window.location="album_Name.html"

	 
	 
	 
	 });
	 });
	 
var gpLoginSuccess = function(gpUserData) {
    //Success Method of Google Login
 
	alert(JSON.stringify(gpUserData));
	userid = gpUserData.email 
	//at=gpUserData.oauthToken;
	localStorage.usergpmail=gpUserData.email 
	localStorage.access_tokeng = gpUserData.oauthToken
 loadalbum();
	
   
};
function loadalbum()
{
	
	
	
	  $.ajax({
	    type : 'GET',
	    url: 'https://picasaweb.google.com/data/feed/api/user/'+localStorage.usergpmail ,
		
		data : {
		'alt':'json',
		"access_token":localStorage.access_tokeng,
		"access":'all'
},
	   success : function(data)
			    { 
				//returns all the album 
				
				console.log(data);
				localStorage.setItem('googleAlbum', JSON.stringify(data.feed))
				console.log(localStorage.getItem('googleAlbum'));
			//	Window.location='google_gallery.html'
			if(data.feed.entry.length!=0) {
			
		 if(data.feed.entry.length%2==0)
		{ 
		userId=data.feed.entry[0].gphoto$user.$t
		localStorage.picuserId=data.feed.entry[0].gphoto$user.$t
		for(var i=0;i < data.feed.entry.length; i += 2)
		 {
		        var name= jQuery.trim(data.feed.entry[i].gphoto$name.$t).substring(0, 7)
                          .trim(this) + "...";
						  var name1=     jQuery.trim(data.feed.entry[i+1].gphoto$name.$t).substring(0, 7)
                          .trim(this) + "...";

		     //var name= data.feed.entry[i].gphoto$name.$t.replace(/^(.{8}[^\s]*).*/, "$1");
		// var name1 =data.feed.entry[i+1].gphoto$name.$t.replace(/^(.{8}[^\s]*).*/, "$1");
		  $('.container-fluid').append('<div class="row album-top-margin">\
				    <div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+data.feed.entry[i].media$group.media$thumbnail[0].url+'"  id="'+data.feed.entry[i].gphoto$id.$t+'" class="img-responsive album-image">\
						<p class="album-name" value='+data.feed.entry[i].gphoto$name.$t+'>'+name+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+data.feed.entry[i].gphoto$numphotos.$t+'</p>\
					</div>\
					<div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+data.feed.entry[i+1].media$group.media$thumbnail[0].url+'"  id="'+data.feed.entry[i+1].gphoto$id.$t+'" class="img-responsive album-image">\
						<p class="album-name" value='+data.feed.entry[i+1].gphoto$name.$t+'>'+name1+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+data.feed.entry[i+1].gphoto$numphotos.$t+'</p>\
					</div>\
				</div>');
		 
		 
		 } }
		 
		 else
		 {
		 userId=data.feed.entry[0].gphoto$user.$t
		 localStorage.picuserId=data.feed.entry[0].gphoto$user.$t
		 console.log(userId)
		 for(i=0;i < data.feed.entry.length-1; i += 2)
		 {         var name=     jQuery.trim(data.feed.entry[i].gphoto$name.$t).substring(0, 7)
                          .trim(this) + "...";
						  var name1=     jQuery.trim(data.feed.entry[i+1].gphoto$name.$t).substring(0, 7)
                          .trim(this) + "...";
		    //modalTitle.replace(/^(.{8}[^\s]*).*/, "$1");
		  
		  $('.container-fluid').append('<div class="row album-top-margin">\
				    <div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+data.feed.entry[i].media$group.media$thumbnail[0].url+'"  id="'+data.feed.entry[i].gphoto$id.$t+'" class="img-responsive album-image">\
						<p class="album-name" value='+data.feed.entry[i].gphoto$name.$t+'>'+name+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+data.feed.entry[i].gphoto$numphotos.$t+'</p>\
					</div>\
					<div class="col-xs-6">\
					     <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+data.feed.entry[i+1].media$group.media$thumbnail[0].url+'"  id="'+data.feed.entry[i+1].gphoto$id.$t+'" class="img-responsive album-image">\
						<p class="album-name" value='+data.feed.entry[i+1].gphoto$name.$t+'>'+name1+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+data.feed.entry[i+1].gphoto$numphotos.$t+'</p>\
					</div>\
				</div>');
		 
		 
		 }
		            var lastname= jQuery.trim(data.feed.entry[data.feed.entry.length-1].gphoto$name.$t).substring(0, 7)
                          .trim(this) + "...";
		  //var lastname =data.feed.entry[data.feed.entry.length-1].gphoto$name.$t.replace(/^(.{8}[^\s]*).*/, "$1");
		  $('.container-fluid').append('<div class="row album-top-margin">\
				    <div class="col-xs-6">\
					      <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+data.feed.entry[data.feed.entry.length-1].media$group.media$thumbnail[0].url+'"  id="'+data.feed.entry[data.feed.entry.length-1].gphoto$id.$t+'" class="img-responsive album-image">\
						<p class="album-name" value='+data.feed.entry[data.feed.entry.length-1].gphoto$name.$t+'>'+lastname+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+data.feed.entry[data.feed.entry.length-1].gphoto$numphotos.$t+'</p>\
										</div>\
					<div class="col-xs-6">\
				</div>\
				</div>');
		 
		 }
		 }else
		 showAlert("No Album found");
			 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	
	
}


function connectg()
{
	
	
	
}