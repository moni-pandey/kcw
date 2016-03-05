$(document).ready(function(){

  var  longituted_detected = ' ';
  var  latitude_detected = ' '
 
   userdata =JSON.parse(localStorage.getItem('loggeduser'))
   $('#artisttab').addClass('artist-btn_active');
   getArtist();
   
  $(document).bind("deviceready", function() {
		//initiate_geolocation();
			document.addEventListener("backbutton", function() {
						console.log("Disabled Back button");
			});
			});
			$('.search').hide();
 $(document).on('click' , '.feed-btn', function () {
         $('.feed-btn').addClass('artist-btn_active');
         $('.trending-btn').removeClass('artist-btn_active');
         $('#artisttab').removeClass('artist-btn_active');
		 $('.artistlistcontainer').html(' ')
		 initiate_geolocation();
	  });
	  
$(document).on('click' , '.trending-btn', function () {
	 $('.feed-btn').removeClass('artist-btn_active');
         $('.trending-btn').addClass('artist-btn_active');
         $('#artisttab').removeClass('artist-btn_active');
//getTrending()
localStorage.trend =true ;
$('.artistlistcontainer').html(' ')
 initiate_geolocation();
	  });
	  
	  $(document).on('click' , '#artisttab', function () {
      $('.feed-btn').removeClass('artist-btn_active');
         $('.trending-btn').removeClass('artist-btn_active');
         $('#artisttab').addClass('artist-btn_active');
		 getArtist();
	  });
$(document).on('click', '.search-icon', function () {
            
			$('.hideforsearch').hide();
				$('.search').css({"visibility":"visible"});
				$('.search').css({"display":"block"});
            $('.search').fadeIn('fast', function(){
            $('#enterartist').focus();
        });
 
       }); 

	$(document).on('click', '.fa-arrow-left', function () {
          $('#enterartist').val(' ');
           $('.search').hide();
           $('.hideforsearch').show();
	$(".fbbox").each(function() {
        if($(this).hide())
		     $(this).show();
           

        
    });
	  });
	  
	  	$(document).on('click' , '.fa-times', function () {
          $('#enterartist').val(' ');
		        $(".fbbox").each(function() {
        if($(this).hide())
		     $(this).show();
            $('#enterartist').focus();
		   
        
    });
      
	  });
	 $(document).on('click','.dollarbt' ,function(e)
{
 localStorage.setItem('fromGetArtist','true');

var classname = e.target.id+'name';
var artistname = document.getElementsByClassName(classname)[0].innerHTML;
localStorage.setItem('fromartistname',artistname);

localStorage.setItem('fromartistartid',e.target.id);

var classnam = e.target.id+'type';
var artisttype = document.getElementsByClassName(classnam)[0].innerHTML;
console.log(artisttype);
localStorage.setItem('fromarttype',artisttype);
window.location="fundArtist_Patron.html";
});

$(document).on('click','.artistpic' ,function(e)
{

 var classname = e.target.id+'name';
var artistname = document.getElementsByClassName(classname)[0].innerHTML;
localStorage.setItem('fromartistname',artistname);

 localStorage.setItem('fromGetArtist','true');
 
var classnam = e.target.id+'type';
var artisttype = document.getElementsByClassName(classnam)[0].innerHTML;
//console.log(artisttype);
localStorage.setItem('fromarttype',artisttype);
if(localStorage.getItem('unfollowedonlist')=='true')
      {
	  localStorage.setItem('changenextpageBTN','false');}
else
   {  
     localStorage.setItem('changenextpageBTN','true');}	 

localStorage.setItem('fromGetArtistID',e.target.id);
//alert(localStorage.getItem('fromGetArtistID'))
window.location="profile_Patron.html";
}); 
	  


$(document).on("keyup", "#enterartist",function() {
    var g = $(this).val().toLowerCase();
	
    $(".fbbox .name_artist").each(function() {
		
        var s = $(this).text().toLowerCase();
        $(this).closest('.fbbox')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
    });
});



	  $(document).on('click','.share-img' ,function(e){
           localStorage.setItem('fromfeedtrend',true);
		  localStorage.setItem('getfeedtrend',e.target.id);
		  var artid= parseInt(e.target.id)
		  localStorage.setItem('crouselartid',artid) 
	window.location='comment_Page_new.html'
	

});	
			
});


