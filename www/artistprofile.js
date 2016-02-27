$(window).load(function() {

//alert("window loaded!");
     /***** loading images for crousel*******/
	alert(localStorage.getItem('loggedINuserartistid')	)				
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
			    setCrousel();  
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 


});


$("document").ready(function() {
// alert("doc ready!");
var location_fetched  = ' ' ;

$(document).bind("deviceready", function() {
			document.addEventListener("backbutton", function() {
						console.log("Disabled Back button");
			});
			});

 currentindex= -1;
 targetindex=0
$('.name-of-artist').text(localStorage.getItem('loggedINusername'));


		
	

     
	        
                    

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
						alert(xhr.status);
						alert(xhr.responseText);
						}
										  
						});} else showAlert("Please Connect to Internet to Login");


					 }); //end fundbtn         


		  
	
	    	/*******for changing  art name n type on image change************/
					
	$(document).on('slide.bs.carousel','#myCarousel',function(e){
//alert("wslide!");
    var slideFrom = $(this).find('.active').index();
    var slideTo = $(e.relatedTarget).index();
	
		 var id = $(e.relatedTarget).id;
	console.log(id);
	if(id=='myVideo')
	localStorage.setItem('yo','true')
    else 
	localStorage.setItem('yo','false')
 var parsedata =JSON.parse(localStorage.getItem('cdata'));
  if(slideFrom=='0')
     { 
	  //localStorage.setItem('crouselartid' ,parsedata.art[currentindex-2].artID)
	  localStorage.setItem('crouselartid' ,parsedata.art[currentindex].artID);
	   $('.type-of-art').text(parsedata.art[currentindex].artType);
	  $('.name-of-art').text(parsedata.art[currentindex].caption);
	  	console.log('slidefrom==0')
	  console.log(localStorage.getItem('crouselartid' ));
	
	
	}
	  if(slideTo=='0')
     {  console.log('calling setCrouel');
	//s//etTimeout(setCrousel, 000);;
	  $('#myCarousel ol').html("");
      $('#crouselItems').html(" ");
	  localStorage.setItem('crouselartid' ,parsedata.art[currentindex].artID);
	 
   $('.type-of-art').text(parsedata.art[currentindex].artType);
	  $('.name-of-art').text(parsedata.art[currentindex].caption);
//	 localStorage.setItem('crouselartid' ,parsedata.art[currentindex-2].artID)
	  	console.log('slideTo==0')
	  console.log(localStorage.getItem('crouselartid' ));
	setCrousel();
	
	}
     if(slideFrom=='1')
         { 
		 localStorage.setItem('crouselartid' ,parsedata.art[currentindex-2].artID)
		 console.log('slidefrom==1');
		 console.log(currentindex);
		    $('.type-of-art').text(parsedata.art[currentindex-2].artType);
	  $('.name-of-art').text(parsedata.art[currentindex-2].caption);
		 console.log(localStorage.getItem('crouselartid' ));
		 
		 }
	
	if(slideFrom=='2')
	{
	
	localStorage.setItem('crouselartid' ,parsedata.art[currentindex-1].artID);
	console.log('slidefrom==2');
	   $('.type-of-art').text(parsedata.art[currentindex-1].artType);
	  $('.name-of-art').text(parsedata.art[currentindex-1].caption);
	console.log(localStorage.getItem('crouselartid' ));
	}
	var intin = parseInt(slideTo);

	
	if(intin!=0)
	{
	
	 $('.type-of-art').text(parsedata.art[intin].artType);
	  $('.name-of-art').text(parsedata.art[intin].caption);
	
	}

	  
	
	
});
			

	
		
	
	$('#pausenext').bind('click',function()
{           //console.log('next');
		if(localStorage.getItem('yo')=='true')
			  {
			  $('#myVideo video')[0].pause();}
			
		localStorage.setItem('yo','false');
});
	$('#pauseprev').bind('click',function()
{
		if(localStorage.getItem('yo')=='true')
			  {
			  $('#myVideo video')[0].pause();
			  }
			
		localStorage.setItem('yo','false');
});
	
	
	
/************* display art comment*****************/
$('.comment-img').bind('click' ,function() {
localStorage.setItem('fromArtistPage','true');
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
           showAlert("Uploaded Successfully");
		   //alert('Uploaded Successfully');
            console.log(progVal + '%');
			
			initiate_geolocation();
			//$('div.upload input').css({"visibility":'hidden'});
			//$('div.upload input').css({"display":'none'});
        }



    });
	
/* */	
	
$(document).on('click' , '#fb_pic' ,function(){
console.log('fb_pic');
window.location='facebook_Gallery.html'

});

