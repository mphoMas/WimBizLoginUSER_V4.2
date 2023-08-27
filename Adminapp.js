// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf4YWSbtdbbUBcxRJQ0RkOnUDYVNcD8uQ",
  authDomain: "testjs-fc621.firebaseapp.com",
  databaseURL: "https://testjs-fc621-default-rtdb.firebaseio.com",
  projectId: "testjs-fc621",
  storageBucket: "testjs-fc621.appspot.com",
  messagingSenderId: "631785812901",
  appId: "1:631785812901:web:80c3883855041aff562e4c",
  measurementId: "G-H8JZ58SJ27"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig); // Initialize Firebase
var db = firebase.firestore();
var tableBody = document.getElementById("table-body");

db.collection('Admin').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        var data = doc.data();
        var row = tableBody.insertRow();
        var First_NameCell = row.insertCell(0);
        var Last_NameCell = row.insertCell(1);
        var PhoneCell = row.insertCell(2);
        var Email_AddressCell = row.insertCell(3);
        var actionsCell = row.insertCell(4);
        //var directorCell = row.insertCell(10);
        // Add more cells for additional columns as needed
    
        First_NameCell.textContent = data.First_Name;
        Last_NameCell.textContent = data.Last_Name;
        PhoneCell.textContent = data.Phone;
        Email_AddressCell.textContent = data.Email_Address;
        
        function deleteDocument(documentId) {
          // Get the Firestore database reference
          const db = firebase.firestore();
        
          // Delete the document
          db.collection('Admin').doc(documentId).delete();
        }
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete User";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.addEventListener("click", function() {
          // Show a confirmation dialog box
          var confirmDialog = confirm("Are you sure you want to delete the user?");
        
          // If the user clicks yes, delete the document
          if (confirmDialog) {
            deleteDocument(doc.id);
            // Clear the table body
            tableBody.innerHTML = "";

            // Re-populate the table body with the new data
            db.collection('Admin').get().then((snapshot) => {
              snapshot.docs.forEach(doc => {
                var data = doc.data();
                var row = tableBody.insertRow();
                var First_NameCell = row.insertCell(0);
                var Last_NameCell = row.insertCell(1);
                var PhoneCell = row.insertCell(2);
                var Email_AddressCell = row.insertCell(3);
                var actionsCell = row.insertCell(4);

                First_NameCell.textContent = data.First_Name;
                Last_NameCell.textContent = data.Last_Name;
                PhoneCell.textContent = data.Phone;
                Email_AddressCell.textContent = data.Email_Address;

                var deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete User";
                deleteButton.className = "btn btn-danger btn-sm";
                deleteButton.addEventListener("click", function() {
                  // Show a confirmation dialog box
                  var confirmDialog = confirm("Are you sure you want to delete the user?");

                  // If the user clicks yes, delete the document
                  if (confirmDialog) {
                    deleteDocument(doc.id);
                  }
                });

                actionsCell.appendChild(deleteButton);
              });
            });
          }
        });

        actionsCell.appendChild(deleteButton);
    })
  })