function getTrending()
{$('.artistlistcontainer').html(' ');
	$.ajax({
	    type : 'GET',
	    url: localStorage.getItem('webserviceurl')+"patron/trending",
		contentType: "application/json",
	    dataType: "json",
		data : {
		patronID : userdata.user.patronID,
         latitude:latitude_detected,
        longitude:longituted_detected
         },
	     success : function(data)
			    {
				console.log(data)
//alert(JSON.stringify(data));

     //
			$(data.artists).each(function(i,val){
				//alert('each');
				
			$('.artistlistcontainer').append('<div class="row fbbox" id="'+val.artID+'">\
				    <div class="col-xs-12">\
				        <img src="'+decodeURIComponent(val.url)+'" width="647" height="408" class="img-responsive pic1">\
				        <img src="./assets/img/people-small.png" class="small-img" id="'+val.artistID+'" onclick="getprof(this)">\
						<p class="name-artist" value="james" id="'+val.artistID+'name" >'+val.name+'</p>\
						<p class="name-occupation '+val.artistID+'type "  value="'+val.artType+'">'+val.artType+'</p>\
						<p class="art-name">'+val.caption+'</p>\
						<p class="art-type ">'+val.tag+'</p>\
						<p class="fav-count" id="'+val.artID+'fav"><img src="./assets/img/fav.png" class="fav-img" data-like="unlike" onclick="callLikeUnlike(this)" id="'+val.artID+'img"> <span class="likeimg" id="'+val.artID+'likecounter">'+val.likecount+'</span></p>\
						<p class="share-count">'+val.commentcount+'</p>\
						<img src="./assets/img/Comment.png"  class="share-img" id="'+val.artID+'cmt">\
					</div> \
				</div>');
				
			
			
				
				});
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});
		
}
	function getfeed()
{
					$('.artistlistcontainer').html(' ')

$.ajax({
					type : 'GET',
					url: localStorage.getItem('webserviceurl')+"patron/feed",
					contentType: "application/json",
					data : {
			"patronID" : userdata.user.patronID,
         "latitude":latitude_detected,
        "longitude":longituted_detected
					 },
				  success : function(data)
			    {
				
				//alert(data);
             console.log(JSON.stringify(data));
				//alert(JSON.stringify(data));
				
				//alert(response);
				//alert(response.artists);
				//alert(data.artists);
				$(data.artists).each(function(i,val){
			
			
					$('.artistlistcontainer').append('<div class="row fbbox" id="'+val.artID+'">\
				    <div class="col-xs-12">\
				        <img src="'+decodeURIComponent(val.url)+'" width="647" height="408" class="img-responsive pic1">\
				        <img src="./assets/img/people-small.png" class="small-img" id="'+val.artistID+'" onclick="getprof(this)">\
						<p class="name-artist" value="james" id="'+val.artistID+'name" >'+val.name+'</p>\
						<p class="name-occupation '+val.artistID+'type "  value="'+val.artType+'">'+val.artType+'</p>\
						<p class="art-name">'+val.caption+'</p>\
						<p class="art-type ">'+val.tag+'</p>\
						<p class="fav-count" id="'+val.artID+'fav"><img src="./assets/img/fav.png" class="fav-img" data-like="unlike" onclick="callLikeUnlike(this)" id="'+val.artID+'img"> <span class="likeimg" id="'+val.artID+'likecounter">'+val.likeCount+'</span></p>\
						<p class="share-count">'+val.commentcount+'</p>\
						<img src="./assets/img/Comment.png"  class="share-img" id="'+val.artID+'cmt">\
					</div> \
				</div>');
			localStorage.setItem('feedclicked','false');
				
				});
				
				} ,
	   error   : function(xhr, status, error)
                 {console.log(xhr);
				 
				 
				 }						 
		});



}	

function getArtist()
{
		$('.artistlistcontainer').html( ' ');
	
	$.ajax({
	    type : 'GET',
	    url: localStorage.getItem('webserviceurl')+"patron/artist" ,
		contentType: "application/json",
	    data : {
		"patronID" : userdata.user.patronID
         },
	   success : function(data)
			    {
				
				console.log(data);
				localStorage.setItem('nd' ,JSON.stringify(data));;
				var response =localStorage.getItem('nd');
				//alert(response);
				//alert(response.artists);
				//alert(data.artists);
				$(data.artists).each(function(i,val){
				//alert('each');
				
				//$('.artistlistcontainer').append('');
				                          if(val.art[(val.art.length)-1])
										  { if(val.art[(val.art.length)-1].url!=='null'){
											  var first=decodeURIComponent(val.art[(val.art.length)-1].url)
										  }
											 else 
											 {
												var first ='./assets/img/no_img.jpg'
												 
											 }
										  }
										  else
											  first ='./assets/img/no_img.jpg'
										  
											 if(val.art[(val.art.length)-2])
											 {
											 if(val.art[(val.art.length)-2].url!=='null')
											 {
												var second =decodeURIComponent(val.art[(val.art.length)-2].url)
											 }
											 else 
											 {
												var second ='./assets/img/no_img.jpg'
												 
											 }
											 }
											 else
												var second ='./assets/img/no_img.jpg' 

											 if(val.art[(val.art.length)-3])
											 {
											 if(val.art[(val.art.length)-3].url!=='null')
											 {
												var third =val.art[(val.art.length)-3].url
											 }
											 else 
											 {
												 var third  ='./assets/img/no_img.jpg'
												 
											 }}
											 else 
												var third  ='./assets/img/no_img.jpg'
			
				
				$('.artistlistcontainer').append('<div class="row fbbox" id="'+val.art[i].artID+'">\
				    <div class="col-xs-12 ">\
					    <img src="./assets/img/transparent_bg.png" width="654" height="353" class="img-responsive transparent-bg-img">\
						<img src="./assets/img/people.png" class="people-img artistpic" id="'+val.artistID+'">\
						<p class="name_artist '+val.artistID+'name " value="'+val.name+'" >'+val.name+'</p>\
			      		<p class="name-of-occupation '+val.artistID+'type "  value="'+val.artType+'">'+val.artType+'</p>\
						<P class="follow_text"><button class="dollarbt dollaricon" id="'+val.artistID+'">$ &nbsp;&nbsp;&nbsp;&nbsp;</button><img src="./assets/img/unfollow.png" class="unfollow_img" id="'+val.artistID+'">&nbsp;&nbspUnfollow</P>\
						<p class="recent-uploaded_text">Recent uploaded images</p>\
						<img src="'+first+'" style="height:90px;width:69px" class="img-responsive artwork1_img">\
						<img src="'+second+'" style="height:90px;width:69px" class="img-responsive artwork2_img">\
						<img src="'+third+'" style="height:90px;width:69px" class="img-responsive artwork3_img">\
					</div>\
				</div>');
				
				
				
				});
					
				
				} ,
	   error   : function (xhr, status, error)
                 {
					 console.log(xhr);
					 console.log(status);
					 console.log(error);
				 
				 }						 
		});



	
}



	 function initiate_geolocation() {
			 //alert('inside geo loc')
			 
	var options = {maximumAge: 0, timeout: 100000, enableHighAccuracy:false};
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
               //   ' Lon: ' + position.coords.longitude);
				  
				      longituted_detected = position.coords.longitude;
                      latitude_detected = position.coords.latitude ;
					  
					 
   if(localStorage.trend==true)
   { localStorage.trend= false
	   getTrending()
   }
   else
   
   getfeed();
  
				  
				 //location_fetched = position.coords.latitude + ',' + position.coords.longitude ;
				 // alert(location);
				  //alert('calling imoprtart');
				 // importart();
        }
			
	
function callLikeUnlike(artid)
{
	console.log(artid)
	var imgartid = $(artid).attr("id")
	
	var likeartid= parseInt(imgartid)
	var countimg = likeartid +'likecounter'
	console.log(likeartid)
	
	if($(artid).data("like")=='liked')
	{ 
       console.log('liked : calling unlike api ')
	  $.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/art/unlike",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : localStorage.getItem('loggedINuserpatronid'),
         "artID" : likeartid
         }),
	     success : function(data)
			    {
				
        //  alert(JSON.stringify(data));
		 
		   var noOflikes = $('#'+countimg).text()
		    if(noOflikes=='0')
			{
				console.log('zerolikes');
			}
		 else {
			 $(artid).data("like" ,'unlike')
			 noOflikes--;
         $('#'+countimg).text(noOflikes);}
		 
	  
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
	});}
	else
	{
			console.log('notlike')
		$.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/art/like ",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : localStorage.getItem('loggedINuserpatronid'),
         "artID" : likeartid
         }),
	     success : function(data)
			    {
				
         // alert(JSON.stringify(data));
		  
		  $(artid).data('like' ,'liked')
		 var noOflikes = $('#'+countimg).text()
		    noOflikes++;
         $('#'+countimg).text(noOflikes);
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});
	
	}
	
}

