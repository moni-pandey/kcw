$("document").ready(function() {
      $(document).bind("deviceready", function() {
        	
      }); 
	 //var amtval=0;
	 //var notval='';
	//var expval='';


$('.artist-name').text(localStorage.getItem('loggedINusername'));
$('#add_dynamic_div1').hide();

getexp();

$('a.save-text').click(saveexpense);



$("#addexpense").bind('click', function () {
      $('#add_dynamic_div1').show();
		//alert('inside new func');

		
	});

$(".cancelbtn").bind('click', function(e){
	  
    $('#add_dynamic_div1').hide();
   });	
	
	$('#backbtn').bind('click', function() {
		parent.history.back();
		return false;

	});
});


function saveexpense()
{



      localStorage.setItem('title_expense',$('#title_expense').val());
		localStorage.setItem('amount_expense',$('#amount_expense').val());
		localStorage.setItem('comments_expense',$('#comments_expense').val());
//		alert(localStorage.getItem('title_expense'));
//		alert(localStorage.getItem('loggedINuserartistid'));
		$.ajax({
			type : 'POST',
			url: localStorage.getItem('webserviceurl')+"artist/expense/add",
			contentType: "application/json",
			dataType: "json",
			data : JSON.stringify({

				"artistID" :localStorage.getItem('loggedINuserartistid'),
				"expense"  :localStorage.getItem('title_expense'),
				"amount"   :localStorage.getItem('amount_expense'),
				"frequency" : 'monthly' ,
				"note"     :localStorage.getItem('comments_expense')


			}),
			success : function(data)
			{
				 alert('inside success');
				$('.rent-amt').text("$"+ data.expence[0].amount);
				$('.rent-text').text(data.expence[0].expense);
				/*
				 * alert(data.expence[0].expenseID);
				 * alert(data.expence[0].amount);
				 * $('#generalid').attr('id',data.expence[0].expenseID);
				 * 
				 * 
				 * //will do it later
				 */

				//$("#add_dynamic_div").before('<div class="row"><div class="col-xs-1"></div><div class="col-xs-10 top-border"><p class="rent-text"><img src="./assets/img/Rent.png" class="rent-img">Title</p><p class="rent-amt">$Expense</p><img src="./assets/img/Edit.png" alt="logo" class="edit-icon" id="rent_edit"><img src="./assets/img/delete.png" alt="logo" class="delete-icon"><div  class="form_rent"><div class="form-group placeholder_side-margin" ><input type="text" class="form-control fund-page_form text-color" placeholder="Expense title"></div><div class="form-group placeholder_side-margin"><input type="text" class="form-control fund-page_form text-color" placeholder="enter your expense" id="data.expence.expenseID"></div><div class="form-group placeholder_side-margin"><input type="text" class="form-control fund-page_form text-color" placeholder="Comments" id="rent_comments" ></div></div></div><div class="col-xs-1"></div></div>'
				//);
				
				$("#add_dynamic_div").append('<div id="'+expence.expenseID+'"><div class="row">\
						<div class="col-xs-1">\
						</div>\
						<div class="col-xs-10 top-border">\
						<p class="rent-text"><img src="./assets/img/Rent.png" class="rent-img">'+expence.expense+'</p>\
						<p class="rent-amt">$'+expence.amount+'</p>\
						<img src="./assets/img/Edit.png" alt="logo" class="edit-icon" id="'+expence.expenseID+'edit">\
						<img src="./assets/img/delete.png" alt="logo" class="delete-icon" id="'+expence.expenseID+'delid">\
						<div  class="'+expence.expenseID+'form_rent">\
						<div class="form-group placeholder_side-margin" >\
						<input type="text" class="form-control fund-page_form text-color "'+expence.expenseID+'class" " placeholder="'+expence.expense+'"id="'+expence.expenseID+'exp">\
						</div>\
						<div class="form-group placeholder_side-margin">\
						<input type="text" class="form-control fund-page_form text-color "'+expence.expenseID+'class" " placeholder="'+expence.amount+'"id="'+expence.expenseID+'amt" >\
						</div>\
						<div class="form-group placeholder_side-margin">\
						<input type="text" class="form-control fund-page_form text-color "'+expence.expenseID+'class" " placeholder="'+expence.note+'" id="'+expence.expenseID+'cmnt">\
						</div>\
						</div>\
						</div>\
						<div class="col-xs-1">\
						</div>\
						</div>\
						<div class="row">\
						<div class="col-xs-1">\
						</div>\
						<div class="col-xs-10 bottom-border  '+val.expenseID+'c">\
						<p class="rent_comments  " id="update_comments">'+expence.note+'</p>\
						</div>\
						<div class="col-xs-1">\
						</div>\
				</div></div>');
				
										$(document).on('DOMSubtreeModified', '#add_dynamic_div', function(e){
						var classname = val.expenseID+'form_rent';
							 //alert(classname)	
							 document.getElementsByClassName(classname)[0].style.visibility='hidden';
							 document.getElementsByClassName(classname)[0].style.display='none';

						});

						
						//$("#add_dynamic_div1").append('<div class="row"><div class="col-xs-1"></div><div class="col-xs-10 top-border"><p class="rent-text"><img src="./assets/img/Rent.png" class="rent-img">Title</p><p class="rent-amt">$Expense</p><img src="./assets/img/Edit.png" alt="logo" class="edit-icon" id="rent_edit"><img src="./assets/img/delete.png" alt="logo" class="delete-icon"><div  class="form_rent"><div class="form-group placeholder_side-margin" ><input type="text" class="form-control fund-page_form text-color" placeholder="Expense title"></div><div class="form-group placeholder_side-margin"><input type="text" class="form-control fund-page_form text-color" placeholder="enter your expense" id="data.expence.expenseID"></div><div class="form-group placeholder_side-margin"><input type="text" class="form-control fund-page_form text-color" placeholder="Comments" id="rent_comments" ></div></div></div><div class="col-xs-1"></div></div>'
									//);
				

			} ,
			error   : function (xhr, status, error)
			{
				alert('inside failure');
				alert(xhr.responseText);
			}						 


		});






}

	
function loadprof(data)
{

      var parsedata =JSON.parse(localStorage.getItem('newdata'));
	var total =0;
      if(parsedata.expenses.length !=0)
	  {	//alert('inside if ');

	//for(var i = 0 ;i <parsedata.expenses.length ;i++) 
	//{        
		$(parsedata.expenses).each(function(i,val){
			
            // alert('inside parsedata');
			
			
             total=total+ parseInt(val.amount) ;
			 //alert(val.expenseID);
        		$("#add_dynamic_div").append('<div id="'+val.expenseID+'"><div class="row">\
						<div class="col-xs-1">\
						</div>\
						<div class="col-xs-10 top-border">\
						<p class="rent-text"><img src="./assets/img/Rent.png" class="rent-img">'+val.expense+'</p>\
						<p class="rent-amt">$'+val.amount+'</p>\
						<img src="./assets/img/Edit.png" alt="logo" class="edit-icon" id="'+val.expenseID+'edit">\
						<img src="./assets/img/delete.png" alt="logo" class="delete-icon" id="'+val.expenseID+'delid">\
						<div  class=" '+val.expenseID+'form_rent ">\
						<div class="form-group placeholder_side-margin" >\
						<input type="text" class="form-control fund-page_form text-color" value="'+val.expense+'"id="'+val.expenseID+'exp">\
						</div>\
						<div class="form-group placeholder_side-margin">\
						<input type="text" class="form-control fund-page_form text-color" value="'+val.amount+'"id="'+val.expenseID+'amt" >\
						</div>\
						<div class="form-group placeholder_side-margin">\
						<input type="text" class="form-control fund-page_form text-color" value="'+val.note+'" id="'+val.expenseID+'cmnt">\
						</div>\
						</div>\
						</div>\
						<div class="col-xs-1">\
						</div>\
						</div>\
						<div class="row">\
						<div class="col-xs-1">\
						</div>\
						<div class="col-xs-10 bottom-border '+val.expenseID+'c ">\
						<p class="rent_comments " id="update_comments">'+val.note+'</p>\
						</div>\
						</div>\
				</div>');

	 $(document).on('DOMSubtreeModified', '#add_dynamic_div ', function(e){
         var classname = val.expenseID+'form_rent';
	 //alert('callinghide')	
	 document.getElementsByClassName(classname)[0].style.visibility='hidden';
	 document.getElementsByClassName(classname)[0].style.display='none';


		

		});
	
		
});
var lastid = parsedata.expenses[parsedata.expenses.length-1].expenseID+'form_rent';
 document.getElementsByClassName(lastid)[0].style.visibility='hidden';
	 document.getElementsByClassName(lastid)[0].style.display='none';


    $('.total-amt_number').html('$'+total);
	$( ".total-amt ").html(function() {
        var emphasis = "<span class='total-text'> Total </span>";
         return "<p>$"+total+" "+emphasis+"  </p>";
        });
    //$('.total-amt').html('$'+total+'total expenses<span class="total-text"> Total</span>');
  
 // calltohide();

}



}// end of load prof 



