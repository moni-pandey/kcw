$(document).ready(function() {

    var longituted_detected = ' ';
    var latitude_detected = ' '


    $(document).bind("deviceready", function() {
        //initiate_geolocation();
        document.addEventListener("backbutton", function() {
            console.log("Disabled Back button");
        });
    });

    $('.search').hide();
	if (localStorage.getItem('profileartist') == 'true') { 
	$('.artist-btn_active').html('');
	$('.artist-btn_active').html('Profile');
	
	}
	else{
			$('.artist-btn_active').html('');
	$('.artist-btn_active').html('Artists');

	}

    /*if(localStorage.crossicon == 'true')
    {
        
        if(localStorage.getItem('feedclicked')=='true')
        { localStorage.setItem('feedclicked' ,'false'); 
        window.location='home1_Patron.html'
    }
        else if(localStorage.getItem('trendclicked')=='true')
        {localStorage.setItem('trendclicked' ,'false');
           
            window.location='home3_Patron.html'
        }
        else
        window.location='home2_Patron.html'

    localStorage.crossicon = false 
    }*/
    $(document).on('click', '.feed-btn', function() {
        localStorage.setItem('feedclicked', 'true');
        localStorage.setItem('trendclicked', 'false');
        localStorage.clickedButton = "feed";
        window.location = 'home1_Patron.html'
    });

    $(document).on('click', '.trending-btn', function() {
        $('.feed-btn,.artist-btn_active').css({
            "background-color": "transparent",
            "color": "white"
        });
        $('.trending-btn').css({
            "background-color": "rgb(36, 230, 191)",
            "color": "rgb(39, 48, 77)"
        });
        localStorage.setItem('feedclicked', 'false');
        localStorage.setItem('trendclicked', 'true');
        localStorage.clickedButton = "trending";
        window.location = 'home3_Patron.html'
    });

    $(document).on('click', '.artist-btn_active', function() {
        localStorage.clickedButton = "artists";
        $('.feed-btn,.trending-btn').css({
            "background-color": "transparent",
            "color": "white"
        });
        $('.artist-btn_active').css({
            "background-color": "rgb(36, 230, 191)",
            "color": "rgb(39, 48, 77)"
        });
        localStorage.setItem('feedclicked', 'false');
        localStorage.setItem('trendclicked', 'false');
        if (localStorage.getItem('profileartist') == 'true') {
            //localStorage.setItem('profileartist', 'false')
            window.location = 'profile_Artist.html'

        } else
            window.location = 'home2_Patron.html'
    });

    $(document).on('click', '.search-icon', function() {

        $('.hideforsearch').hide();
        $('.search').css({ "visibility": "visible" });
        $('.search').css({ "display": "block" });
        $('.search').fadeIn('fast', function() {
            $('#enterartist').focus();
        });

    });

    /*   
         
 $(document).on('click','.fav-img' ,function(e){
      console.log('like');
    //  console.log(localStorage.getItem('crouselartid'));
      var id =  e.target.id;
      console.log(id);
      var nid= parseInt(id);
       $.ajax({
        type : 'POST',
        url: "http://128.199.252.61:5001/artist/art/like",
        contentType: "application/json",
        dataType: "json",
        data : JSON.stringify({
        "patronID" : localStorage.getItem('loggedINuserpatronid'),
        "artID"  :nid
    
         }),
         success : function(data)
                {
                if(data.message!='alreadyliked')
                      {
                      console.log('nliked')
                       var n = $('#likecounter').html();
                      console.log(n);
                      n++;
                      console.log(n);
                      $('#likecounter').val(n);
                      
                    }
                
                 
                 
                // $('.favcount img').removeClass('fav-img');
                 $('.favcount img').toggleClass('notfav-img');
                 
                 alert(data.message);
                } ,
         error   : function (xhr, status, error)
                 {console.log(xhr);}                         
        });
      
  
        

});


 $(document).on('click','.notfav-img' ,function(e){
      
       console.log('ulike');
      console.log(localStorage.getItem('crouselartid'));
       $.ajax({
        type : 'POST',
        url: "http://128.199.252.61:5001/artist/art/unlike",
        contentType: "application/json",
        dataType: "json",
        data : JSON.stringify({
        "patronID" : localStorage.getItem('loggedINuserpatronid'),
        "artID"  :e.target.id,
    
         }),
         success : function(data)
                {
                
            
                if(data.message!='alreadyliked')
                      {  var n = $('#likecounter').html;
                      n--;
                      $('#likecounter').html(n);}
                       $(e.target.id).toggleClass('fav-img');
                alert(data.message);
                
                } ,
         error   : function (xhr, status, error)
                 {console.log(xhr);}                         
        });

       });
       */

    $(document).on('click', '.fa-arrow-left', function() {
        $('#enterartist').val(' ');
        $('.search').hide();
        $('.hideforsearch').show();
        $(".fbbox").each(function() {
            if ($(this).hide())
                $(this).show();



        });
    });

    $(document).on('click', '.fa-times', function() {
        $('#enterartist').val(' ');
        $(".fbbox").each(function() {
            if ($(this).hide())
                $(this).show();
            $('#enterartist').focus();


        });

    });


    $(document).on("keyup", "#enterartist", function() {

        var g = $(this).val().toLowerCase();
        console.log(g);
        $(".fbbox .name-artist").each(function() {
            console.log('ooo')
            var s = $(this).text().toLowerCase();
            console.log(s);
            $(this).closest('.fbbox')[s.indexOf(g) !== -1 ? 'show' : 'hide']();
        });
    });

    $(document).on('click', '.share-img', function(e) {
        localStorage.setItem('fromfeedtrend', true);
        localStorage.setItem('getfeedtrend', e.target.id);
        var artid = parseInt(e.target.id)
        localStorage.setItem('crouselartid', artid)
        window.location = 'comment_Page_new.html'


    });

    //var id =parseInt(localStorage.getItem('loggedINuserpatronid'));
    /*if (localStorage.clickedButton != undefined) {
        if (localStorage.clickedButton == "feed") {
            debugger;
            initiate_geolocation();
            $('.trending-btn,.artist-btn_active').css({ "background-color": "transparent", "color": "white" });
            $('.feed-btn').css({ "background-color": "rgb(36, 230, 191)", "color": "rgb(39, 48, 77)" });
            localStorage.temClickedButton=localStorage.clickedButton;
            localStorage.removeItem("clickedButton");
            $('.feed-btn').trigger("click");
            console.warn("Feed clicked");
        } else if (localStorage.clickedButton == "trending") {
            debugger;
            $.ajax({
                type: 'GET',
                url: localStorage.getItem('webserviceurl') + "patron/trending",
                contentType: "application/json",
                dataType: "json",
                data: {
                    patronID: localStorage.getItem('loggedINuserpatronid'),
                    latitude: latitude_detected,
                    longitude: longituted_detected
                },
                success: function(data) {
                    console.log(data)
                        //alert(JSON.stringify(data));

                    //
                    $(data.artists).each(function(i, val) {
                        //alert('each');
                        $('.artistlistcontainer').append('<div class="row fbbox" id="' + val.artID + '">\
                    <div class="col-xs-12">\
                        <img src="' + decodeURIComponent(val.url) + '" width="647" height="408" class="img-responsive pic1">\
                        <img src="./assets/img/people-small.png" class="small-img" id="' + val.artistID + '" onclick="getprof(this)">\
                        <p class="name-artist" value="james" id="' + val.artistID + 'name" >' + val.name + '</p>\
                        <p class="name-occupation ' + val.artistID + 'type "  value="' + val.artType + '">' + val.artType + '</p>\
                        <p class="art-name">' + val.caption + '</p>\
                        <p class="art-type ">' + val.tag + '</p>\
                        <p class="fav-count" id="' + val.artID + 'fav"><img src="./assets/img/fav.png" class="fav-img" data-like="unlike" onclick="callLikeUnlike(this)" id="' + val.artID + 'img"> <span class="likeimg" id="' + val.artID + 'likecounter">' + val.likecount + '</span></p>\
                        <p class="share-count">' + val.commentcount + '</p>\
                        <img src="./assets/img/Comment.png"  class="share-img" id="' + val.artID + 'cmt">\
                    </div> \
                </div>');
                    });
                },
                error: function(xhr, status, error) { console.log(xhr); }
            });
            $('.feed-btn,.artist-btn_active').css({ "background-color": "transparent", "color": "white" });
            $('.trending-btn').css({ "background-color": "rgb(36, 230, 191)", "color": "rgb(39, 48, 77)" });
            localStorage.temClickedButton=localStorage.clickedButton;
            localStorage.removeItem("clickedButton");
            $('.trending-btn').trigger("click");
            console.warn("Trending clicked");
        } else if (localStorage.clickedButton == "artists") {
            debugger;
            $('.feed-btn,.trending-btn').css({ "background-color": "transparent", "color": "white" });
            $('.artist-btn_active').css({ "background-color": "rgb(36, 230, 191)", "color": "rgb(39, 48, 77)" });
            localStorage.temClickedButton=localStorage.clickedButton;
            localStorage.removeItem("clickedButton");
            $('.artist-btn_active').trigger("click");
        }
    }*/

    if (localStorage.getItem('feedclicked') == 'true') {
        // background-color: #24e6bf;
        initiate_geolocation();

        $('.feed-btn').css({ "background-color": "#24e6bf" })
        $('.feed-btn').css({ "color": "#27304d" })

        $('.artist-btn_active').css({ "background-color": "transparent" })
        $('.artist-btn_active').css({ "color": "white" })

        $('.trending-btn').css({ "background-color": "transparent" })
        $('.trending-btn').css({ "color": "white" })



    } else if(localStorage.trendclicked=="true") {

        console.log('trending');
        $('.feed-btn').css({ "background-color": "transparent" })
        $('.feed-btn').css({ "color": "white" })

        $('.artist-btn_active').css({ "background-color": "transparent" })
        $('.artist-btn_active').css({ "color": "white" })

        $('.trending-btn').css({ "background-color": "#24e6bf" })
        $('.trending-btn').css({ "color": "#27304d" })

        $.ajax({
            type: 'GET',
            url: localStorage.getItem('webserviceurl') + "patron/trending",
            contentType: "application/json",
            dataType: "json",
            data: {
                patronID: localStorage.getItem('loggedINuserpatronid'),
                latitude: latitude_detected,
                longitude: longituted_detected
            },
            success: function(data) {
                console.log(data)
                    //alert(JSON.stringify(data));

                //
                $(data.artists).each(function(i, val) {
                    //alert('each');
                    $('.artistlistcontainer').append('<div class="row fbbox" id="' + val.artID + '">\
                        <div class="col-xs-12">\
                            <div class="fixedBlock"><img src="' + decodeURIComponent(val.url) + '" width="647" height="408" class="img-responsive pic1">\
                           \
						   <div class="bgGrouper" >\
						   <div class="bgGclick" style="width:80%" onclick="getprof(this)" id="' + val.artistID + '">\
						   \
						   <img src="./assets/img/people-small.png" class="small-img">\
                            <div class="fixedBlockRight"><p class="name-artist" value="james" id="' + val.artistID + 'name" >' + val.name + '</p>\
                            <p class="name-occupation ' + val.artistID + 'type "  value="' + val.artType + '">' + val.artType + '</p></div>\
							</div>\
							<div class="fixedright" style="width:20%" id="' + val.artID + '" data-url="'+ decodeURIComponent(val.url) +'"  onclick="sharepic(this)"  >\
						<i class="fa fa-share-alt trend" ></i>\
						</div>\
							</div>\
							<div class="bottomGrouper">\
							<div style="float:left">\
                            <p class="art-name">' + val.caption + '</p>\
							</br>\
                            <p class="art-type ">' + val.tag + '</p>\
							</div>\
							<div style="float:right">\
                            <p class="fav-count" id="' + val.artID + 'fav"><img src="./assets/img/fav.png" class="fav-img" data-like="unlike" onclick="callLikeUnlike(this)" id="' + val.artID + 'img"> <span class="likeimg" id="' + val.artID + 'likecounter">' + val.likecount + '</span></p>\
                            <div class="share-count"><p>' + val.commentcount + '</p></div>\
                            <img src="./assets/img/Comment.png"  class="share-img" id="' + val.artID + 'cmt">\
							</div>\
							</div>\
                        </div></div> \
                    </div>');




                });
            },
            error: function(xhr, status, error) { console.log(xhr); }
        });



    }






    /*if(localStorage.temClickedButton==undefined){
        localStorage.clickedButton=localStorage.temClickedButton;
        localStorage.removeItem("temClickedButton");
    }*/



}); //end of document ready 



