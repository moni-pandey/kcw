$(document).ready(function() {

localStorage.setItem('webserviceurl' ,'http://107.170.201.114:5001/')
localStorage.setItem('fbicon' ,'false');
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



//localStorage.setItem('webserviceurl', '');


// Social Media based Login Methods-Begins
var gpLoginSuccess = function(gpUserData) {
    //Success Method of Google Login
    localStorage.setItem('googlelogindata', JSON.stringify(gpUserData));
	alert(JSON.stringify(gpUserData));
	alert(JSON.stringify(gpUserData.oauthToken));
    //window.location = "signUp_Artist.html";
};

var fbLoginSuccess = function(fbUserData) {
    //Success Method of Facebook Login
    //alert('inside fbloginsucess');
    console.log(JSON.stringify(fbUserData.authResponse));
    localStorage.setItem('fbuserid', fbUserData.authResponse.userID);
    fetchFBDetails();
	
   // alert('fetched details //call signup');
	//socialMediaSignUp()

};

function fetchFBDetails() {
    //Method to Extract Data from Facebook after Login
    /**added name parameter ,reuired for signin/login api included picture**/
    facebookConnectPlugin.api("/me?fields=email,name,picture", ['public_profile' ,"user_photos"],
        function(fbPermissions) {
            showAlert("fbPermissions: " + JSON.stringify(fbPermissions));
            localStorage.setItem('socialMediaEmailFB', fbPermissions.email);
            localStorage.setItem('socialMediaNameFB', fbPermissions.name);
            localStorage.setItem('facebooklogindata', JSON.stringify(fbPermissions));//Saved facebook data in LS on Jan8th
            localStorage.setItem('fbicon','true');
			//alert(localStorage.getItem('smid'));
			//alert(localStorage.getItem('smid'));
			if(localStorage.getItem('smartistid'))
			{
            localStorage.setItem('loggedINuserartistid' ,localStorage.getItem('smartistid'))
            window.location = "profile_Artist.html";			
			}
			else {window.location = "signUp_Artist.html";}
			
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
    /* if (localStorage.getItem('fbuserid') === null || localStorage.getItem('fbuserid') === " ") {
         if (checkConnection()) {
             facebookConnectPlugin.login(["public_profile", "email"],
                 fbLoginSuccess,
                 function(fbLoginError) {
                     showAlert("fbLoginError" + JSON.stringify(fbLoginError));
                 });
         } else showAlert("Please Connect to Internet to Login");

     } else {
         logIn();
         alert('fblogin else');

     }*/
}

function gpLogin() {
    if (checkConnection()) {
        window.plugins.googleplus.login({
			
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
    window.location = "signUp_Artist.html";
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
          // alert(JSON.stringify(data));
          // alert(data.message);
            console.log(data);
            console.log(data.user.usertype);
            //alert(data.user.artistID)
            console.log(data.user.artistID);
            //alert(data.user.patronID);
            localStorage.setItem('loggedINusertype', data.user.usertype);
            localStorage.setItem('loggedINusercity', data.user.city);

            localStorage.setItem('loggedINuserartistType', data.user.artistType);
            localStorage.setItem('loggedINuserprofilepicurl', data.user.profilePicURL);
            localStorage.setItem('loggedINusername', data.user.name);
            if (localStorage.getItem('loggedINusertype') == 'P')
                localStorage.setItem('loggedINuserpatronid', data.user.patronID);
            else
                localStorage.setItem('loggedINuserartistid', data.user.artistID);

            //alert(localStorage.getItem('loggedINuserartistid'));
            loadprofile();

        },
        error: function(xhr, status, errorThrown) {
            alert(xhr.status);
            alert(xhr.responseText);
            console.log(xhr.status);

            //console.log(error);
        }
    });


}

function logIn() {
  alert('moni login');


    //alert('inside if)');
    $.ajax({
        type: 'POST',
        url: "http://128.199.252.61:5001/user/signin",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
            linkedAcctType: "F",
            smAcctID: localStorage.getItem('fbuserid'),
            email: localStorage.getItem('socialMediaEmailFB'),
            password: ''

        }),
        success: function(data) {
          //  alert(JSON.stringify(data));
           // alert(data.message);
            console.log(data);
            console.log(data.user.usertype);
            //alert(data.user.artistID)
            console.log(data.user.artistID);
            //alert(data.user.patronID);
            localStorage.setItem('loggedINusertype', data.user.usertype);
            localStorage.setItem('loggedINusercity', data.user.city);

            localStorage.setItem('loggedINuserartistType', data.user.artistType);
            localStorage.setItem('loggedINuserprofilepicurl', data.user.profilePicURL);
            localStorage.setItem('loggedINusername', data.user.name);
            //alert(localStorage.getItem('loggedINusertype'));
            if (localStorage.getItem('loggedINusertype') == 'P')
                localStorage.setItem('loggedINuserpatronid', data.user.patronID);
            else
                localStorage.setItem('loggedINuserartistid', data.user.artistID);

            //alert(localStorage.getItem('loggedINuserartistid'));
            loadprofile();

        },
        error: function(xhr, status, errorThrown) {
            alert(xhr.status);
            alert(xhr.responseText);
            console.log(xhr.status);

            //console.log(error);
        }
    });





}

function loadprofile() { //calling getexp




    if (localStorage.getItem('loggedINusertype') === 'P') { // alert('if');
        $('#patronname').text(localStorage.getItem('loggedINusername'));
        window.location = "home2_Patron.html";
    } else {
        //alert('else');
        window.location = "profile_Artist.html";

    }

}

//});
