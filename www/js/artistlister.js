
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
	  
	
/*$(document).on('click','.dollarbt' ,function(e)
{
 localStorage.setItem('fromGetArtist','true');

var classname = e.target.id+'name';
//var artistname = document.getElementsByClassName(classname)[0].innerHTML;
var artistname = $("."+classname).clone().children().remove().end().text();
localStorage.setItem('fromartistname',artistname);

localStorage.setItem('fromartistartid',e.target.id);

var classnam = e.target.id+'type';
//var artisttype = document.getElementsByClassName(classnam)[0].innerHTML;
var artisttype = $("#"+classnam).text();
console.log(artisttype);
localStorage.setItem('fromarttype',artisttype);
window.location="fundArtist_Patron.html";
});*/

$(document).on("keyup", "#enterartist",function() {
    var g = $(this).val().toLowerCase();
    $(".fbbox .artist-work-detail").each(function() {
        var s = $(this).clone().children().remove().end().text().toLowerCase();
        $(this).closest('.fbbox')[ s.indexOf(g) !== -1 ? 'show' : 'hide' ]();
    });
});

$(document).on('click','.artistpic' ,function(e)
{

 var classname = e.target.id+'name';
//var artistname = document.getElementsByClassName(classname)[0].innerHTML;
//var artistname = document.getElementsByClassName(classname)[0].innerHTML;
var artistname = $("."+classname).clone().children().remove().end().text();
//alert(artistname)
localStorage.setItem('fromartistname',artistname);

 localStorage.setItem('fromGetArtist','true');
 
var classnam = e.target.id+'type';
//var artisttype = document.getElementsByClassName(classnam)[0].innerHTML;
//console.log(artisttype);
//var artisttype = $("."+classnam).val();
//alert(artisttype)
//localStorage.setItem('fromarttype',artisttype);
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
												var third =decodeURIComponent(val.art[(val.art.length)-3].url)
											 }
											 else 
											 {
												 var third  ='./assets/img/no_img.jpg'
												 
											 }}
											 else 
												var third  ='./assets/img/no_img.jpg'
				
				
				/*$('.artistlistcontainer').append('<div class="row fbbox" id="'+val.art[i].artID+'">\
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
				*/
					
				
				/*$('.artistlistcontainer').append('<div class="row  side-spacing fbbox" id="'+val.art[i].artID+'" >\
				    <div class="col-xs-12">\
					    <div class="artist-detail-bg">\
						    <p class="artist-work-detail '+val.artistID+'name"  >\
							    <img src="./assets/img/people.png"  class ="artistpic" height="50" width="58" id="'+val.artistID+'" >\
								'+val.name+'\
								<span class="follow_text" id="'+val.artistID+'follow"><img class="dollarbt dollaricon" src="./assets/img/dollar_20x20.png" id="'+val.artistID+'"> &nbsp;<img src="./assets/img/unfollow_20x20.png" class="unfollow_img" id="'+val.artistID+'">&nbsp;Unfollow</span>\
                                </span></p>\
							<h5 class="name-of-occupation" '+val.artistID+'type "  value="'+val.artType+'">'+val.artType+'</h5>\
							<div class="row" style="margin-left:10px;margin-right:10px">\
							    <h6 class="recent-uploaded_text">Recent uploaded images</h6>\
							    <div class="col-xs-4" style="padding-right:5px;">\
								    <img src="'+first+'" class="img-responsive center-block recent-works">\
								</div>\
								<div class="col-xs-4" style="padding-right:10px; padding-left:10px;">\
								    <img src="'+second+'" class="img-responsive center-block recent-works">\
								</div>\
								<div class="col-xs-4" style="padding-left:5px;">\
								    <img src="'+third+'" class="img-responsive center-block recent-works">\
									\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>')*/
				$('.artistlistcontainer').append('<div class="row  side-spacing fbbox" id="'+val.art[i].artID+'" >\
				    <div class="col-xs-12">\
					    <div class="artist-detail-bg">\
						    <p class="artist-work-detail '+val.artistID+'name"  >\
							    <img src="./assets/img/people.png"  class ="artistpic" height="50" width="58" id="'+val.artistID+'" >\
								'+val.name+'\
								<span class="follow_text" id="'+val.artistID+'">\
								 <button type="button" class="dollar-btn" id="'+val.artistID+'" onclick="getexpensepage(this)"><img class="dollarbt dollaricon" src="./assets/img/dollar_20x20-cGreen.png"></button> \
									<button type="button" class="follow-artist-btn" id="'+val.artistID+'" data-follow="f" onclick="unfollowartist(this)"><img  src="./assets/img/unfollow_20x20.png">Unfollow</button></span>\
								</p>\
							<h5 class="name-of-occupation" '+val.artistID+'type "  value="'+val.artType+'">'+val.artType+'</h5>\
							<div class="row" style="margin-left:10px;margin-right:10px">\
							    <h6 class="recent-uploaded_text">Recent uploaded images</h6>\
							    <div class="col-xs-4" style="padding-right:5px;">\
								    <img src="'+first+'" class="img-responsive center-block recent-works">\
								</div>\
								<div class="col-xs-4" style="padding-right:10px; padding-left:10px;">\
								    <img src="'+second+'" class="img-responsive center-block recent-works">\
								</div>\
								<div class="col-xs-4" style="padding-left:5px;">\
								    <img src="'+third+'" class="img-responsive center-block recent-works">\
									\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>')
				
				
				
				});
				
				} ,
	   error   : function (xhr, status, error)
                 {
					 console.log(xhr);
					 console.log(status);
					 console.log(error);
				 
				 }						 
		});




                 /**************************************************
$(document).on('click' ,'.follow_img',function(e) {

//alert('.foll_img');
var id = e.target.id 
var followid= e.target.id+'follow'
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
				 $("#"+followid).html('<img class="dollarbt dollaricon" src="./assets/img/dollar_20x20.png" id="'+id+'"> &nbsp;<img src="./assets/img/unfollow_20x20.png" class="unfollow_img">&nbsp;Unfollow');
				 //$('.follow_text').html('<button class="dollarbt dollaricon" id="'+id+'">$ &nbsp;&nbsp</button><img src="./assets/img/unfollow.png" class="unfollow_img">Unfollow');
				// $('.follow_text').css('color', '#24e6bf');
				 $("#"+followid).css('color', '#24e6bf');
	
		    
				
				} ,
	     error   : function (xhr, status, error)
                 {
				 console.log(xhr);
				 }						 
		});


});



$(document).on('click' ,'.unfollow_img', function(e){

var id= e.target.id
var followid= e.target.id+'follow'
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
              // $('.follow_text').html('<button class="dollarbt dollaricon" id="'+id+'">$ &nbsp;&nbsp</button><img src="./assets/img/Follow.png" class="follow_img" id="followArtist">Follow');
               $("#"+followid).html('<img class="dollarbt dollaricon" src="./assets/img/dollar_20x20.png"  id="'+id+'"> &nbsp;<img src="./assets/img/follow_20x20.png" class="follow_img" id="'+id+'">&nbsp;Follow');
				 
				 //$('.follow_text').css('color', '#24e6bf');
				 $("#"+followid).css('color', '#24e6bf');
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});



});//end:unfollow


*/



});//endofdoc.ready