$(document).on('click' , '.instagram_pic' ,function(){

window.location='instagram.html';

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
	  
      },
      error: function(xhr, status, error) {
  //var err = eval("(" + xhr.responseText + ")");
  showAlert(xhr.status);
  alert(xhr.status);
  console.log(xhr);
}
    });
	//} else showAlert("Please Connect to Internet to Login");



}
//get lat and longitutde

 function initiate_geolocation() {
            navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
        }
 
   function handle_errors(error)
        {
            switch(error.code)
            {
                case error.PERMISSION_DENIED: alert("user did not share geolocation data");
                break;
 
                case error.POSITION_UNAVAILABLE: alert("could not detect current position");
                break;
 
                case error.TIMEOUT: alert("retrieving position timed out");
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


function setCrousel()
{
var active=0;
var j =0;
$('#myCarousel ol').html("");
$('#crouselItems').html(" ");
//alert('setcrousel');
//alert(JSON.parse(localStorage.getItem('cdata')));
var parsedata =JSON.parse(localStorage.getItem('cdata'));
			//alert('parsedata');
			//alert(parsedata);
				console.log(parsedata);


//alert(parsedata.art.length);
	 targetindex = currentindex+3;
	//console.log(currentindex);
	//console.log(targetindex);
	if(parsedata.art.length=='0')
		 exit;
	   
	var lastindex = parsedata.art.length ;

	localStorage.setItem('crouselartid' ,parsedata.art[0].artID)
		//alert(lastindex);
	if(currentindex <=lastindex)
	  {
	       console.log('if 230');
	       if(targetindex <= lastindex)
			  {
			  console.log('233targetindex<lastindex');
							
					$(parsedata.art).each(function(i,val){
					//console.log('236each');
						 if(j!=3 && i >currentindex )
							{     console.log('j');
							
							//console.log(j);
							  if(i<=targetindex)
					         	  {  //console.log(i);
								  var uri_dec = decodeURIComponent(val.url);
								  console.log(uri_dec)

										//console.log(uri_dec);
					                  if(i=="0")
				                      { 
				                       //console.log('i==0');
				                          if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+val.artID+'"></li>');
										       $('#crouselItems').append('<div class="item active" width="300px" id="myVideo">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  $('.type-of-art').text(val.artType);
											  $('.name-of-art').text(val.caption);
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" id="'+val.artID+'" class="active"></li>');
										$('#crouselItems').append('<div class="item active">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
											  $('.type-of-art').text(val.artType);
											  $('.name-of-art').text(val.caption);
                                        }
	 
	                                    }
										 else 
										{
									//	console.log('i==0else');
                                         if(i==targetindex-2)
										 
										 {
										 
										 
										  if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel"data-slide-to="'+j+'"  id="'+val.artID+'" class="active"></li>');
										       $('#crouselItems').append('<div class="item active" id="myVideo" width="300px" >\
												<video width="100%" height="200px"  controls >\
                                        <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  $('.type-of-art').text(val.artType);
											  $('.name-of-art').text(val.caption);
										  
										  }
										 else
										 {
										 $('#myCarousel ol').append('<li data-target="#myCarousel"data-slide-to="'+j+'" id="'+val.artID+'" class="active"></li>');
										 $('#crouselItems').append('<div class="item active">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
											  $('.type-of-art').text(val.artType);
											  $('.name-of-art').text(val.caption);
										 
										 }
										 
										 
										 }
										 
										 //i==targetindex-2
										 else
										 {
										
                                         if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel"data-slide-to='+j+' id="'+val.artID+'"></li>');
										       $('#crouselItems').append('<div class="item " id="myVideo" width="300px">\
												<video width="100%" height="200px" controls  >\
                                        <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  $('.type-of-art').text(val.artType);
											  $('.name-of-art').text(val.caption);
										  
										  }
										 
										 else{
										$('#myCarousel ol').append('<li data-target="#myCarousel"data-slide-to="'+j+'"></li>');
										$('#crouselItems').append('<div class="item">\
												<img src="'+uri_dec+'" alt="Chania" style="height:200px">\
										  </div>');
										      $('.type-of-art').text(val.artType);
											  $('.name-of-art').text(val.caption);
										  
}
}
										}

                                       currentindex ++
 
                                    }
									
									else 
									{
									//console.log('true');
									return true ;

									}
									j++;
									}
else if (targetindex>lastindex )

{
//console.log('(targetindex>lastindex )');
currentindex=-1
targetindex=0
//setcrousel();


}

else 
{
//console.log('returning true');
return ;

}



});//each 
}
else 
{
console.log('(targetindex>lastindex 351)');
currentindex=-1
targetindex=0
setCrousel();
}
}
$('.carousel').carousel({
     interval :false,
   pause: 'true'
 
});

}

