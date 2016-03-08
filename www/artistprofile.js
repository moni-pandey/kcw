$("document").ready(function() {
// alert("doc ready!");
location_fetched  = ' ' ;
 ajaxflag = true 
 newindex = 0;
 ACCESS_TOKEN=''
 userid=''
 firsttime=true;
$(document).bind("deviceready", function() {
			document.addEventListener("backbutton", function() {
						console.log("Disabled Back button");
			});
			});

$('.name-of-artist').text(localStorage.getItem('loggedINusername'));
     
	   callforcarouselimages();
   
	 	
	    if(localStorage.googleLinked)
		{
			   $('.googl_pic').attr('src' ,'./assets/img/Red_google_plus.png')
			localStorage.googleLinked =false
			}
     
	     if(localStorage.fbLinked)
		 {
          $('#fb_pic').attr('src' ,'./assets/img/Facebook_circle.png')
     
		localStorage.fbLinked =false }  
	     if(localStorage.youLinked)
		 {
           $('.youtube_pic').attr('src' ,'./assets/img/Youtube.png')
         localStorage.youLinked=false       
		 }      
		 if(localStorage.instaLinked)
		 {
	     $('.instagram_pic').attr('src' ,'./assets/img/Instagram.png')
	  localStorage.instaLinked=false }
	  
	  
	  
                
                    

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
    // var left = $('#myCarousel').find('.item.active.left');
    // var right = $('#myCarousel').find('.item.active.right');
	var parsedata =JSON.parse(localStorage.getItem('cdata'));
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
		if(newindex>lastindex)
		{ newindex =0
	      console.log('images over ')
		  firsttime=true
	      SetCrousel();
	    }
	     else	 {  console.log('images left')
		 $('.type-of-art-ccount').text(parsedata.art[newindex].commentcount);
        $('.type-of-art-lcount').text(parsedata.art[newindex].likecount);
	    $('.type-of-art').text(parsedata.art[newindex].artType);
	       $('.name-of-art').text(parsedata.art[newindex].caption);
			 SetCrousel();
		 }
	}
	
	
});
			

	
		
	

	
/************* display art comment*****************/
$(document).on('click','.comment-img' ,function() {
localStorage.setItem('fromArtistPage','true');
  var imagid =$('.carousel-inner .active').attr('id')
  //alert(imagid);
  localStorage.setItem('crouselartid' ,imagid)
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
$(this).attr('src' ,'./assets/img/Facebook_circle.png')
getfbuserid();
//getsocialmedia()

});	

$(document).on('click' , '.twitter_pic' ,function(e){
console.log('fb_pic');
$(this).attr('src' ,'./assets/img/Twitter_circle.png')
//getfbuserid();
//gettwitter()

});
$(document).on('click' , '.youtube_pic' ,function(){
console.log('you_pic');

$(this).attr('src' ,'./assets/img/Youtube.png')
//localStorage.setItem('youtubeclicked' ,'true')
window.location='youtube.html'

});

$(document).on('click' , '.instagram_pic' ,function(){
linkInstagram()
//$(this).attr('src' ,'./assets/img/Instagram.png')


});
$(document).on('click' , '.googl_pic' ,function(){
$(this).attr('src' ,'./assets/img/Red_google_plus.png')
//getUserid()
//localStorage.refreshgoogletoken=false
localStorage.gpfrstime=true;
window.location='google_gallery.html'

});



     });                             /**document.ready ends **/