function getprof(id)
{
	var imgartid = $(id).attr("id")
	var nameid= imgartid +'name'
	var artistname = $('#'+nameid).text();
	localStorage.setItem('fromartistname',artistname)
	 localStorage.setItem('loggedINuserartistid' ,imgartid);
	 localStorage.setItem('fromGetArtistID',imgartid),
     
	 window.location="profile_Patron.html"
	 
	
	
	
}		
			
                 /**************************************************/
$(document).on('click' ,'.follow_img',function(e) {

//alert('.foll_img');
var id = e.target.id 

 $.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/follow",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : id,
        "artistID"  :localStorage.getItem('loggedINuserpatronid'),
        }),
	     success : function(data)
			    {
			
				  console.log(data);
			
				 localStorage.setItem('unfollowedonlist' ,'false');
				 $('.follow_text').html('<button class="dollarbt dollaricon" id="'+id+'">$ &nbsp;&nbsp</button><img src="./assets/img/unfollow.png" class="unfollow_img">Unfollow');
				 $('.follow_text').css('color', '#24e6bf');
	
		    
				
				} ,
	     error   : function (xhr, status, error)
                 {
				 console.log(xhr);
				 }						 
		});


});
/**************end of .follow_img click event ******************/





/************** .unfollow_img click event ******************/


$(document).on('click' ,'.unfollow_img', function(e){

var id= e.target.id

$.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/unfollow",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : id,
        "artistID"  :localStorage.getItem('loggedINuserpatronid'),
        }),
	     success : function(data)
			    {// alert(data.message);
				
				 console.log(data.error);
			localStorage.setItem('unfollowedonlist' ,'true');
               $('.follow_text').html('<button class="dollarbt dollaricon" id="'+id+'">$ &nbsp;&nbsp</button><img src="./assets/img/Follow.png" class="follow_img" id="followArtist">Follow');
				 
				 $('.follow_text').css('color', '#24e6bf');
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});



});//end:unfollow

