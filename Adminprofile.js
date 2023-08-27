 // Initialize
 const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBf4YWSbtdbbUBcxRJQ0RkOnUDYVNcD8uQ",
  authDomain: "testjs-fc621.firebaseapp.com",
  databaseURL: "https://testjs-fc621-default-rtdb.firebaseio.com",
  projectId: "testjs-fc621"
});

//make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();

//update firestore settings
db.settings({timestampsInSnapshots: true });
const user = firebase.auth().currentUser;


//to get user update info
   const Name = document.getElementById("First_Name").value
   const Surname = document.getElementById("Last_Name").value
   const Contact= document.getElementById("phone").value
  // const Email = document.getElementById("Email").value

const editButton = document.getElementById('edit');



auth.onAuthStateChanged(user => {
  console.log(user);
  if (user){
    console.log(user)
    const doc = db.collection('Admin').doc(user.uid);
    doc.onSnapshot(snapshot => {
  
              // Get the user data from the snapshot
       const First_Name = snapshot.data().First_Name;
      const Last_Name = snapshot.data().Last_Name;
       const phone = snapshot.data().Phone;
      const Email = snapshot.data().Email_Address;

      // Set the user data in the HTML elements
       document.getElementById("First_Name").value = First_Name;
       document.getElementById("Last_Name").value = Last_Name;
       document.getElementById("phone").value = phone;
      document.getElementById("Email").value = Email;
      // The user is signed in.
    
  })  
}


document.getElementById("edit").onclick = function () {

// Re-authenticate user's email address
const user = firebase.auth().currentUser;
const newEmail = document.getElementById("Email").value
const newPassword = document.getElementById("password").value
// Prompt user to enter their current password
const password = prompt("Please enter your current password:");

// // Create credential with current user's email and password
const credential = firebase.auth.EmailAuthProvider.credential(
 user.email,
 password
);

//credential = create_new_credential(Email)

// Reauthenticate user with provided credential
user.reauthenticateWithCredential(credential)
.then(() => {
  // Update user's email address with the new one
  user
    .updateEmail(newEmail)
    .then(() => {
      //alert("Data Update");
      return db.collection('Admin').doc(user.uid).set({
             ['Email_Address']: Email.value,
             ['First_Name']: First_Name.value,
             ['Last_Name']: Last_Name.value,
             ['Phone']: phone.value,
     /// console.log("Email address updated successfully!");
      })
    })
    .catch((error) => {
      //console.error("Failed to update email:", error);
    });
})
.catch((error) => {
 // console.error("Failed to reauthenticate:", error);
});
user
    .updatePassword(newPassword)
    .then(() => {
      alert("Data Update");
      return db.collection('profile').doc(user.uid).set({
             ['Email_Address']: Email.value,
             ['First_Name']: First_Name.value,
             ['Last_Name']: Last_Name.value,
             ['Phone']: phone.value,
     /// console.log("Email address updated successfully!");
      })
    })
    .catch((error) => {
      console.error("Failed to update email:", error);
    })
  //})
.catch((error) => {
  console.error("Failed to reauthenticate:", error);
});

}
})



































//    if(newPassword && Mail) {
//     const credential = createCredential(user);
//     changePassword(user, credential, newPassword);
//     changeEmail(user, credential, Mail);
// }
// //Changes only the email
// else if(newPassword) {
//     const credential = createCredential(user);
//     changePassword(user, credential, newPassword);
// }
// //Changes only password
// else if(Mail) {
//     const credential = createCredential(user);
//     changeEmail(user, credential, Mail);
// }

//  }

   

























































