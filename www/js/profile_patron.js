
					  
$("document").ready(function() {

 Lcounter=10;
 Ccounter =14
 newindex=0
 firsttime=true;
 artistidnew=''
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
artistidnew=localStorage.getItem('fromGetArtistID');
callforcarouselimages();

	}
else
{
console.log(localStorage.getItem('fromartistname'));
artistidnew=localStorage.getItem('loggedINuserartistid')
$('#patronname').text(localStorage.getItem('fromartistname'));
callforcarouselimages();
						}
	  
	  
/*if(localStorage.getItem('changenextpageBTN')=='true')
		 {  
		  // alert('if(localStorage.getItem(');
		$('#followbtn').html('Unfollow');
		$('#followbtn').removeClass('follow');
		$('#followbtn').addClass('unfollow');
		localStorage.setItem('fromGetArtist','false')
		
		}*/
	
    
	  // comment on art 
	  
	  $('#ppfundme').bind('click' ,function(){
	  
	  window.location='fundArtist_Patron.html';
	  
	  });
	  $('#commentOnart').bind('click' ,function(){
          
		  localStorage.setItem('fromArtistPage','false');
		   var imagid =$('.carousel-inner .active').attr('id')

  localStorage.setItem('crouselartid' ,imagid)
  localStorage.setItem('fromartistprof' ,'true')
window.location = 'comment_Page_new.html' ;
	
	

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
	$('#likecounter').text(cc);
     $('#cmntcounter').text(lc);
	 var ta = $('.carousel-inner .active').next().data('art')
	 var na = $('.carousel-inner .active').next().data('caption')
	//$('.type-of-art-ccount').text(cc);
	console.log(ta)
	console.log(na)
    //$('.type-of-art-lcount').text(lc);
	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
	    })
	    hammerobj.on('swiperight', function() {
	        console.log("touch right");
	        modalc.carousel('prev');
			 var cc = $('.carousel-inner .active').prev().data('comment')
	 var lc = $('.carousel-inner .active').prev().data('likecount')
	$('#likecounter').text(cc);
     $('#cmntcounter').text(lc);
	 var ta = $('.carousel-inner .active').prev().data('art')
	 var na = $('.carousel-inner .active').prev().data('caption')
	 //$('.type-of-art-ccount').text(cc);
     //$('.type-of-art-lcount').text(lc);
	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
	 	console.log(ta)
	console.log(na)
	    })

   
	  
      	
	    	/*******for changing  art name n type on image change************/
					
	$(document).on('slide.bs.carousel','#myCarousel',function(e){
    // var left = $('#myCarousel').find('.item.active.left');
    // var right = $('#myCarousel').find('.item.active.right');
	var parsedata =JSON.parse(localStorage.getItem('crouseldata'));
	var lastindex = parsedata.art.length 
	var slideFrom = $(this).find('.active').index();
    var slideTo = $(e.relatedTarget).index();
var direction =e.direction;
	 
	  if(direction=='left')
	 {
	 var cc = $('.carousel-inner .active').next().data('comment')
	 var lc = $('.carousel-inner .active').next().data('likecount')
	$('#cmntcounter').text(cc);
     $('#likecounter').text(lc);
	 	 var ta = $('.carousel-inner .active').next().data('art')
	 var na = $('.carousel-inner .active').next().data('caption')
	
	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
	 	console.log(cc)
	 	console.log(lc)
	 	console.log(ta)
	console.log(na)
	 
	 }else{
		 
		 var cc = $('.carousel-inner .active').prev().data('comment')
	 var lc = $('.carousel-inner .active').prev().data('likecount')
	$('#likecounter').text(cc);
     $('#cmntcounter').text(lc); 
	  var ta = $('.carousel-inner .active').prev().data('art')
	 var na = $('.carousel-inner .active').prev().data('caption')

	 $('.type-of-art').text(ta);
	 $('.name-of-art').text(na);
	 	console.log(ta)
	console.log(na)
		 
	 }
	if(slideTo=='0')
	{   
       console.log('slide to ')
		if(newindex>=lastindex || newindex==0)
		{ newindex =0
	      console.log('images over ')
		  firsttime=true
	      SetCrousel();
	    }
	     else
		 {  console.log('images left')
			 SetCrousel();
		 }
	}

	
});

});
			
/*********************/




