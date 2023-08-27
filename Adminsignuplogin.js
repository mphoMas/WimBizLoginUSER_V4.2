
//signup
const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
  // get user info for signup
  const username = document.getElementById('FName').value;
  const surname = document.getElementById('LName').value;
  const email = document.getElementById('Mail').value;
  const password = document.getElementById('pword').value;
  const phone = document.getElementById('contact').value;
  const copassword = document.getElementById('confirm-password').value;

    e.preventDefault();
       clearErrorMessages();

      if (validateForm()) {
         //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
  return db.collection('Admin').doc(cred.user.uid).set({
    ['First_Name']: signupForm['FName'].value,
    ['Last_Name']: signupForm['LName'].value,
    ['Phone']: signupForm['contact'].value,
    ['Email_Address']: signupForm['Mail'].value  })
  }).then(function(success) {
     
    window.location.replace('login.html')

   
  });
        alert("signup successful")
          
      }   

  function clearErrorMessages() {
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(message => {
          message.textContent = '';
      });
  }

  function validateForm() {
      let isValid = true;

    //   if (!fname.value == "") {
    //       displayErrorMessage('first-name-error', 'First Name is required.');
    //       isValid = false;
    //   }

    //   if (!surname == "" ) {
    //       displayErrorMessage('last-name-error', 'Last Name is required.');
    //       isValid = false;
    //   }

      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!email.match(emailPattern)) {
          displayErrorMessage('email-error', 'Enter a valid email address.');
          isValid = false;
      }

      const phonePattern = /^[0-9]{10}$/;
      if (!phone.match(phonePattern)) {
          displayErrorMessage('phone-error', 'Enter a valid phone number (10 digits).');
          isValid = false;
      }

      const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!password.match(passwordPattern)) {
          displayErrorMessage('password-error', 'Password must be at least 8 characters and include at least one number, one uppercase letter, and one lowercase letter.');
          isValid = false;
      }

      if (password !== copassword) {
          displayErrorMessage('confirm-password-error', 'Passwords do not match.');
          isValid = false;
      }

      return isValid;
  }

  function displayErrorMessage(fieldId, message) {
      const errorMessage = document.getElementById(fieldId);
      errorMessage.textContent = message;
  }

});   





  