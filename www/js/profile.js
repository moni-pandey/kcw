$("document").ready(function() {
    //Complete sign up page is ready
    $(".patronblock").css({
        "display": "none"
    });
    var gpData = JSON.parse(localStorage.getItem("googlelogindata")) || '';
    $("#profilepic").attr("src", gpData.imageUrl || '');
    localStorage.setItem('usertype', 'artist');
});


function showPatronDetails() {
    //Method to display Patron Contents
    $("#patronbtn,.patronblock").css({
        "display": "block"
    });
    $("#artistbtn,.social-icons_side-padding,.artistblock").css({
        "display": "none"
    });
    $(".what-kind-of-art_text").text("What kind of art are you interested in");
    localStorage.setItem('usertype', 'patron');
}

function showArtistDetails() {
    //Method to display Artist Contents
    $("#patronbtn,.patronblock").css({
        "display": "none"
    });
    $("#artistbtn,.social-icons_side-padding,.artistblock").css({
        "display": "block"
    });
    $(".what-kind-of-art_text").text("What kind of artist");
    localStorage.setItem('usertype', 'artist');
}

function linkGoogleplus() {
    //Method to Link Google+ account to KCW

    if (checkConnection()) {
        window.plugins.googleplus.login({
                'scopes': 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.stream.read',
                'offline': true
            }, function(gpGrantPermissions) {
                //showAlert(gpGrantPermissions);
            },
            function(gpLoginError) {
                showAlert('gpLoginError: ' + gpLoginError);
            });
    } else showAlert("Please Connect to Internet to Login");
}

function linkInstagram() {
    // Method to Link Instagram account to KCW
    var instagramClientId = "2449c6ccef5e4d75ad8e5a0118797058";
    var redirect_uri = "http://localhost/callback/";
    if (checkConnection()) {
        if (localStorage.getItem('instagramtoken') == null)
            var instaWindow = openBrowser("https://api.instagram.com/oauth/authorize/?client_id=" + instagramClientId + "&redirect_uri=" + redirect_uri + "&response_type=token");
        else showAlert("You have already Linked Instagram");
    } else showAlert("Please Connect to Internet to Login");
    instaWindow.addEventListener('loadstart', function(event) {
        if ((event.url).indexOf(redirect_uri) === 0) {
            var instagramAccessToken = (event.url).split('#access_token=')[1] || '';
            if (instagramAccessToken !== null)
                localStorage.setItem('instagramtoken', instagramAccessToken);
            else
                showAlert("Couldn't Authenticate your Instagram account");
            instaWindow.close();
        }

    });
}

function linkVine() {
    // Method to Link Vine account with KCW
    if (localStorage.getItem('vinetoken') == null)
        var vineWindow = openBrowser("https://api.vineapp.com/users/authenticate");
    else showAlert("You have already Linked Vine");
    vineWindow.addEventListener('loadstart', function(event) {

    });
}

function linkYoutube() {
    //Method to Link Google account with KCW
    var youtubeClientId = "501230551806-lusrd2is8ch01tud3l8i2ecnmhdq9gk0.apps.googleusercontent.com";
    var redirect_uri = "http://localhost/oauth2callback";
    var youtubeScope = "https://www.googleapis.com/auth/youtube";
    if (checkConnection()) {
        if (localStorage.getItem('youtubetoken') == null)
            var youtubeWindow = openBrowser("https://accounts.google.com/o/oauth2/auth?client_id=" + youtubeClientId + "&redirect_uri=" + redirect_uri + "&response_type=code" + "&scope=" + youtubeScope);
        else showAlert("You have already Linked Youtube");
    } else showAlert("Please Connect to Internet to Login");
    youtubeWindow.addEventListener('loadstart', function(event) {
        if ((event.url).indexOf(redirect_uri) === 0) {
            var youtubeAccessToken = (event.url).split('#access_token=')[1] || '';
            if (youtubeAccessToken !== null)
                localStorage.setItem('youtubetoken', youtubeAccessToken);
            else
                showAlert("Couldn't Authenticate your Youtube account");
            youtubeWindow.close();
        }

    });
}

function takeMeHome() {
    //Method to Take the user to Profile Page 
    if (localStorage.getItem('usertype') == 'artist')
        window.location = "profile_Artist.html";
    else if (localStorage.getItem('usertype') == 'patron')
        window.location = "home1_Patron.html";
    else
        showAlert("Please select the usertype");
}
