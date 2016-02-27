
					  
$("document").ready(function() {

 Lcounter=10;
 Ccounter =14
	      $(document).bind("deviceready", function() {

			});


  /***** loading images for crousel*******/


 
if(localStorage.getItem('fromGetArtist')=='true')
{
//alert('inside');
//localStorage.setItem('fromGetArtist','false');
console.log(localStorage.getItem('fromartistname'));
console.log(localStorage.getItem('fromarttype'));
$('.name-of-artist').text(localStorage.getItem('fromartistname'));
//alert(localStorage.getItem('fromGetArtistID'))
//alert(localStorage.getItem('crouseldata'));
//$('.artist_info').html(""+localStorage.getItem('fromarttype')+" <span class='artist-fund-amt'>$0</span> in Funds Seattle</p>");

$.ajax({
	    type : 'GET',
	    url: "http://107.170.201.114:5001/artist/profile",
		contentType: "application/json",
	    dataType: "json",
		data : {
		"artistID" :localStorage.getItem('fromGetArtistID'),
},
	   success : function(data)
			    { 
			    
			    
			var crouseldat = JSON.stringify(data);
			//alert(JSON.stringify(data))
			  localStorage.setItem('crouseldata' ,' ');
			 // alert(localStorage.getItem('crouseldata'));
			 localStorage.setItem('crouseldata' ,crouseldat);
			   setCrousel(); 
		
			//alert(localStorage.getItem('crouseldata'));
			 
				} ,
					
					error   : function (xhr, status, error)
					{console.log(xhr);}						 
						
						
});	}
else
{
console.log(localStorage.getItem('fromartistname'));

$('#patronname').text(localStorage.getItem('fromartistname'));
$.ajax({
	    type : 'GET',
	    url: "http://107.170.201.114:5001/artist/profile",
		contentType: "application/json",
	    dataType: "json",
		data : {
		"artistID" :localStorage.getItem('loggedINuserartistid'),
},
	   success : function(data)
			    { 
			
				var crouseldat = JSON.stringify(data);
localStorage.setItem('crouseldata' ,' ');		
	    localStorage.setItem('crouseldata' ,crouseldat);
		  setCrousel(); 
					} ,
					
					error   : function (xhr, status, error)
					{console.log(xhr);}						 
						
						
						});//end of ajax call 
						}
	  
		if(localStorage.getItem('changenextpageBTN')=='true')
		 {  
		  // alert('if(localStorage.getItem(');
		$('#followbtn').html('Unfollow');
		$('#followbtn').removeClass('follow');
		$('#followbtn').addClass('unfollow');
		localStorage.setItem('fromGetArtist','false')
		
		}
	 currentindex= -1;
    
	  // comment on art 
	  
	  $('#ppfundme').bind('click' ,function(){
	  
	  window.location='fundArtist_Patron.html';
	  
	  });
	  $('#commentOnart').bind('click' ,function(){
          $("#myCarousel").carousel('pause');
		  localStorage.setItem('fromArtistPage','false');
	window.location='comment_Page_new.html'
	

});	
  
 $(document).on('click','.fav-img' ,function(){
	  console.log('like');
	  console.log(localStorage.getItem('crouselartid'));
	  
	   $.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/art/like",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : localStorage.getItem('loggedINuserpatronid'),
        "artID"  :localStorage.getItem('crouselartid'),
    
         }),
	     success : function(data)
			    {
				if(data.message!='alreadyliked')
				      {Lcounter++}
					  $('#likecounter').html(Lcounter);
				// alert(data.message);
				 $('#likecount').toggleClass('notfav-img');
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});
      
  
		

});


 $(document).on('click','.notfav-img' ,function(){
	  
	   console.log('ulike');
	//  console.log(localStorage.getItem('crouselartid'));
	   $.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/art/unlike",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : localStorage.getItem('loggedINuserpatronid'),
        "artID"  :localStorage.getItem('crouselartid'),
    
         }),
	     success : function(data)
			    {
				if(data.message!='alreadyliked')
				      {Lcounter--}
					  $('#likecounter').html(Lcounter);
				// alert(data.message);
				 $('#likecount').toggleClass('fav-img');
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});
      
  
		

});	  



	  $(document).on('click' ,'.unfollow',function(){
      console.log('ufollw');
      console.log(localStorage.getItem('loggedINuserpatronid'));
      console.log(localStorage.getItem('fromGetArtistID'));
             $.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/unfollow",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : localStorage.getItem('fromGetArtistID'),
        "artistID"  :localStorage.getItem('loggedINuserpatronid'),
        }),
	     success : function(data)
			    { //alert(data.message);
				
				 console.log(data);
				
			     //localStorage.setItem('followed' ,'false');
               $('#followbtn').html('Follow');
				 $('#followbtn').removeClass('unfollow');
		        $('#followbtn').addClass('follow');
				 $('.follow_text').css('color', '#24e6bf');
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});

				
	  
		

     });
	 
	 $(document).on('click' ,'.follow',function(){
      
             $.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/follow",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : localStorage.getItem('fromGetArtistID'),
        "artistID"  :localStorage.getItem('loggedINuserpatronid'),
        }),
	     success : function(data)
			    { //alert(data.message);
				
				 console.log(data);
				
			     //localStorage.setItem('followed' ,'false');
               $('#followbtn').html('Unfollow');
				 $('#followbtn').removeClass('follow');
		        $('#followbtn').addClass('unfollow');
				 $('.follow_text').css('color', '#24e6bf');
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});

				
	  
		

     });
	 

	  
	  
	  
	  
	  
   
	  
       
					/*******for changing  art name n type on image change************/
					
	$(document).on('slide.bs.carousel','#myCarousel',function(e){

    var slideFrom = $(this).find('.active').index();
    var slideTo = $(e.relatedTarget).index();
	
		 var id = $(e.relatedTarget).id;
	console.log(id);
	if(id=='myVideo')
	localStorage.setItem('yo','true')
    else 
	localStorage.setItem('yo','false')
  var parsedata =JSON.parse(localStorage.getItem('crouseldata'));
  if(slideFrom=='0')
     { 
	  //localStorage.setItem('crouselartid' ,parsedata.art[currentindex-2].artID)
	  localStorage.setItem('crouselartid' ,parsedata.art[currentindex].artID);
	  	console.log('slidefrom==0')
	  console.log(localStorage.getItem('crouselartid' ));
	
	
	}
	  if(slideTo=='0')
     {  console.log('calling setCrouel');
	//s//etTimeout(setCrousel, 000);;
	  $('#myCarousel ol').html("");
      $('#crouselItems').html(" ");
	  localStorage.setItem('crouselartid' ,parsedata.art[currentindex].artID);
	 

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
		 console.log(localStorage.getItem('crouselartid' ));
		 
		 }
	
	if(slideFrom=='2')
	{
	
	localStorage.setItem('crouselartid' ,parsedata.art[currentindex-1].artID);
	console.log('slidefrom==2');
	console.log(localStorage.getItem('crouselartid' ));
	}
	var intin = parseInt(slideTo);

	
	if(intin!=0)
	{
	
	 $('.type-of-art').text(parsedata.art[intin].artType);
	  $('.name-of-art').text(parsedata.art[intin].caption);
	}

	  
	
	
});
			

	});
			

function setCrousel()
{
var active=0;
var j =0;
$('#myCarousel ol').html("");
$('#crouselItems').html(" ");


var parsedata =JSON.parse(localStorage.getItem('crouseldata'));
//alert('setCrousel();');
//alert(parsedata);
//alert(localStorage.getItem('crouseldata'));
	var targetindex = currentindex+3;
	//console.log(currentindex);
	//console.log(targetindex);

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

										//console.log(uri_dec);
					                  if(i=="0")
				                      { 
				                       //console.log('i==0');
				                          if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active"></li>');
										       $('#crouselItems').append('<div class="item active" width="300px" id="myVideo">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  $('.type-of-art').text(val.artType);
											  $('.name-of-art').text(val.caption);
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active"></li>');
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
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel"data-slide-to="'+j+'" class="active"></li>');
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
										 $('#myCarousel ol').append('<li data-target="#myCarousel"data-slide-to="'+j+'" class="active"></li>');
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
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel"data-slide-to='+j+'></li>');
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
currentindex=0
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
currentindex=0
targetindex=0
setCrousel();
}
}
$('.carousel').carousel({
     interval :false,
   pause: 'true'
 
});

}


