
$(document).ready(function(){

$('#resetpasswordi').bind('click', function() { 
if ($("#useremail").val() == "") {
		   //showAlert("Please Enter your User name");
		   alert('please enter email id');
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
						alert('success');
						console.log(data)
					  },
					  error: function(){
						
						alert('There was an error');
					  }
					});     
   
   }
         




}