function getexpensepage(id)
{
 localStorage.setItem('fromGetArtist','true');

var classname = $(id).attr('id')+'name';
//var artistname = document.getElementsByClassName(classname)[0].innerHTML;
var artistname = $("."+classname).clone().children().remove().end().text();
localStorage.setItem('fromartistname',artistname);

localStorage.setItem('fromartistartid',$(id).attr('id'));

var classnam =$(id).attr('id')+'type';
//var artisttype = document.getElementsByClassName(classnam)[0].innerHTML;
var artisttype = $("#"+classnam).text();
console.log(artisttype);
localStorage.setItem('fromarttype',artisttype);
window.location="fundArtist_Patron.html";
	
}


function unfollowartist(id)
{
	var vid= $(id).attr('id')
var followid= $(id).attr('id')+'follow'
if($(id).data('follow')=='f')
{
$.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/unfollow",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : vid,
        "artistID"  :localStorage.getItem('loggedINuserpatronid'),
        }),
	     success : function(data)
			    {// alert(data.message);
				
				 console.log(data.error);
				 $(id).data('follow','u')
				 $(id).html('<img src="./assets/img/follow20x20-cGreen.png">Follow')
			//localStorage.setItem('unfollowedonlist' ,'true');
              // $('.follow_text').html('<button class="dollarbt dollaricon" id="'+id+'">$ &nbsp;&nbsp</button><img src="./assets/img/Follow.png" class="follow_img" id="followArtist">Follow');
               //$("#"+followid).html('<img class="dollarbt dollaricon" src="./assets/img/dollar_20x20.png"  id="'+id+'"> &nbsp;<img src="./assets/img/follow_20x20.png" class="follow_img" id="'+id+'">&nbsp;Follow');
				 
				 //$('.follow_text').css('color', '#24e6bf');
				// $("#"+followid).css('color', '#24e6bf');
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});
}
else{
	$.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/follow",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"patronID" : vid,
        "artistID"  :localStorage.getItem('loggedINuserpatronid'),
        }),
	     success : function(data)
			    {
			
				  console.log(data);
			
				 localStorage.setItem('unfollowedonlist' ,'false');
				// $("#"+followid).html('<img class="dollarbt dollaricon" src="./assets/img/dollar_20x20.png" id="'+id+'"> &nbsp;<img src="./assets/img/unfollow_20x20.png" class="unfollow_img">&nbsp;Unfollow');
				 //$('.follow_text').html('<button class="dollarbt dollaricon" id="'+id+'">$ &nbsp;&nbsp</button><img src="./assets/img/unfollow.png" class="unfollow_img">Unfollow');
				// $('.follow_text').css('color', '#24e6bf');
				// $("#"+followid).css('color', '#24e6bf');
	
		    
				 $(id).data('follow','f')
				 $(id).html('<img  src="./assets/img/unfollow_20x20.png">Unfollow')
				} ,
	     error   : function (xhr, status, error)
                 {
				 console.log(xhr);
				 }						 
		});
}
	
}


