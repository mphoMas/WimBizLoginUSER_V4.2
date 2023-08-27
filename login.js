

//Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    //get user info for login
 const Email = loginForm ['login-email'].value;
 const Password = loginForm ['login-password'].value;

     auth.signInWithEmailAndPassword(Email, Password).then(cred  => {
         //close the login modal
         
         const modal = document.querySelector('#modal-login'); })
         //M.Modal.getInstance(modal).close();
        
         .then(function(success){
            window.location.replace('wimbizPortal.html')
          // console.log(success.user.uid)
        })
        .catch(function(err){
          alert("Error in " + err)
        });
     })
 