$(document).on('change', '.fund-page_form ', function(e){
     var boxid = e.target.id ;
	// alert(e.target.value);

    answer = boxid.replace(/[0-9]/g, '');
	
	 if(answer=='amt')     
             {
			 
			     amtval = $(this).val()
			    if(amtval=="" || (!($.isNumeric(amtval))))
			        {
					
				e.target.value = "please enter numeric value";
				var elem = document.getElementById(e.target.id);
			    elem.style.color = "Red";
					}
				 
			 }
	 else if(answer=='cmnt')  { 
	     notval 	= $(this).val();
		       
			   if(notval=="" )
			        {
					
				e.target.value = "please enter comment";
				var elem = document.getElementById(e.target.id);
			    elem.style.color = "Red";
					}

}
else 
      {       expval	= $(this).val()
	          
			  if(expval=="" )
			        {
					
				e.target.value = "please enter expense title";
				var elem = document.getElementById(e.target.id);
			    elem.style.color = "Red";
					}
			}
	  });


$(document).on('click', '.delete-icon', function(e){
    var id = e.target.id ;
 var number = parseInt(id, 10);
if (confirm('to confirm deletion click on OK')) {
           
            $.ajax({
			type : 'POST',
			url: localStorage.getItem('webserviceurl')+"artist/expense/delete",
			contentType: "application/json",
			dataType: "json",
			data : JSON.stringify({

				"artistID" :localStorage.getItem('loggedINuserartistid'),
				"expenseID"  : number,
				



			}),
			success : function(data)
			{  
			//will swap it vd commonmethod.js function
			navigator.notification.alert(
            'expense deleted!',  // message
            alertDismissed,         // callback
            'kcw',            // title
            'ok'                  // buttonName
             );
			//alert(data);
			//var newwdata = JSON.stringify(data);
				//localStorage.setItem('newdata' ,newwdata);
				//alert(localStorage.getItem('newdata'));
			//var	parsedata =JSON.parse(localStorage.getItem('newdata');

			//alert(parsedata);
				
			} ,
			error   : function (xhr, status, error)
			{
				alert('inside failure');
				console.log(xhr.responseText);
			}						 


		});
  
} else {
    
}

 
      


    


});

