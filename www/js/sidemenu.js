$("document").ready(function() {

    sub = ''
    msgbody = ''
    flag = ''


    $(document).bind("deviceready", function() {
        var bodyEl = $('body'),
            navToggleBtn = bodyEl.find('.nav-toggle-btn');

        navToggleBtn.on('click', function(e) {
            bodyEl.toggleClass('active-nav');
            e.preventDefault();
        });
    });


    $('.back-img').click(function() {
        //alert('imageclicked');
        parent.history.back();
        return false;
    });



    $('a.mylink').click(goback);
    $('a.signout').click(cleardata);
    $('#tecbtn').bind('click', function() {

        sub = $('#subject').val();
        msgbody = $('#message').val();
        flag = 'S'
        sendQuery();
    });

    $('#contactbtn').bind('click', function() {

        sub = $('#subject').val();
        msgbody = $('#message').val();
        flag = 'C'
        sendQuery();
    });
    /* $(document).on('click', '.back-span',function(){
	alert('imageclicked');
	    parent.history.back();
		return false;
		
	});
	  */

    /*  $('.panel').on('hidden.bs.collapse', function (e) {
    alert('Event fired on #' + e.currentTarget.id);
})*/
    $('.panel').on('shown.bs.collapse', function(e) {
        console.log('Calling #' + e.target.id);
        console.log($('a[href="#' + e.target.id + '"]'));
        $('a[href="#' + e.target.id + '"]').find('img').attr('src', './assets/img/arrow-up.png')
    })
    $('.panel').on('hidden.bs.collapse', function(e) {
        console.log('Calling #' + e.target.id);
        console.log($('a[href="#' + e.target.id + '"]'));
        $('a[href="#' + e.target.id + '"]').find('img').attr('src', './assets/img/arrow_down.png')
    })

});


/*function changarrowkey(el)
		  {
			  alert('yo')
			if($(el).attr('aria-expanded')=='true')  
			{var img= $(this).find('img')
			img.attr('src', "./assets/img/arrow_up.png"); }
			  
		  }
		  */
function logout()
{
	//alert('clear')
	//localStorage.clear()
	window.location="index.html"
}
function cleardata() {
    //alert('')  ;
    localStorage.removeItem('lastloggeduser');
    console.log(localStorage.lastloggeduser)
        //window.location="index.html"

}

function goback() {
  
    parent.history.back();
    return false;
}


function rateus() {



    var customLocale = {};
    customLocale.title = "Rate KCW";
    customLocale.message = "If you enjoy using KCW, would you mind taking a moment to rate it? It will not take more than a minute. Thanks for your support!";
    customLocale.cancelButtonLabel = "No,Thanks";
    customLocale.laterButtonLabel = "Later";
    customLocale.rateButtonLabel = "Rate";
    AppRate.preferences.customLocale = customLocale;
    //$window.alert('moni');
    //AppRate.preferences.storeAppURL.android = 'market://details?id=1494980997481060';
    //AppRate.preferences.storeAppURL.ios = '<my_app_id>';
    //AppRate.preferences.storeAppURL.android = 'market://details?id=<package_name>';

    AppRate.promptForRating(true);

}

function sharewith() {
    //$window.alert("hi");

    //<button onclick="window.plugins.socialsharing.share('Message, image and link', null, 'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl')">message, image and link</button>
    //$window.plugins.socialsharing.share('Message, image and link', '..\assets\www\assets\img\foodie-Edition.png', 'http://www.logic-square.com');
    //$window.plugins.socialsharing.share('Message only');
    window.plugins.socialsharing.share('Message, subject, image and link', 'fun with kcw', 'data:image/jpeg;base64,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', 'http://www.logic-square.com')
}

function sendQuery() {

    var userdata = JSON.parse(localStorage.getItem('loggeduser'))
    var id = ''
    if (userdata.user.usertype === 'P') { // alert('if');
        id = userdata.user.patronID
    } else {
        id = userdata.user.artistID

    }



    $.ajax({
        type: 'POST',
        url: "http://payments.keepcitiesweird.com:5001/contactus/email",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            "body": msgbody,
            "subject": sub,
            "type": userdata.user.usertype,
            "id": id,
            "flag": flag

        }),
        success: function(data) {

            console.log(data);

            $('#subject').val(' ');
            $('#message').val(' ');
            navigator.notification.alert(
                'Email Sent', // message
                alertDismissed, // callback
                'KCW', // title
                'OK' // buttonName
            );

        },
        error: function(xhr, status, errorThrown) {
            //alert('Re-try login');
            //  alert(xhr.responseText);
            console.log(xhr.status);

            //console.log(error);
        }
    });



}

