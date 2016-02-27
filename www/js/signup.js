$(document).ready(function(){
 usertype= ''
 type=''
  someObj={};
$('#screatebtn').bind('click', function() { 
        // alert('inside continue click ');
		 
		if ($("#sname").val() == "") {
		   showAlert("Please Enter your name");
			 $("#sname").focus();
		} else if ($("#smail").val() == "" ) {
		  showAlert("Please Enter your E-mail id");
		   $("#smail").focus();
		} else if ($("#spassword").val() == "") {
			showAlert("Please Enter your password");
			
			$("#spassword").focus();
		} else if ($("#scpassword").val() == "") {
			showAlert("Please Enter your password again");
			$("#scpassword").focus();
		} else {
		
		window.location="signUp_Artist.html"
		}
     localStorage.setItem('sname',document.getElementById('sname').value);
        localStorage.setItem('smail',$('#smail').val());
		localStorage.setItem('spassword',$('#spassword').val());
  // get the current value of the input field.
  });
  
  $('#signupbutton').on('click',function(){
  
  	 //alert('inside signup');
			
				someObj.artTypes=[];

              var encoded = encodeURIComponent('www/assets/img/pic1');
		      
			  /** art types array**/
				$("input:checkbox").each(function(){
					var $this = $(this);

					if($this.is(":checked")){
						someObj.artTypes.push($this.attr("id"));
						
					 }
				});
               
			   /* if fb signup*/
			   if(localStorage.getItem('fbicon')=='true')
			   {
				   localStorage.getItem('fbicon' ,'false');
			     if($('#patronbtn').css('display') ==='block')
				   { 
			   usertype='P'
				   type='P'	}	
                 else{
					 usertype='A'
				   type='A'
					 
				 }
          				
                    callforsocialMediaLogin()						
			   
			   
			   }
			   else
			   { 
			   //alert(window.btnid);
				   if($('#patronbtn').css('display') ==='block')
				   { 
				     // alert('creating patron');
				   /**creating patronfrofile**/
				if (checkConnection()) {   $.ajax({
					  type: 'POST',
					  url: localStorage.getItem('webserviceurl')+'user/signup',
					  contentType: "application/json",
					  dataType: "json",
                     data:  JSON.stringify({
               
				"name" : localStorage.getItem('sname'),
				"linkedAcctType" : "E",
				"smAcctID": "",
				"email": localStorage.getItem('smail'),
				"password": localStorage.getItem('spassword'),
				"usertype" : 'P',
				"city" : $("#cityname").val(),
				"profilePicURL":encoded,
				"artTypes":someObj.artTypes,
				"incomeRange" : localStorage.getItem('incomerange')


				})
					,
					  success: function(data){
						
						//alert('success');
						//alert('data.message');
						console.log(data);
						window.location="index.html";
						
					  },
					  error: function(xhr,status,error){
						console.log('inside error');
						console.log(xhr);
						alert(xhr.responseText);
						//alert(xhr.status);
						console.log(xhr.responseText);
						//alert('There waaaas an error');
					  }
					});   } else showAlert("Please Connect to Internet to Login");  

				   }else {
				   
				  // alert('creating artist');
				   /**creating artist**/
				 if (checkConnection()) {     $.ajax({
					  type: 'POST',
					  url: localStorage.getItem('webserviceurl')+"user/signup",
					  contentType: "application/json",
					  data:
					 JSON.stringify({

				"name" : localStorage.getItem('sname'),
				"linkedAcctType" : "E",
				"smAcctID" : "",
				"email": localStorage.getItem('smail'),
				"password": localStorage.getItem('spassword'),
				"usertype" : 'A',
				"city" : $("#cityname").val(),
				"profilePicURL":encoded,
				"artTypes":someObj.artTypes,
				}),
					  success: function(data){
						//alert(JSON.stringify(data));
						//alert('artist success');
						console.log(data)
						window.location="index.html";
					  },
					  error: function(xhr ,status,error){
						//console.log('inside error');
						console.log(xhr);
						//alert(xhr.responseText);
						//alert(xhr.status);
						console.log(xhr.responseText);
						//alert('There waaaas an error');
					  }
					});} else showAlert("Please Connect to Internet to Login");
				   }
}
  
  
  });


});

function capturePhoto()
{
 //window.btnid =$(this).attr('id') ;	
		         // alert($(this).attr('id'));
}

				
$("input[name='incomeradio']").on("click", function() {
         //   alert($(this).val());
			localStorage.setItem('incomerange',$(this).val());
        });


   /* if (checkConnection()) {
    	$.ajax({
    		url:localStorage.getItem('webserviceurl')+"signup",
    		method:"post",
    		data:{}
    	})
    	.done(function(response){
    		showAlert(response);
    	})
    	.fail(function(jqXHR, textStatus){
    		showAlert(textStatus);
    	})
    } else showAlert("Please Connect to Internet to Signup");
	
}
*/

function callforsocialMediaLogin()
{
	
	if (checkConnection()) { $.ajax({
					  type: 'POST',
					  url: localStorage.getItem('webserviceurl')+"user/socialmedia",
					  contentType: "application/json",
					  data:
			 JSON.stringify({
				 "token" : localStorage.getItem('fbaccesstoken'),
		         "smAcctType" : "F",
				"usertype" : usertype,
				"type" : type,
				"city" : $("#cityname").val(),
				"incomeRange" :'',
				"artTypes":someObj.artTypes,
				}),
					  success: function(data){
					 var fbdata =JSON.stringify(data);
						alert(data.user[0].smAcctID);
						console.log(data)
						localStorage.setItem('smid',data.user[0].smAcctID)
						localStorage.setItem('smartistid',data.user[0].artistID)
						
					  },
					  error: function(xhr ,status,error){
						//console.log('inside error');
						console.log(xhr);
						alert(xhr.responseText);
						//alert(xhr.status);
						console.log(xhr.responseText);
						//alert('There waaaas an error');
					  }
					});
					 } else showAlert("Please Connect to Internet to Login");
	
}