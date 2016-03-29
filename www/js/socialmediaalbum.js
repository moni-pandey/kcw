    $(document).ready(function() {
            
             
   //  alert('welcome');
	  
      $(document).bind("deviceready", function() {

	  
	  document.addEventListener('backbutton', function(e) {  console.log('backbuttonpressed');
       //  localStorage.fbLinked = true ;
		 //localStorage.bckbtn=true
		// parent.history.back();
	});
	
	  $(document).on('click' ,'.go-back',function(){
     localStorage.fbLinked = true ;
		 localStorage.bckbtn=true
		 parent.history.back();
 })
	var userid = localStorage.getItem('fbuserid');
    var albums;
     facebookConnectPlugin.api('/'+userid+'/albums?fields=picture,name,id,count', ["user_photos"], function(response){
      if (!response || response.error) {
        albums = response.error;
      } else {
        albums = response;
		console.log(' album');
		console.log(response);
		    //alert("response: " + JSON.stringify(response));
		       var newdata = JSON.stringify(response);
			   
				localStorage.setItem('newdata' ,newdata);
				var parsedata =JSON.parse(localStorage.getItem('newdata'));
	
		 if(parsedata.data.length%2==0)
		{ for(i=0;i < parsedata.data.length; i += 2)
		 {
		 
		  $('.container-fluid').append('<div class="row album-top-margin">\
				    <div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+parsedata.data[i].picture.data.url+'"  id="'+parsedata.data[i].id+'" class="img-responsive album-image">\
						<p class="album-name">'+parsedata.data[i].name+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+parsedata.data[i].count+'</p>\
					</div>\
					<div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+parsedata.data[i+1].picture.data.url+'" id="'+parsedata.data[i+1].id+'" class="img-responsive album-image">\
						<p class="album-name">'+parsedata.data[i+1].name+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png"> '+parsedata.data[i+1].count+'</p>\
					</div>\
				</div>');
		 
		 
		 } }
		 
		 else
		 {
		 
		 for(i=0;i < parsedata.data.length-1; i += 2)
		 {
		  
		  $('.container-fluid').append('<div class="row album-top-margin">\
				    <div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+parsedata.data[i].picture.data.url+'"  id="'+parsedata.data[i].id+'" class="img-responsive album-image">\
						<p class="album-name">'+parsedata.data[i].name+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+parsedata.data[i].count+'</p>\
					</div>\
					<div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+parsedata.data[i+1].picture.data.url+'" id="'+parsedata.data[i+1].id+'" class="img-responsive album-image">\
						<p class="album-name">'+parsedata.data[i+1].name+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png"> '+parsedata.data[i+1].count+'</p>\
					</div>\
				</div>');
		 
		 
		 }
		  $('.container-fluid').append('<div class="row album-top-margin">\
				    <div class="col-xs-6">\
					    <img src="./assets/img/Frame.png" class="img-responsive frame">\
						<img src="'+parsedata.data[parsedata.data.length-1].picture.data.url+'"  id="'+parsedata.data[parsedata.data.length-1].id+'" class="img-responsive album-image">\
						<p class="album-name">'+parsedata.data[parsedata.data.length-1].name+'</p>\
						<p class="album-pic-count"><img src="./assets/img/image-icon.png">'+parsedata.data[parsedata.data.length-1].count+'</p>\
					</div>\
					<div class="col-xs-6">\
				</div>\
				</div>');
		 
		 }
    }
}); 
        
      }); 
   
	$(document).on('click','.album-image' ,function(e){ 

    
	var album_id = e.target.id ;
	localStorage.setItem('albumid',' ');
	localStorage.setItem('albumid',album_id);
	window.location='album_Name.html';

  
});
});