
$(document).ready(function(){
localStorage.getItem('fromfeedtrend','false');
localStorage.setItem('fromGetArtistID' ," ");


    $(document).bind("deviceready", function() {
	
	
			document.addEventListener("backbutton", function() {
						console.log("Disabled Back button");
			});
			});
		 
				 $('.feed-btn').css({"background-color": "transparent"})
				 $('.feed-btn').css({"color":"white"})

				 $('.trending-btn').css({"background-color": "transparent"})
								 $('.trending-btn').css({"color":"white"})			
				localStorage.setItem('fromartistlister' ,'false');
				localStorage.setItem('unfollowedonlist','false')
				$('.search').hide();
				   $(document).on('click' , '.search-icon', function () {
				$('.hideforsearch').hide();
				$('.search').css({"visibility":"visible"});
				$('.search').css({"display":"block"});
						   $('.search').fadeIn('fast', function(){
							$('#enterartist').focus();
						});
						   
						   
						   //$('.search').slideUp();
						
					}); 


	$(document).on('click' , '.fa-arrow-left', function () {
          $('#enterartist').val(' ');
           $('.search').hide();
           $('.hideforsearch').show();
		   
		   $(".fbbox").each(function() {
        if($(this).hide())
		     $(this).show();
           
		   //$('.search').slideUp();
        
    });
	  });
	  
	  	$(document).on('click' , '.fa-times', function () {
          $('#enterartist').val(' ');
		        $(".fbbox").each(function() {
        if($(this).hide())
		     $(this).show();
            $('#enterartist').focus();
		   //$('.search').slideUp();
        
    });
      
	  });  


// load feed 

 $(document).on('click' , '.feed-btn', function () {
       localStorage.setItem('feedclicked' ,'true');
	    
      window.location='home1_Patron.html'
	  });
	  
$(document).on('click' , '.trending-btn', function () {
     window.location='home3_Patron.html'
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

$(document).on("keyup", "#enterartist",function() {
    var g = $(this).val().toLowerCase();
    $(".fbbox .name_artist").each(function() {
        var s = $(this).text().toLowerCase();
        $(this).closest('.fbbox')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
    });
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

/*************loading artist list************************/

var id =parseInt(localStorage.getItem('loggedINuserpatronid'));
$.ajax({
	    type : 'GET',
	    url: localStorage.getItem('webserviceurl')+"patron/artist" ,
		contentType: "application/json",
	    data : {
		"patronID" : id
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
				
				$('.artistlistcontainer').append('<div class="row fbbox" id="'+val.art[i].artID+'">\
				    <div class="col-xs-12 ">\
					    <img src="./assets/img/transparent_bg.png" width="654" height="353" class="img-responsive transparent-bg-img">\
						<img src="./assets/img/people.png" class="people-img artistpic" id="'+val.artistID+'">\
						<p class="name_artist '+val.artistID+'name " value="'+val.name+'" >'+val.name+'</p>\
			      		<p class="name-of-occupation '+val.artistID+'type "  value="'+val.artType+'">'+val.artType+'</p>\
						<P class="follow_text"><button class="dollarbt dollaricon" id="'+val.artistID+'">$ &nbsp;&nbsp;&nbsp;&nbsp;</button><img src="./assets/img/unfollow.png" class="unfollow_img" id="'+val.artistID+'">&nbsp;&nbspUnfollow</P>\
						<p class="recent-uploaded_text">Recent uploaded images</p>\
						<img src="'+decodeURIComponent(val.art[(val.art.length)-1].url)+'" style="height:90px;width:69px" class="img-responsive artwork1_img">\
						<img src="'+decodeURIComponent(val.art[(val.art.length)-2].url)+'" style="height:90px;width:69px" class="img-responsive artwork2_img">\
						<img src="'+decodeURIComponent(val.art[(val.art.length)-3].url)+'" style="height:90px;width:69px" class="img-responsive artwork3_img">\
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






});//endofdoc.ready
