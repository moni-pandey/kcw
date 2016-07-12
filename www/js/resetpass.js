
$(document).ready(function(){

$('#resetpasswordi').bind('click', function() { 
if ($("#useremail").val() == "") {
		   //showAlert("Please Enter your User name");
		   showAlert('please enter email id');
			 $("#useremail").focus();
		}else 
		{   resetpassword();
		    localStorage.setItem('useremail',$("#useremail").val());}
            
		          
});
});



function resetpassword()
{
if($("#useremail").val== " ")
{


   
   }
   else
   {
  
      $.ajax({
					  type: 'POST',
					  url: localStorage.getItem('webserviceurl')+"user/resetpassword",
					  data:JSON.stringify({
                     "email": localStorage.getItem('useremail'),
			}),
					  success: function(data){
						//alert(JSON.stringify(data));
						showAlert('password reset successful.Please checj your registered email id ');
						console.log(data)
					  },
					  error: function(xhr,status,error){
						
						showAlert(error);
					  }
					});     
   
   }
         




}