function SetCcrousel()
{
	

var j =0;
$('#myCarousel ol').html("");
$('#crouselItems').html(" ");

var parsedata =JSON.parse(localStorage.getItem('crouseldata'));
console.log(parsedata);

	if(parsedata.art.length=='0')
		 return;
	   
	var lastindex = parsedata.art.length 
	if(firsttime)
	{
	$('#likecounter').text(parsedata.art[0].likecount);
	$('#cmntcounter').text(parsedata.art[0].commentcount);
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
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   <div class="item" id="'+parsedata.art[k+1].artID+'"  data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'" >\
												<img src="'+b+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'"  data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'" >\
												<img src="'+bk+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											    <div class="item" id="'+parsedata.art[k+1].artID+'" data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[k+1].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[0].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											 //  $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }	
							 newindex=0
		   return;
			
			
		}
		
		if(k==lastindex-1)
		  return;
                     
                     						 
					 if(k==lastindex-2)	
						{
						if(uri_dec.indexOf('video')> -1)
										  {
										     if(parsedata.art[lastindex-1].url!=='null')
											 {
												var b = parsedata.art[lastindex-1].url!=='null'
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
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   <div class="item" id="'+parsedata.art[k+1].artID+'"  data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'" >\
												<img src="'+b+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'"  data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'" >\
												<img src="'+bk+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											    <div class="item" id="'+parsedata.art[k+1].artID+'" data-comment="'+parsedata.art[k+1].commentcount+'" data-likecount="'+parsedata.art[k+1].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[k+1].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'">\
												<img src="'+decodeURIComponent(parsedata.art[0].url)+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											 //  $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }	
							
						newindex=0
					  setTimeout(SetCrousel, 20000);
						}							

else{
						  if(k==(target-3))
						   {  console.log('k==0')
						    console.log(parsedata.art[k].commentcount)
						   if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											 // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px" >\
											   </div>');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }
						   }
						   else {
							   
							   
							    if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class=""  id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item " width="300px" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item " id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  console.log(parsedata.art[k].commentcount)
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
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   \
											   ');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											   \
											   ');
											 
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											;
                                        }	
							
		   newindex=0
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
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'"  >\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'"  data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'" >\
												<img src="'+b0+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[0].artID+'"  data-comment="'+parsedata.art[1].commentcount+'" data-likecount="'+parsedata.art[1].likecount+'" >\
												<img src="'+b1+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  // $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active"></li>\
										<li data-target="#myCarousel" data-slide-to="1" ></li>\
											<li data-target="#myCarousel" data-slide-to="2" ></li>\
											');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'" >\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>\
											    <div class="item" id="'+parsedata.art[0].artID+'" data-comment="'+parsedata.art[0].commentcount+'" data-likecount="'+parsedata.art[0].likecount+'">\
												<img src="'+b0+'"alt="Chania" style="height:200px">\
											   </div>\
											   <div class="item" id="'+parsedata.art[1].artID+'" data-comment="'+parsedata.art[1].commentcount+'" data-likecount="'+parsedata.art[1].likecount+'">\
												<img src="'+b1+'"alt="Chania" style="height:200px">\
											   </div>\
											   ');
											 //  $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }	
							
						newindex=0
					   setTimeout(SetCrousel, 20000);
						}							

else{
						  if(k==(target-3))
						   {  console.log('k==0')
						    console.log(parsedata.art[k].commentcount)
						   if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class="active" id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											 // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px" >\
											   </div>');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }
						   }
						   else {
							   
							   
							    if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class=""  id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item " width="300px" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item " id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
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
										       $('#crouselItems').append('<div class="item active" width="300px" id="'+parsedata.art[k].artID+'"  data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											 // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
										  
                                        else {
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="active" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item active" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px" >\
											   </div>');
											  // $('.like-amt').html(' ')
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											// $('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
											  // $('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											 // $('.type-of-art-lcount').text(parsedata.art[k].likecount);
                                        }
						   }
						   else {
							   
							   
							    if(uri_dec.indexOf('video')> -1)
										  {
										  
										  	$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'" class=""  id="'+parsedata.art[k].artID+'li"></li>');
										       $('#crouselItems').append('<div class="item " width="300px" id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
									 			<video width="100%" height="200px"  controls >\
                                                <source src="'+uri_dec+'"  type="video/mp4">\
                                                    </video>\
											   </div>');
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  //$('.type-of-art-ccount').text(parsedata.art[k].commentcount);
											  //$('.type-of-art-lcount').text(parsedata.art[k].likecount);
											  //$('.like-amt').html(' ')
											   //$('.like-amt').html('<img src="./assets/img/fav.png" class="fav-img">'+parsedata.art[k].likecount+' <img src="./assets/img/Comment.png" class="comment-img"><span id="commentcount">'+parsedata.art[k].commentcount+'</span>');
											  
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item " id="'+parsedata.art[k].artID+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
											  $('.type-of-art').text(parsedata.art[k].artType);
											  $('.name-of-art').text(parsedata.art[k].caption);
											  console.log(parsedata.art[k].commentcount)
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
  setTimeout(SetCrousel, 20000);
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
		"artistID" :artistidnew
},
	   success : function(data)
			    { 
				//alert('inside getArtistSuccess loaddddddddd');
				//alert(data);
				
			   var crouseldat = JSON.stringify(data);
			//alert(JSON.stringify(data))
			  localStorage.setItem('crouseldata' ,' ');
			 // alert(localStorage.getItem('crouseldata'));
			 localStorage.setItem('crouseldata' ,crouseldat);
			 console.log('calling set')
			 var userdata =JSON.parse(localStorage.getItem('loggeduser'))
			 alert(userdata.user.patronID)
			 for(var k =0 ;k<data.followers.length ;k++)
				 
			        {   
					console.log(data.followers[k].patronid)
					if(userdata.user.patronID==data.followers[k].patronid)
			             {
							 $('#followbtn').html('Unfollow');
				            $('#followbtn').removeClass('follow');
							$('#followbtn').addClass('unfollow');
							 $('.follow_text').css('color', '#24e6bf');
			             	console.log('following')
			             }
			             else 
			             console.log('not following ')}
			    ajaxflag =false
			    SetCrousel(); 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 

		  
		  
	  
	
	
}







function SetCrousel()
{
	

var j =0;
$('#myCarousel ol').html("");
$('#crouselItems').html(" ");

var parsedata =JSON.parse(localStorage.getItem('crouseldata'));
console.log(parsedata);

	if(parsedata.art.length=='0')
		 return;
	   
	var lastindex = parsedata.art.length 
	if(firsttime)
	{
	$('#likecounter').text(parsedata.art[0].likecount);
	$('#cmntcounter').text(parsedata.art[0].commentcount);
	$('.type-of-art').text(parsedata.art[0].artType);
	$('.name-of-art').text(parsedata.art[0].caption);
	firsttime= false
	}
	if(newindex==lastindex-1)
		var target = newindex+1
	else
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
												var b = decodeURIComponent(parsedata.art[k+1].url)
											 }
											 else 
											 {
												 var b = './assets/img/no_img.jpg'
												 
											 }
											  if(parsedata.art[0].url!=='null')
											 {
												var bk = decodeURIComponent(parsedata.art[0].url)								 }
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
												var b = decodeURIComponent(parsedata.art[k+1].url)
											 }
											 else 
											 {
												 var b = './assets/img/no_img.jpg'
												 
											 }
											  if(parsedata.art[0].url!=='null')
											 {
												var bk = decodeURIComponent(parsedata.art[0].url)
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
					  setTimeout(SetCrousel, 20000);
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
							 console.log(parsedata.art[0].url)  
							 console.log(parsedata.art[1].url)  
							 if(parsedata.art[0].url!=='null')
											 {
												var b0 = decodeURIComponent(parsedata.art[0].url)
											 }
											 else 
											 {
												 var b0= './assets/img/no_img.jpg'
												 
											 }
											  if(parsedata.art[1].url!=='null')
											 {
												var b1 = decodeURIComponent(parsedata.art[1].url)
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
					   setTimeout(SetCrousel, 20000);
					   
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
											
										  
										  }
                                        else{
										$('#myCarousel ol').append('<li data-target="#myCarousel" data-slide-to="'+j+'"  class="" id="'+parsedata.art[k].artID+'li"></li>');
										$('#crouselItems').append('<div class="item " id="'+parsedata.art[k].artID+'" data-caption="'+parsedata.art[k].caption+'" data-art="'+parsedata.art[k].artType+'" data-comment="'+parsedata.art[k].commentcount+'" data-likecount="'+parsedata.art[k].likecount+'">\
												<img src="'+uri_dec+'"alt="Chania" style="height:200px">\
											   </div>');
 
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
  setTimeout(SetCrousel, 20000);
}

}