function initiate_geolocation() {
    //alert('inside geo loc')

    //var options = {maximumAge: 0, timeout: 10000, enableHighAccuracy:false};
    navigator.geolocation.getCurrentPosition(handle_geolocation_query, handle_errors);
}

function handle_errors(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showAlert("user did not share geolocation data");
            break;

        case error.POSITION_UNAVAILABLE:
            showAlert("could not detect current position");
            break;

        case error.TIMEOUT:
            showAlert("retrieving position timed out");
            break;

        default:
            showAlert("unknown error");
            break;
    }
}

function handle_geolocation_query(position) {

    // alert('Lat: ' + position.coords.latitude +
    //   ' Lon: ' + position.coords.longitude);

    longituted_detected = position.coords.longitude;
    latitude_detected = position.coords.latitude;

    if (localStorage.getItem('feedclicked') == 'true') {

        getfeed();
    }

    //location_fetched = position.coords.latitude + ',' + position.coords.longitude ;
    // alert(location);
    //alert('calling imoprtart');
    // importart();
}




function getfeed() {

    // alert(latitude_detected);
    // alert(longituted_detected);

    $.ajax({
        type: 'GET',
        url: localStorage.getItem('webserviceurl') + "patron/feed",
        contentType: "application/json",
        data: {
            "patronID": localStorage.getItem('loggedINuserpatronid'),
            "latitude": latitude_detected,
            "longitude": longituted_detected
        },
        success: function(data) {

            //alert(data);
            console.log(JSON.stringify(data));
            //alert(JSON.stringify(data));

            //alert(response);
            //alert(response.artists);
            //alert(data.artists);
            $(data.artists).each(function(i, val) {
              

                $('.artistlistcontainer').append('<div class="row fbbox" id="' + val.artID + '">\
                    <div class="col-xs-12">\
                        <div class="fixedBlock"><img src="' + decodeURIComponent(val.url) + '" width="647" height="408" class="img-responsive pic1">\
                        <div class="bgGrouper" >\
						   <div class="bgGclick" style="width:80%" onclick="getprof(this)" id="' + val.artistID + '">\
						   \
						   <img src="./assets/img/people-small.png" class="small-img">\
                            <div class="fixedBlockRight"><p class="name-artist" value="james" id="' + val.artistID + 'name" >' + val.name + '</p>\
                            <p class="name-occupation ' + val.artistID + 'type "  value="' + val.artType + '">' + val.artType + '</p></div>\
							</div>\
							<div class="fixedright" style="width:20%" id="' + val.artID + '" data-url="'+ decodeURIComponent(val.url) +'" onclick="sharepic(this)"  >\
						<i class="fa fa-share-alt trend" ></i>\
						</div>\
							</div>\
						<div class="bottomGrouper">\
						<div style="float:left"> \
                        <p class="art-name">' + val.caption + '</p>\
						</br>\
                        <p class="art-type ">' + val.tag + '</p>\
						</div>\
						<div style="float:right"> \
                        <p class="fav-count" id="' + val.artID + 'fav"><img src="./assets/img/fav.png" class="fav-img" data-like="unlike" onclick="callLikeUnlike(this)" id="' + val.artID + 'img"> <span class="likeimg" id="' + val.artID + 'likecounter">' + val.likeCount + '</span></p>\
                        <div class="share-count"><p>' + val.commentcount + '</p></div>\
                        <img src="./assets/img/Comment.png"  class="share-img" id="' + val.artID + 'cmt">\
						</div>\
						</div>\
                    </div></div> \
                </div>');
                //localStorage.setItem('feedclicked', 'false');

            });

        },
        error: function(xhr, status, error) {
            console.log(xhr);


        }
    });



}

