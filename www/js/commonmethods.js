/*Common Methods-Begins*/
function checkConnection() {
    //Method to check Internet availablity

    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.NONE] = 'No network connection';
    if (states[networkState] == 'No network connection') {
        return false;
    } else {
        return true;
    }
}

function changeToPreviousPage() {
    if (localStorage.clickedButton != undefined) {
        if (localStorage.clickedButton == "feed") {
            debugger;
            /*$('.trending-btn,.artist-btn_active').css({
                "background-color": "transparent",
                "color": "white"
            });
            $('.feed-btn').css({
                "background-color": "rgb(36, 230, 191)",
                "color": "rgb(39, 48, 77)"
            });*/
            localStorage.temClickedButton = localStorage.clickedButton;
            //localStorage.removeItem("clickedButton");
            $('.feed-btn').trigger("click");
            console.warn("Feed clicked");
        } else if (localStorage.clickedButton == "trending") {
            debugger;
            /*$('.feed-btn,.artist-btn_active').css({
                "background-color": "transparent",
                "color": "white"
            });
            $('.trending-btn').css({
                "background-color": "rgb(36, 230, 191)",
                "color": "rgb(39, 48, 77)"
            });*/
            localStorage.temClickedButton = localStorage.clickedButton;
            //localStorage.removeItem("clickedButton");
            $('.trending-btn').trigger("click");
            console.warn("Trending clicked");
        } else if (localStorage.clickedButton == "artists") {
            debugger;
            $('.feed-btn,.trending-btn').css({
                "background-color": "transparent",
                "color": "white"
            });
            $('.artist-btn_active').css({
                "background-color": "rgb(36, 230, 191)",
                "color": "rgb(39, 48, 77)"
            });
            $('.artist-btn_active').trigger("click");
            /*if (localStorage.temClickedButton == undefined) {
                localStorage.clickedButton = localStorage.temClickedButton;
                localStorage.removeItem("temClickedButton");
            }*/
        }
    }
}

function showAlert(alertMsg) {
    //Method to show native Alerts

    navigator.notification.alert(alertMsg, function() {
        console.log("Ok Clicked");
    }, "KCW");
}

function openBrowser(url) {
    var corBrowser = cordova.InAppBrowser.open(url, '_blank', 'location=no');
    return corBrowser;
}
/*Common Methods-Ends*/
function setnav() {
    if ($("body").hasClass('active-nav'))
        $('.nav-toggle-btn').css({ "left": '200px' })
    else
        $('.nav-toggle-btn').css({ "left": '178px' })
}
$(function() {
    FastClick.attach(document.body);
});
/* $(window).scroll(function(){
    console.warn("scrolled");
    if($("body").hasClass('active-nav')){
        console.log("panel shown");
        $(".side_nav").toggle();
        $(".side_nav .nav-toggle-btn").show();
        //$('.nav-toggle-btn').css({"left":'178px'});
        //$("body").toggleClass('active-nav')
    }
 });*/
