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
       artistID : localStorage.getItem('fromGetArtistID')
      },
	   success : function(data)
			    {
			//alert(data);
			var fundartistpdata = JSON.stringify(data);
			localStorage.setItem('fundartistpdata' ,fundartistpdata);
		
				console.log(data)
				loadprof(data);
				  
},error :function (xhr,status,error)
{
showAlert('error')
showAlert(xhr.status);
showAlert(xhr.responseText);
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
				 console.log(data)
				loadprof(data);
				  
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
$('#payexp').on('click',function(e){
         
	//go to payment page 
window.location="payment_Page.html"
  
});  

$('#subform').bind('click',function(e){
$('#venmo-form').hide();
//$('.paid').toggleClass('paid');
});

});//end of document.ready


function loadprof(parsedata)
{
//alert('loadprof');
 // var parsedata =JSON.parse(localStorage.getItem('fundartistpdata'));
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


function submitform() {
	//alert('clicked')
	 var $form = $('#payment-form');
  $form.submit(function(event) {
    // Disable the submit button to prevent repeated clicks:
   $form.find('.submit').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });
}

function stripeResponseHandler(status, response) {
  // Grab the form:
  var $form = $('#payment-form');

  if (response.error) { // Problem!
   showAlert(response.error.message)
    // Show the errors on the form:
   // $form.find('.payment-errors').text(response.error.message);
  $form.find('.submit').prop('disabled', false); // Re-enable submission

  } else { // Token was created!
       
    // Get the token ID:
    var token = response.id;
	console.log(token)
  // showAlert(token)
   
    // Insert the token ID into the form so it gets submitted to the server:
  
	makepay(response.id)
  }
  
};
function gotoo()
{
 window.location="home2_Patron.html"
	
}
function makepay(v)
{
	  var $form = $('#payment-form');
	  
	$.ajax({
	    type : 'POST',
	    url : localStorage.getItem('webserviceurl')+"paymentconfirm",
		contentType: "application/json",
		dataType: "json",

		data:JSON.stringify({ 
		token:v,
		amount: parseInt($('#chargedamt').val()),
		desc: "Description of  transaction"
         })
       ,
	   success : function(data)
			    {
				if(data.error=='true')
             showAlert('payment successful')
                 else
			showAlert('payment declined')	
		
		console.log(data);
		$form.append($('<input type="hidden" name="stripeToken">').val(v));
    $form.get(0).submit(); 
 window.location="home2_Patron.html"
		
},error :function (xhr,status,error)
{
console.log('error')
console.log(xhr.status);
console.log(xhr.responseText);
}
				  
});
	
	
	
}