function sharepic(even)
{
	var id = $(even).attr("id")

   var url = $(even).data('url')	
  
   window.plugins.socialsharing.share( localStorage.getItem('loggedINusername')+' wants to share this artwork',null, url , null);
}

function callLikeUnlike(artid) {
    console.log(artid)
    var imgartid = $(artid).attr("id")

    var likeartid = parseInt(imgartid)
    var countimg = likeartid + 'likecounter'
    console.log(likeartid)

    if ($(artid).data("like") == 'liked') {
        console.log('liked : calling unlike api ')
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('webserviceurl') + "artist/art/unlike",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "patronID": localStorage.getItem('loggedINuserpatronid'),
                "artID": likeartid
            }),
            success: function(data) {

                //  alert(JSON.stringify(data));

                var noOflikes = $('#' + countimg).text()
                if (noOflikes == '0') {
                    console.log('zerolikes');
                } else {
                    $(artid).data("like", 'unlike')
                    noOflikes--;
                    $('#' + countimg).text(noOflikes);
                }


            },
            error: function(xhr, status, error) { console.log(xhr); }
        });
    } else {
        console.log('notlike')
        $.ajax({
            type: 'POST',
            url: localStorage.getItem('webserviceurl') + "artist/art/like ",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                "patronID": localStorage.getItem('loggedINuserpatronid'),
                "artID": likeartid
            }),
            success: function(data) {

                // alert(JSON.stringify(data));

                $(artid).data('like', 'liked')
                var noOflikes = $('#' + countimg).text()
                noOflikes++;
                $('#' + countimg).text(noOflikes);
            },
            error: function(xhr, status, error) { console.log(xhr); }
        });

    }

}

function getprof(id) {
    var imgartid = $(id).attr("id")
    var nameid = imgartid + 'name'
    var artistname = $('#' + nameid).text();
    localStorage.setItem('fromartistname', artistname)
    localStorage.setItem('loggedINuserartistid', imgartid);
    localStorage.setItem('fromGetArtistID', imgartid),
        localStorage.frmfeed = true
    window.location = "profile_Patron.html"




}

function getproffe(id) {
    var imgartid = $(id).attr("id")
    var nameid = imgartid + 'name'
    var artistname = $('#' + nameid).text();
    localStorage.setItem('fromartistname', artistname)
    localStorage.setItem('loggedINuserartistid', imgartid);
    localStorage.setItem('fromGetArtistID', imgartid),
        localStorage.frmtrnd = true
    window.location = "profile_Patron.html"




}
