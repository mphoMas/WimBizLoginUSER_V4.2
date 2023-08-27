

const logedOutLinks = document.querySelectorAll(".logged-out");
const logedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

auth.onAuthStateChanged((user) => {
  if (user) {
     // setupUI(user);
    console.log(user);
    //get data
    db.collection("users").onSnapshot(
      (snapshot) => {
        console.log('user')
        // onsnapshot replaces .get().then for realtime update
       // setupUI(snapshot.docs);
 
      },
      (err) => {
        console.log(err.message);
      }
    );
  } else {

   console.log('user')
  }
});

// const setupUI = (user) => {
//     console.log(user);
//     if (user) {
   
//       //add account details
//       db.collection("users").doc(user.uid).get()
//         .then((doc) => {
//           const html = `
//           <div>First Name:  ${doc.data().First_Name}</div> 
//           <br>
//           <div>Last Name:  ${doc.data().Last_Name}</div>
//           <br>
//           <div>Email: ${user.email}</div>
//           <br>
//           <div>Phone:  ${doc.data().Phone}</div>
         
//           `;
//           accountDetails.innerHTML = html;
//         });
  
//       //toggle buttons
//       logedInLinks.forEach((item) => {
//         item.style.display = "block";
//       });
//       logedOutLinks.forEach((item) => {
//         item.style.display = "none";
//       });
//     } else {
//      //hide account detail
//        accountDetails.innerHTML = "";
//       logedInLinks.forEach((item) => {
//         item.style.display = "none";
//       });
     
//     }
//   };

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=> {
  e.preventDefault();
  auth.signOut()
  
  window.location.replace('login.html')
  
});



