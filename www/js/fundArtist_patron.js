$(document).ready(function() {
$('#venmo-form').hide();


if(localStorage.getItem('fromGetArtist')=='true')
{
console.log(localStorage.getItem('fromartistname'));
$('.artist-name').text(localStorage.getItem('fromartistname'));
$('.artist_occupation').text(localStorage.getItem('fromarttype'));
//alert(localStorage.getItem('fromartistartid'));
localStorage.setItem('fromGetArtist' ,'false')

$.ajax({
	    type : 'GET',
	    url:localStorage.getItem('webserviceurl')+"artist/expense",
		contentType: "application/json",
		dataType: "json",
		async :'false',
		data : {
       artistID : localStorage.getItem('fromartistartid')
      },
	   success : function(data)
			    {
			//alert(data);
			var fundartistpdata = JSON.stringify(data);
			localStorage.setItem('fundartistpdata' ,fundartistpdata);
		
				
				loadprof();
				  
},error :function (xhr,status,error)
{
alert('error')
alert(xhr.status);
alert(xhr.responseText);
}
				  
});
}
else
{
//alert('else');
$('.artist-name').text(localStorage.getItem('fromartistname'));
//alert(localStorage.getItem('fromGetArtistID'));

$.ajax({
	    type : 'GET',
	    url:localStorage.getItem('webserviceurl')+"artist/expense",
		contentType: "application/json",
		dataType: "json",
		async :'false',
		data : {
       artistID : localStorage.getItem('fromGetArtistID')
      },
	   success : function(data)
			    {

				var fundartistpdata = JSON.stringify(data);
			localStorage.setItem('fundartistpdata' ,fundartistpdata);
				 
				loadprof();
				  
},error :function (xhr,status,error)
{
alert('error')
alert(xhr.status);
alert(xhr.responseText);
}
				  
});
}
$('.paid').bind('click',function(e){
//alert('monnii');
$('#venmo-form').show();
//$('.paid').toggleClass('notpaid');
});


$('.back-img').bind('click',function(e){
parent.history.back();
		return false;
  
});

$('#subform').bind('click',function(e){
$('#venmo-form').hide();
//$('.paid').toggleClass('paid');
});

});//end of document.ready


function loadprof()
{
//alert('loadprof');
  var parsedata =JSON.parse(localStorage.getItem('fundartistpdata'));
  //alert(parsedata);
  //alert(localStorage.getItem('fundartistpdata'));
  
	var total =0;
      if(parsedata.expenses.length !=0)
	  {	//alert('inside if ');

	//for(var i = 0 ;i <parsedata.expenses.length ;i++) 
	//{        
		$(parsedata.expenses).each(function(i,val){
		
		    total=total+ parseInt(val.amount) ;
		
		$('#dynamicdiv').append('<div class="row">\
		           <div class="col-xs-1">\
					</div>\
				    <div class="col-xs-10 top-border">\
				        <p class="rent-text"><img src="./assets/img/Rent.png" class="rent-img">'+val.expense+'</p>\
						<p class="rent-amt_patron">$'+val.amount+'</p>\
					</div>\
					<div class="col-xs-1">\
				    </div>\
				</div>\
				<div class="row">\
				    <div class="col-xs-1">\
					</div>\
				    <div class="col-xs-10 bottom-border">\
				        <p class="rent_comments">'+val.note+'</p>\
					</div>\
					<div class="col-xs-1">\
				    </div>\
				</div>');
		
		
		
		});
			
   $('.total-amt_number').html('$'+total);
	$( ".total-amt ").html(function() {
        var emphasis = "<span class='total-text'> Total </span>";
         return "<p>$"+total+" "+emphasis+"  </p>";
        });           
}


}