function importart()
{
//alert('initiate_geolocation();')
//initiate_geolocation();

   var encoded = encodeURIComponent(localStorage.getItem('uploadedimageurl'));

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
      

	  //alert(data);
         console.log(data);
	    showAlert("Uploaded Successfully");
	    //ajaxflag=true
		newindex=0
		console.log('calling for carousel ')
		callforcarouselimages();
	  
      },
      error: function(xhr, status, error) {
  //var err = eval("(" + xhr.responseText + ")");
  showAlert(xhr.status);
 // alert(xhr.status);
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


function SetCrousel()
{
	

var j =0;
$('#myCarousel ol').html("");
$('#crouselItems').html(" ");

var parsedata =JSON.parse(localStorage.getItem('cdata'));
console.log(parsedata);

	if(parsedata.art.length=='0')
		 return;
	   
	var lastindex = parsedata.art.length 
	if(firsttime)
	{
	$('.type-of-art-ccount').text(parsedata.art[0].commentcount);
	$('.type-of-art-lcount').text(parsedata.art[0].likecount);
	$('.type-of-art').text(parsedata.art[0].artType);
    $('.name-of-art').text(parsedata.art[0].caption);
	
	firsttime= false
	}
	var target = newindex+3 ;
       /*******************************************/
	   if(newindex < lastindex) 
		   
		   {	
		   
		   
		   for(var k=newindex ; k < target ;k++)
	{    console.log(target)
	    console.log(k)
		var uri_dec = decodeURIComponent(parsedata.art[k].url)
		if(uri_dec!="null")
		{}
	else
	{	console.log('null')
uri_dec='./assets/img/no_img.jpg'
   }
    if(lastindex%3 == 2)
	
    {  if(lastindex==2)
		{
			if(uri_dec.indexOf('video')> -1)
										  {
										     if(parsedata.art[k+1].url!=='null')
											 {
												var b = parsedata.art[k+1].url!=='null'
											 }
											 else 
											 {
												 var b = './assets/img/no_img.jpg'
												 
											 }
											  if(parsedata.art[0].url!=='null')
											 {
												var bk = parsedata.art[0].url!=='null'
											 }
											 else 
											 {
												 var bk = './assets/img/no_img.jpg'
												 
											 }
												 
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>\
											<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   <div class="item" id="'+parsedata.art[k+1].artID+'" data-caption="'+parsedata.art[k+1].caption+'" data-art="'+parsedata.art[k+1].artType+'" data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'" >\
												<img src="'+b+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'" data-caption="'+parsedata.art[0].caption+'" data-art="'+parsedata.art[0].artType+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'" >\
												<img src="'+bk+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											  // $('.like-amt').html(' ')
											 // $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											    <div class="item" id="'+parsedata.art[k+1].artID+'" data-caption="'+parsedata.art[k+1].caption+'" data-art="'+parsedata.art[k+1].artType+'" data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[k+1].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'" data-caption="'+parsedata.art[0].caption+'" data-art="'+parsedata.art[0].artType+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[0].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											 //  $('.like-amt').html(' ')
											//  $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }	
							 newindex=0
							  firsttime=true
		   return;
			
			
		}
		
		if(k==lastindex-1)
		  return;
                     
                     						 
					 if(k==lastindex-2)	
						{
						if(uri_dec.indexOf('video')> -1)
										  {
										     if(parsedata.art[k+1].url!=='null')
											 {
												var b = parsedata.art[k+1].url!=='null'
											 }
											 else 
											 {
												 var b = './assets/img/no_img.jpg'
												 
											 }
											  if(parsedata.art[0].url!=='null')
											 {
												var bk = parsedata.art[0].url!=='null'
											 }
											 else 
											 {
												 var bk = './assets/img/no_img.jpg'
												 
											 }
												 
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>\
											<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   <div class="item" id="'+parsedata.art[k+1].artID+'" data-caption="'+parsedata.art[k+1].caption+'" data-art="'+parsedata.art[k+1].artType+'" data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'" >\
												<img src="'+b+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'"  data-caption="'+parsedata.art[0].caption+'" data-art="'+parsedata.art[0].artType+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'" >\
												<img src="'+bk+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											  // $('.like-amt').html(' ')
											  //$('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											    <div class="item" id="'+parsedata.art[k+1].artID+'" data-caption="'+parsedata.art[k+1].caption+'" data-art="'+parsedata.art[k+1].artType+'" data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[k+1].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'" data-caption="'+parsedata.art[0].caption+'" data-art="'+parsedata.art[0].artType+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[0].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											 //  $('.like-amt').html(' ')
//$('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }	
							
						newindex=0
						 firsttime=true
					  setTimeout(callforcarouselimages, 20000);
						}							

else{
						  if(k==(target-3))
						   {  console.log('k==0')
						    console.log(parsedata.art[k].commentcount)
						   if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  // $('.like-amt').html(' ')
											  //$('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											 // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px" >\
											   </div>');
											  // $('.like-amt').html(' ')
											 // $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }
						   }
						   else {
							   
							   
							    if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class=""  id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item " width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  //$('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item " id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
											 // $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											  //console.log(parsedata.art[k].commentcount)
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
                                        }
							   
	}}
						   
						   j++;
										
		
   
			
		
		
}

else if(lastindex%3==1)
{
	
	   if(lastindex==1)
	   {
		   if(uri_dec.indexOf('video')> -1)
										  {
										  
											 
												 
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>\
										\
											');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   \
											   ');
											  // $('.like-amt').html(' ')
											 // $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											   \
											   ');
											 
											  //$('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											;
                                        }	
							
		   newindex=0
		    firsttime=true
		   return;
		   
		   
	   }
	
					 if(k==lastindex-1)	
						{
							 if(parsedata.art[0].url!=='null')
											 {
												var b0 = parsedata.art[0].url!=='null'
											 }
											 else 
											 {
												 var b0= './assets/img/no_img.jpg'
												 
											 }
											  if(parsedata.art[1].url!=='null')
											 {
												var b1 = parsedata.art[1].url!=='null'
											 }
											 else 
											 {
												 var b1 = './assets/img/no_img.jpg'
												 
											 }
							
						if(uri_dec.indexOf('video')> -1)
										  {
										  
											 
												 
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>\
											<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'" data-caption="'+parsedata.art[0].caption+'" data-art="'+parsedata.art[0].artType+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'" >\
												<img src="'+b0+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'" data-caption="'+parsedata.art[1].caption+'" data-art="'+parsedata.art[1].artType+'" data-comment="'+parsedata.art[1].commentcount+'" data-likecount="'+parsedata.art[1].likecount+'" >\
												<img src="'+b1+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											  // $('.like-amt').html(' ')
											  //$('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											    <div class="item" id="'+parsedata.art[0].artID+'" data-caption="'+parsedata.art[0].caption+'" data-art="'+parsedata.art[0].artType+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'">\
												<img src="'+b0+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[1].artID+'" data-caption="'+parsedata.art[1].caption+'" data-art="'+parsedata.art[1].artType+'" data-comment="'+parsedata.art[1].commentcount+'" data-likecount="'+parsedata.art[1].likecount+'">\
												<img src="'+b1+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											 //  $('.like-amt').html(' ')
											  //$('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }	
							
						newindex=0
						 firsttime=true
					   setTimeout(callforcarouselimages, 20000);
						}							

else{
						  if(k==(target-3))
						   {  console.log('k==0')
						    console.log(parsedata.art[k].commentcount)
						   if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  // $('.like-amt').html(' ')
											 // $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											 // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'"data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px" >\
											   </div>');
											  // $('.like-amt').html(' ')
											  //$('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }
						   }
						   else {
							   
							   
							    if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class=""  id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item " width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											 // $('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item " id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
											 // $('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											  console.log(parsedata.art[k].commentcount)
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
                                        }
							   
	}}
						   
						   j++;
										
		
   
		
	
	
}
else{
	
	 if(k==target-3)
	 	   {  console.log('k==0')
						    console.log(parsedata.art[k].commentcount)
						   if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  // $('.like-amt').html(' ')
											 // $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											 // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
										  
                                        else {
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'"  data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px" >\
											   </div>');
											  // $('.like-amt').html(' ')
											 // $('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }
						   }
						   else {
							   
							   
							    if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class=""  id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item " width="300px" id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											 // $('.type-of-art').text(parsedata.art[k].artType);
											 // $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item " id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
//$('.type-of-art').text(parsedata.art[k].artType);
											  //$('.name-of-art').text(parsedata.art[k].caption);
											  //console.log(parsedata.art[k].commentcount)
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
                                        }
							   
}
						   
						   j++;
										
		
   
		
	
	
	
	
}

}
	
	
	
			
			newindex=k
			console.log(newindex)
			/**********************************************************/
		//localStorage.setItem('crouselartid' ,parsedata.art[0].artID)
				//alert(lastindex);
			
		$('.carousel').carousel({
			 interval :false,
		   pause: 'true'
		 
		});
}
else 
{
	newindex=0
	 firsttime=true
  setTimeout(callforcarouselimages, 20000);
}

}


