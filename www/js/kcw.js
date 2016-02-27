/*var fbLoginSuccess = function(userData) {
    alert("UserInfo: " + JSON.stringify(userData));
}

var gpLoginSuccess=function(userData){
	alert(JSON.stringify(userData)); 
}

function fbLogin() {
    facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function(error) {
            alert("" + error);
        }
    );
}

function gpLogin() {
    window.plugins.googleplus.login({},gpLoginSuccess,
        function(msg) {
            alert('error: ' + msg);
        }
    );
}
*/
var gpLoginSuccess = function(userData) {
    alert(JSON.stringify(userData));
};

var fbLoginSuccess = function(userData) {
    localStorage.setItem('fbuserid', JSON.stringify(userData.authResponse.userID));
    //localStorage.setItem('fbdata',userData);
    fetchFBDetails();
};

function fetchFBDetails() {

    facebookConnectPlugin.api(localStorage.getItem('fbuserid') + "/?fields=id,email", ["user_birthday"],
        function(result) {
            alert("Result: " + JSON.stringify(result));
            /* alerts:
                {
                    "id": "000000123456789",
                    "email": "myemail@example.com"
                }
            */
        },
        function(error) {
            alert("Failed: " + JSON.stringify(error));
        });
}

function fbLogin() {
    //facebookConnectPlugin.browserInit(741117309366534);
    facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function(error) {
            alert("" + JSON.stringify(error));
        }
    );
    // facebookLogin(window.cordovaOauth, window.http);
}

function gpLogin() {
    window.plugins.googleplus.isAvailable(
        function(available) {
            if (available) {
                window.plugins.googleplus.login({}, gpLoginSuccess,
                    function(msg) {
                        alert('error: ' + msg);
                    }
                );
            } else alert("Sorry!Login via Google Plus is not available");
        }
    );

}
document.addEventListener('deviceready', function() {
    console.log("So this is a Mobile Device ;)");
    window.plugins.googleplus.isAvailable(
        function(available) {
            if (available) {
                alert("Google Plus available");
            }
        }
    );
});
