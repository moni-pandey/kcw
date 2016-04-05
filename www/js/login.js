$(document).ready(function() {

  linkedAcctTypesocial =''
localStorage.setItem('webserviceurl' ,'http://107.170.201.114:5001/')
//localStorage.setItem('webserviceurl' ,'http://payment.keepcitiesweird.com:5001/')

    /** Email Login */
    $('#logINbtn').bind('click', function() {
        if ($("#indexusername").val() == "") {
            showAlert("Please Enter your User name");
            $("#indexusername").focus();
        } else if ($("#indexpass").val() == "") {
            showAlert("Please Enter your Password");
            $("#indexpass").focus();
        } else {
            localStorage.setItem('indexusername', $('#indexusername').val());
            localStorage.setItem('indexpass', $('#indexpass').val());
            logEIn();
        }
    });
});


// Social Media based Login Methods-Begins
var gpLoginSuccess = function(gpUserData) {
    //Success Method of Google Login
	localStorage.gpemail=gpUserData.email
	linkedAcctTypesocial ='G'
    localStorage.setItem('googlelogindata', JSON.stringify(gpUserData));
	        localStorage.setItem('icon','gp');
            localStorage.setItem('mediaicon','true');
	//alert(JSON.stringify(gpUserData));
	
	  checkalreadyregisterd()
	

};

var fbLoginSuccess = function(fbUserData) {
   
    console.log(JSON.stringify(fbUserData.authResponse));
    localStorage.setItem('fbuserid', fbUserData.authResponse.userID);
    localStorage.setItem('fbaccesstoken', fbUserData.authResponse.accessToken);
	//alert(localStorage.getItem('fbaccesstoken'))
    fetchFBDetails();
	
   // alert('fetched details //call signup');
	//socialMediaSignUp()

};

function fetchFBDetails() {
    //Method to Extract Data from Facebook after Login
    /**added name parameter ,reuired for signin/login api included picture**/
    facebookConnectPlugin.api("/me?fields=email,name,picture", ['public_profile' ,"user_photos"],
        function(fbPermissions) {
           // showAlert("fbPermissions: " + JSON.stringify(fbPermissions));
           
            localStorage.setItem('facebooklogindata', JSON.stringify(fbPermissions));//Saved facebook data in LS on Jan8th
			localStorage.setItem('lastloggeduser','')
            localStorage.setItem('lastloggeduser', JSON.stringify(fbPermissions));//Saved facebook data in LS on Jan8th
            localStorage.setItem('icon','fb');
            localStorage.mediaicon=true
linkedAcctTypesocial ='F'
localStorage.gpemail =fbPermissions.email
checkalreadyregisterd()
	
        },
        function(fetchFBDetailsError) {
            alert("fetchFBDetailsError: " + JSON.stringify(fetchFBDetailsError));
        }


    );
}

function fbLogin() {
    if (checkConnection()) {
        facebookConnectPlugin.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                localStorage.fbuserid = response.authResponse.userID;
                localStorage.fbaccesstoken = response.authResponse.accessToken;
				
                fetchFBDetails();
            } else if (response.status === 'not_authorized') {
                facebookConnectPlugin.login(["public_profile", "email"], function(userData) {
                        fbLoginSuccess(userData)
                    },
                    function(fbLoginError) {
                        showAlert("fbLoginError" + JSON.stringify(fbLoginError));
                    });
            } else {
                facebookConnectPlugin.login(["public_profile", "email"], function(userData) {
                        fbLoginSuccess(userData)
                    },
                    function(fbLoginError) {
                        showAlert("fbLoginError" + JSON.stringify(fbLoginError));
                    });
            }
        }, function(data) {
            console.warn(data);
        });
    } else showAlert("Please Connect to Internet to Login");
  
}

function gpLogin() {
    if (checkConnection()) {
        window.plugins.googleplus.login({
			'offline': true,
			'scopes': 'email'
			
            }, gpLoginSuccess,
            function(gpLoginError) {
                showAlert('gpLoginError: ' + gpLoginError);
            });
    } else showAlert("Please Connect to Internet to Login");
}

