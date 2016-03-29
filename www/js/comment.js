$("document").ready(function() {
var comment ='';
//alert(localStorage.getItem('crouselartid')
if(localStorage.getItem('fromfeedtrend')=='true')
{
//localStorage.getItem('fromfeedtrend','false');
console.log('calling getArt');

 getArtComments();
}
else{


getcomments(); } 

	  $('.cross-icon').click(function(){
	if(localStorage.getItem('fromartistprof')=='true')
	{
		localStorage.setItem('fromartistprof' ,'false')
		localStorage.crossclicked = true
	  history.back()
	  }
else
	window.location='home1_Patron.html'
    

		//return false;
	}); 


   $('#commentbox').on('change', function () {
    comment = $("#txtYear").val();

    console.log(comment)
})
   
$('.send-icon').bind('click', function(){
comment = $('#commentbox').val();
console.log('cmnt send')
console.log(localStorage.getItem('crouselartid'));
console.log(comment);

       var userdata =JSON.parse(localStorage.getItem('loggeduser'))
	   if(userdata.user.usertype=='A')
		   var reqID = userdata.user.artistID
	   else
		   var reqID = userdata.user.patronID
	   
$.ajax({
	    type : 'POST',
	    url: localStorage.getItem('webserviceurl')+"artist/art/comment",
		contentType: "application/json",
	    dataType: "json",
		data : JSON.stringify({
		"id" : reqID,
        "artID"  :localStorage.getItem('crouselartid'),
        "comment":comment,
		 "type" : userdata.user.usertype,
         }),
	     success : function(data)
			    {
				console.log(data);
$('.showComments').html(' ');
$('#commentbox').val(' ');
				getcomments(); 
				} ,
	     error   : function (xhr, status, error)
                 {console.log(xhr);}						 
		});


});
   
   
   
   





 });
    function toSeconds(time_str) {
    var parts = time_str.split(':');
    return parts[0] * 3600 + 
    parts[1] * 60 + 
    +
    parts[2];
}

var timeSince = function(date) {
console.log('date sent');
console.log(date);
    if (typeof date !== 'object') {
        date = new Date(date);
		console.log('if');
		console.log(date);
    }
console.log(new Date())
    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
				console.log(interval)
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's';
    }

    return interval + ' ' + intervalType;
}



function getcomments()
{ 
	$.ajax({
						type : 'GET',
						url: localStorage.getItem('webserviceurl')+"artist/art/comments",
						contentType: "application/json",
						dataType: "json",
						data : {
					//	"artID" : '20' // for demo purpose cuz comment are avalable for artID 20
					"artID" :localStorage.getItem('crouselartid') //(uncomment befor production)
					  },
					   success : function(data)
								{
							//alert('sucess');
							//alert(data);
							$(data.comments).each(function(i,val){
							   
							        var url = decodeURIComponent(val.profilePicURL);
									var ret = val.createdon.split(" ");
									var commentdate = ret[0];
									console.log(i);
								
									var commenttime = ret[1];
									var agotime = timeSince(val.createdon);
									
										 
							$('.showComments').append('<div class="row top-spacing">\
				                       <div class="col-xs-2">\
				                        <img src="./assets/img/profile-images.png">\
				                       </div> <div class="col-xs-10">\
										<img src="./assets/img/chat_box.png" alt="" class="img-responsive" class="chat_box">\
										<h6 class="couple-name_position">'+val.name+'<span class="msg-posted_time">\
										<img style="display:none" src="./assets/img/time.png" alt="clock" class="msg-posted-time_pic"> '+agotime+ ' ago</span></h6>\
										<h6 class="wishing-text">'+val.comment+'</h6>\
				                       </div></div>');
							
							});	 
						
						/*	//dont have valid url for patron7 so commented this for demo purpose // uncomment later									
							$('.showComments').append('<div class="row top-spacing">\
				                       <div class="col-xs-2">\
				                        <img src="'+url+'">\
				                       </div> <div class="col-xs-10">\
										<img src="./assets/img/chat_box.png" alt="" class="img-responsive" class="chat_box">\
										<h6 class="couple-name_position">'+val.name+'<span class="msg-posted_time">\
										<img src="./assets/img/time.png" alt="clock" class="msg-posted-time_pic"> '+hoursdiff+ 'hours ago</span></h6>\
										<h6 class="wishing-text">'+val.comment+'</h6>\
				                       </div></div');
							
							});	 */
							
							


							 
						},error :function (xhr,status,error)
						{
						alert('error')
						alert(xhr.status);
						alert(xhr.responseText);
						}
										  
						});
   

}




function getArtComments()
{  console.log(localStorage.getItem('getfeedtrend'));
	$.ajax({
						type : 'GET',
						url: localStorage.getItem('webserviceurl')+"artist/art/comments",
						contentType: "application/json",
						dataType: "json",
						data : {
						//"artID" : '20' // for demo purpose cuz comment are avalable for artID 20
					"artID" :localStorage.getItem('crouselartid') 
					  },
					   success : function(data)
								{
							//alert('sucess');
							console.log(data);
							$(data.comments).each(function(i,val){
							   
							        var url = decodeURIComponent(val.profilePicURL);
									var ret = val.createdon.split(" ");
									var commentdate = ret[0];
									console.log(i);
									
									var commenttime = ret[1];
									var agotime = timeSince(val.createdon);
									
										 
							$('.showComments').append('<div class="row top-spacing">\
				                       <div class="col-xs-2">\
				                        <img src="./assets/img/profile-images.png">\
				                       </div> <div class="col-xs-10">\
										<img src="./assets/img/chat_box.png" alt="" class="img-responsive" class="chat_box">\
										<h6 class="couple-name_position">'+val.name+'<span class="msg-posted_time">\
										<img src="./assets/img/time.png" alt="clock" class="msg-posted-time_pic"> '+agotime+ ' ago</span></h6>\
										<h6 class="wishing-text">'+val.comment+'</h6>\
				                       </div></div');
							
							});	 
						
						/*	//dont have valid url for patron7 so commented this for demo purpose // uncomment later									
							$('.showComments').append('<div class="row top-spacing">\
				                       <div class="col-xs-2">\
				                        <img src="'+url+'">\
				                       </div> <div class="col-xs-10">\
										<img src="./assets/img/chat_box.png" alt="" class="img-responsive" class="chat_box">\
										<h6 class="couple-name_position">'+val.name+'<span class="msg-posted_time">\
										<img src="./assets/img/time.png" alt="clock" class="msg-posted-time_pic"> '+hoursdiff+ 'hours ago</span></h6>\
										<h6 class="wishing-text">'+val.comment+'</h6>\
				                       </div></div');
							
							});	 */
							
							


							 
						},error :function (xhr,status,error)
						{
						alert('error')
						alert(xhr.status);
						alert(xhr.responseText);
						}
										  
						});
   

}