function bank_details()
{
/*	//1) check if details already present
	// yes- prefilled 
    // add new details  :: if prefilled update new details 	
	// 
	
	  $.ajax({
        type: 'POST',
        url: localStorage.getItem('webserviceurl')+"artist/bank/get",
        contentType: "application/json",
        dataType: "json",
        data: {
			"artistid":localStorage.getItem('loggedINuserartistid')
			
		},
        success: function(data) {

            console.log(data);


        },
        error: function(xhr, status, errorThrown) {
            //alert('Re-try login');
            //  alert(xhr.responseText);
            console.log(xhr.status);

            //console.log(error);
        }
    }); */
	var bankid ;
	var url;
	
	  $.post(localStorage.getItem('webserviceurl')+"artist/bank/get",
    {
        "artistid":localStorage.getItem('loggedINuserartistid')
    },
    function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
		console.log(data.data[0].accountnumber)
		//console.log(data.data.accountnumber)
		if(data.data.length)
		{
		
 $('#accountno').val(data.data[0].accountnumber) // required
$('#userbankname').val(data.data[0].bankname) // required
   $('#iifsccode').val(data.data[0].isfccode), // required
   $('#username').val(data.data[0].nameoncard) 

   $('#savebtn').data('bankid', data.data[0].bankid)
   $('#savebtn').data('way', 'update')
   console.log($('#savebtn').data('bankid'))
   console.log($('#savebtn').data('way'))
			
		}
			else{
				console.log('no records')
				
			}
    });
	
	
	
	
	
}

function edit_details()
{
	var bankid ;
	var url;
	  
	if($('#username').val().length==0 ||$('#accountno').val().length==0  || $('#userbankname').val().length==0  || $('#iifsccode').val().length==0  )
	{
		
		navigator.notification.alert(
                'All fields are mandatory', // message
                alertDismissed, // callback
                'KCW', // title
                'OK' // buttonName
            );
			
	}
	else if(!$.isNumeric($('#accountno').val()) || $('#accountno').val().length <16)
	{
		
		 navigator.notification.alert(
                'Enter valid account number', // message
                alertDismissed, // callback
                'KCW', // title
                'OK' // buttonName
            );
	}
	else
	{
		if($('#savebtn').data('way')=='save')
		{
			bankid=0
			url = ' http://107.170.201.114:5001/artist/bank/insert'
			
		}
		else{
			bankid= $('#savebtn').data('bankid')
			url=' http://107.170.201.114:5001/artist/bank/update'
			
		}
		save_details(bankid ,url)
		
	}
		
	

	
	
}
function save_details(bankid ,url)
{
	var d = { 
	"bankid":bankid, 
    "artistid":localStorage.getItem('loggedINuserartistid'), // required
    "accountnumber": parseInt($('#accountno').val()), // required
    "bankname":$('#userbankname').val(), // required
    "isfccode": $('#iifsccode').val(), // required
    "nameoncard": $('#username').val() // require
	
	}
		
		console.log(d) ;
		console.log(url) ;
		
/*	  $.ajax({
        type: 'POST',
        url: url ,
        contentType: "application/json",
        dataType: "json",
        data: {
	
	 "bankid":bankid, 
    "artistid":localStorage.getItem('loggedINuserartistid'), // required
    "accountnumber": parseInt($('#accountno').val()), // required
    "bankname":$('#userbankname').val(), // required
    "isfccode": $('#iifsccode').val(), // required
    "nameoncard": $('#username').val() // required
		},
        success: function(data) {

            console.log(data);


        },
        error: function(xhr, status, errorThrown) {
            //alert('Re-try login');
            //  alert(xhr.responseText);
            console.log(xhr.status);

            console.log(errorThrown);
        }
    });
	*/
	
	
$.post(url,
    {
         "bankid":bankid, 
    "artistid":localStorage.getItem('loggedINuserartistid'), // required
    "accountnumber": parseInt($('#accountno').val()), // required
    "bankname":$('#userbankname').val(), // required
    "isfccode": $('#iifsccode').val(), // required
    "nameoncard": $('#username').val() // required
    },
    function(data, status){
        console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
		
    });
	
}

function alertDismissed() {
    // do something
	return;
}