function twitterLogin() {
    // To Integrate Twitter Login
    console.log("Clicked Twitter Button");
    TwitterConnect.login(
        function(result) {
            console.log('Successful login!');
            localStorage.setItem('twitterlogindata', JSON.stringify(result));
			localStorage.setItem('lastloggeduser','')
			localStorage.setItem('lastloggeduser',JSON.stringify(result))
			// lastloggeduser = JSON.stringify(result)
			console.log(JSON.stringify(result))
			localStorage.setItem('icon','twitter');
            localStorage.mediaicon=true
              linkedAcctTypesocial ='T'
            localStorage.gpemail =result.userName
		checkalreadyregisterd();
			
    //window.location = "signUp_Artist.html";
        },
        function(error) {
            console.log('Error logging in');
            console.log(error);
        }
    );
    console.log("Twitter Method end");
}

function logEIn() {

   // alert('moni Email login');
    $.ajax({
        type: 'POST',
        url: localStorage.getItem('webserviceurl')+"user/signin",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            linkedAcctType: "E",
            smAcctID: "",
            email: localStorage.getItem('indexusername'),
            password: localStorage.getItem('indexpass')

        }),
        success: function(data) {
        
			if(data.message=='success')
			{
							var loggeduser = JSON.stringify(data)
			//var lastloggeduser = JSON.stringify(data)
			localStorage.setItem('loggeduser',loggeduser);
		    localStorage.setItem('lastloggeduser','')
			localStorage.setItem('lastloggeduser',loggeduser);
            console.log(data.user.usertype);
            
            console.log(data.user.artistID);
           
            localStorage.setItem('loggedINusertype', data.user.usertype);
          //  localStorage.setItem('loggedINusercity', data.user.city);

            //localStorage.setItem('loggedINuserartistType', data.user.artistType);
            //localStorage.setItem('loggedINuserprofilepicurl', data.user.profilePicURL);
         //   localStorage.setItem('loggedINusername', data.user.name);
            if (localStorage.getItem('loggedINusertype') == 'P')
                localStorage.setItem('loggedINuserpatronid', data.user.patronID);
            else
                localStorage.setItem('loggedINuserartistid', data.user.artistID);

            //alert(localStorage.getItem('loggedINuserartistid'));
            loadprofile();
				
			}else
			{
				
				$("#indexpass").val(' ')
		$("#indexusername").val(' ')
				showAlert(data.message)
				return;
			}


        },
        error: function(xhr, status, errorThrown) {
            alert('Re-try login');
          //  alert(xhr.responseText);
            console.log(xhr.status);

            //console.log(error);
        }
    });


}



function loadprofile() { //calling getexp




    if (localStorage.getItem('loggedINusertype') === 'P') { // alert('if');
      //  $('#patronname').text(localStorage.getItem('loggedINusername'));
        window.location = "home2_Patron.html";
    } else {
        //alert('else');
		
		//$('#patronname').text(localStorage.getItem('loggedINusername'));
        window.location = "profile_Artist.html";

    }

}

//});


function checkalreadyregisterd()
{
	
 $.ajax({
        type: 'POST',
        url: localStorage.getItem('webserviceurl')+"user/exists",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            linkedAcctType: linkedAcctTypesocial,
           email: localStorage.gpemail
            

        }),
        success: function(data) {
          
          console.log(data);
		  if(data.user)
		  {
			//  var fbdata =   JSON.stringify(data.user)
			 //console.log(fbdata)
			 localStorage.setItem('loggedINusertype' ,data.user.usertype)
			 localStorage.setItem('loggedINusername',data.user.name)
			  if (localStorage.getItem('loggedINusertype') == 'P')
				  
                localStorage.setItem('loggedINuserpatronid', data.user.patronID);
            else
			{ localStorage.setItem('loggedINuserartistid', data.user.artistID);}
			
			 loadprofile();
				 localStorage.mediaicon=false
			  
		  }
		  else
			 window.location = "signUp_Artist.html"

        },
        error: function(xhr, status, errorThrown) {
            alert('Re-try login');
          //  alert(xhr.responseText);
            console.log(xhr.status);
localStorage.mediaicon=false
            //console.log(error);
        }
    });
	
	
	
	
}

