
					  
$("document").ready(function() {

 Lcounter=10;
 Ccounter =14
 newindex=0
 firsttime=true;
 artistidnew=''
 var cHeight = 0;
var userdata =JSON.parse(localStorage.getItem('loggeduser'))
console.log(userdata)
//$('#city').html('in Funds ,' userdata.data.city)
$('.artist-info').html(userdata.user.artistType+'<br><span class="artist-fund-amt">$0</span> in Funds ,'+userdata.user.city+ '</span>')
	      $(document).bind("deviceready", function() {

			});
  $(document).on('click' ,'.bck-text',function(){

		 //parent.history.back();
		 if(localStorage.frmfeed)
		 {window.location="home3_Patron.html"
	 localStorage.frmfeed=false
	 }
		 else
		  window.location="home2_Patron.html"
 })
 
  document.addEventListener('backbutton', function(e) {  console.log('backbuttonpressed');
       //  localStorage.fbLinked = true ;
		 //localStorage.bckbtn=true
		// parent.history.back();
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
	
	
        var $nextImage = null;

        $activeItem = $('.active.item', this);

        if (e.direction == 'left'){
            $nextImage = $activeItem.next('.item').find('img');
			  var cc = $('.carousel-inner .active').next().data('comment')
				 var lc = $('.carousel-inner .active').next().data('likecount')
				$('#cmntcounter').text(lc);
				 $('#likecounter').text(cc);
					 var ta = $('.carousel-inner .active').next().data('art')
				 var na = $('.carousel-inner .active').next().data('caption')
				
				 $('.type-of-art').text(ta);
				 $('.name-of-art').text(na);
					console.log(cc)
					console.log(lc)
					console.log(ta)
				console.log(na)
			
			
        } else {
			if ($activeItem.index() == 0){
                $nextImage = $('img:last', $activeItem.parent());
				
	$('#likecounter').text(parsedata.art[0].likecount);
	$('#cmntcounter').text(parsedata.art[0].commentcount);
	$('.type-of-art').text(parsedata.art[0].artType);
	$('.name-of-art').text(parsedata.art[0].caption);
            } else {
                $nextImage = $activeItem.prev('.item').find('img');
				  var cc = $('.carousel-inner .active').prev().data('comment')
					 var lc = $('.carousel-inner .active').prev().data('likecount')
					$('#likecounter').text(lc);
					 $('#cmntcounter').text(cc); 
					  var ta = $('.carousel-inner .active').prev().data('art')
					 var na = $('.carousel-inner .active').prev().data('caption')

					 $('.type-of-art').text(ta);
					 $('.name-of-art').text(na);
						console.log(ta)
					console.log(na)
				
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
    
	
	
/*	var parsedata =JSON.parse(localStorage.getItem('crouseldata'));
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
*/
	

	
	
	});//end of slide bs 







});
			
/*********************/






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
			 //alert(userdata.user.patronID)
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
			   
			    //SetCrousel(); 
			    setcarousel(); 
				
	
	} ,
	
	error   : function (xhr, status, error)
	{console.log(xhr);}						 
		
		
		});//end of ajax call 

		  
		  
	  
	
	
}
function setcarousel()
{
	$('#myCarousel ol').html("");
$('#crouselItems').html(" ");

var parsedata =JSON.parse(localStorage.getItem('crouseldata'));
console.log(parsedata);


	$('#likecounter').text(parsedata.art[0].likecount);
	$('#cmntcounter').text(parsedata.art[0].commentcount);
	$('.type-of-art').text(parsedata.art[0].artType);
	$('.name-of-art').text(parsedata.art[0].caption);
	
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