$(document).on('focus', '.fund-page_form ', function(e){
  var value=$(this).val();
if(value=="please enter numeric value"||value=="please enter comment" ||value=="please enter expense title")
           $(this).val('');
		   
var elem = document.getElementById(e.target.id);
elem.style.color = "white"
	  });



               /*************edit-icon******************/

$(document).on('click', '.edit-icon', function(e){
     
	// alert('edit-icon clicked');
	 var id = e.target.id ;
	 //alert(e.target.id);
     var number = parseInt(id, 10);
     var imageid= number+'edit' ;
 
 var classname = number+'form_rent';
 var noteid = number+'cmnt'; 
 var amtid = number+'amt';
 var expid = number+'exp';
 var noteclass =number+'c';

  //document.getElementsByClassName(classname)[0].show();
document.getElementsByClassName(classname)[0].style.visibility='visible';
document.getElementsByClassName(classname)[0].style.display='block';
document.getElementsByClassName(noteclass)[0].style.visibility='hidden';
document.getElementsByClassName(noteclass)[0].style.display='none';
document.getElementById(imageid).src="./assets/img/Save.png";
document.getElementById(imageid).className = 'save-icon';
});




/**********************save-icon**********************/
$(document).on('click', '.save-icon', function(e){
//alert('save-icon clicked');
      var id = e.target.id ;
     var number = parseInt(id, 10);
     var imageid= number+'edit' ;
 
 var classname = number+'form_rent';
 
 var noteid = number+'cmnt'; 
 var amtid = number+'amt';
 var expid = number+'exp';
 //var noteid = number+'class'; 
 //var amtid = number+'class';
 //var expid = number+'class';
 var amtvall=document.getElementById(amtid).value
 var notvall = document.getElementById(noteid).value
 var expvall =document.getElementById(expid).value
 
 if(amtvall=="please enter numeric value"||notvall=="please enter comment" ||expvall=="please enter expense title")
           return;
	
		 $.ajax({
			type : 'POST',
			url:localStorage.getItem('webserviceurl')+"artist/expense/update",
			contentType: "application/json",
			dataType: "json",
			data : JSON.stringify({

				"artistID" :localStorage.getItem('loggedINuserartistid'),
				"expenseID"  : number,
				"expense"  :expvall,
				"amount"      : amtvall,
                "frequency"  : 'monthly',
                   "note"     : notvall



			}),
			success : function(data)
			{  //alert('sucess');
			//alert(data.message);
	/*		      navigator.notification.alert(
            'expense updated!',  // message
            alertDismissed,         // callback
            'Kcw',            // title
            'ok'                  // buttonName
        );*/

					
document.getElementsByClassName(classname)[0].style.visibility='hidden';
document.getElementsByClassName(classname)[0].style.display='none';
document.getElementById(imageid).src="./assets/img/Edit.png";
document.getElementById(imageid).className='edit-icon';

				$("#add_dynamic_div").html('');
				getexp();
				
			} ,
			error   : function (xhr, status, error)
			{
				alert('inside failure');
				console.log(xhr.responseText);
			}						 


		});



});

function alertDismissed()
{


}


function getexp()
{

$.ajax({
	    type : 'GET',
	    url: localStorage.getItem('webserviceurl')+"artist/expense",
		contentType: "application/json",
		dataType: "json",
		async :'false',
		data : {
       artistID : localStorage.getItem('loggedINuserartistid')
      },
	   success : function(data)
			    {
			
			var newwdata = JSON.stringify(data);
			if(localStorage.getItem('newdata')==null)
			    localStorage.setItem('newdata' ,newwdata);
			else
			 {
			 localStorage.removeItem("newdata");
			 localStorage.setItem('newdata' ,newwdata);
			 }
			 loadprof();
				  
},error :function (xhr,status,error)
{
alert('error')
alert(xhr.status);
alert(xhr.responseText);
}
				  
});
}