function callforcarouselimages()
{
if(localStorage.bckbtn)
	{newindex=0
firsttime=true
localStorage.bckbtn=false;
}
	
	
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
				
			    var cdat = JSON.stringify(data);
				console.log(cdat);
				localStorage.setItem('cdata','');
				//alert(localStorage.getItem('cdata'));
				localStorage.setItem('cdata' ,cdat);
				//alert("images are loaded!");
			   // setCrousel();  
			   console.log('calling set')
			    ajaxflag =false
			    SetCrousel();  
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 

		  
		  
	  
	
	
}


function gplogin() {
    if (checkConnection()) {
        window.plugins.googleplus.login({
			'offline': true,
			
			
            }, gpLoginSuccess,
            function(gpLoginError) {
                showAlert('gpLoginError: ' + gpLoginError);
            });
    } else showAlert("Please Connect to Internet to Login");
}







var gpLoginSuccess = function(gpUserData) {
    //Success Method of Google Login
    localStorage.setItem('googlelogindata', JSON.stringify(gpUserData));
	  
	alert(JSON.stringify(gpUserData));
	ACCESS_TOKEN=gpUserData.oauthToken
	callyoutubechannel()
   
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
           //showAlert("fbPermissions: " + JSON.stringify(fbPermissions));
         // window.location='facebook_Gallery.html'
		 localStorage.id=fbPermissions.id
			localStorage.ftoken=fbPermissions.accessToken
			localStorage.fbaccesstoken=fbPermissions.accessToken
			localStorage.email=fbPermissions.email
			window.location='facebook_Gallery.html'
	//	ADDSocialm()	
			
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
        else showAlert("You have already Linked Instagram");
    } else showAlert("Please Connect to Internet to Login");
    instaWindow.addEventListener('loadstart', function(event) {
        if ((event.url).indexOf(redirect_uri) === 0) {
             var instagramAccessToken = (event.url).split('#access_token=')[1] || '';
            if (instagramAccessToken !== null)
                localStorage.setItem('instagramtoken', instagramAccessToken);
				 getinstausername() 
				//window.location='instagram.html';
			}
            else
                showAlert("Couldn't Authenticate your Instagram account");
            instaWindow.close();
});}

   function linkInstagram() {
    // Method to Link Instagram account to KCW
    var instagramClientId = "2449c6ccef5e4d75ad8e5a0118797058";
    var redirect_uri = "http://localhost/callback/";
    if (checkConnection()) {
        if (localStorage.getItem('instagramtoken') == null)
            var instaWindow = openBrowser("https://api.instagram.com/oauth/authorize/?client_id=" + instagramClientId + "&redirect_uri=" + redirect_uri + "&response_type=token");
        else {showAlert("You have already Linked Instagram")
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
			 window.location='instagram.html'
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 
	
	
	
}


function ADDSocialm()
{
	
	var userdata =JSON.parse(localStorage.getItem('loggeduser'))
	var b = 	{"artistid":userdata.user.artistID,
		"token":localStorage.fbaccesstoken,
		"email":localStorage.email,
		"smacctid":localStorage.id,
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
		"token":localStorage.fbaccesstoken,
		"email":localStorage.email,
		"smacctid":localStorage.id,
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
	    url: localStorage.getItem('webserviceurl')+'artist/add/socialmedia',
		
		data : {
		"artistid":userdata.user.artistID,
		"type":'F'
		

},
	   success : function(data)
			    { 
				
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
	
        },
        function(error) {
            console.log('Error logging in');
            console.log(error);
        }
    );
    console.log("Twitter Method end");
	
	
	
	 $.ajax({
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
	

	
	
	
}
