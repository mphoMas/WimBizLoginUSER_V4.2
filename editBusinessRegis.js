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
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
const auth = firebase.auth();

const urlParams = new URLSearchParams(window.location.search);
const userRef = urlParams.get('userRef');

auth.onAuthStateChanged(function(user){
    if(user)
    {
        const uid = auth.currentUser.uid
        const userRef= db.collection('profile').doc(user.uid);
        userRef.onSnapshot(snapshot => {
        const  memberID = snapshot.data().userRef
        document.getElementById('memberID').value = user.uid;
        })

console.log("userRef:", uid);
async function fetchBusinessData() {
    try {
        const businessDoc = await db.collection('Business').doc(uid).get();
        const businessData = businessDoc.data();

        // Populate the HTML fields with the retrieved data
        //document.getElementById('memberID').value = businessData.memberID;
        document.getElementById('registeredname').value = businessData.registeredName;
        document.getElementById('tradingname').value = businessData.tradingName;
        document.getElementById('category').value = businessData.category;
        document.getElementById('subcategory').value = businessData.subcategory;
        document.getElementById('yearsinbusiness').value = businessData.yearsinbusiness;
        document.getElementById('businessEmail').value = businessData.businessEmail;
        document.getElementById('phoneNumber').value = businessData.phoneNumber;
        document.getElementById('annualRevenue').value = businessData.annualRevenue;
        document.getElementById('natureofgoods').value = businessData.natureofgoods;
        document.getElementById('website').value = businessData.website;
        document.getElementById('sapAribaRef').value= businessData.sapAribaRef;
        document.getElementById("city").value = businessData.city;
        document.getElementById("municipality").value = businessData.municipality;
        document.getElementById("country").value =businessData.country;
        document.getElementById("province").value = businessData.Province;
        document.getElementById("cipcNo").value = businessData.cipcNo;
        document.getElementById("coupaID").value = businessData.coupaID;
        //document.getElementById('dateJoined').value = businessData.dateJoined;
        document.getElementById('address-line').value = businessData.address_line;
        document.getElementById('preferredcommunicationMethod').value = businessData.preferredcommunicationMethod;
    
         var employeeRef = businessData.employees;

        await employeeRef.get().then((employeeDoc) => {
            if(employeeDoc.exists){
                var employee_Data = employeeDoc.data();
                document.getElementById("female-employees").value = employee_Data.Female;
                document.getElementById('male-employees').value = employee_Data.Male;
                document.getElementById('PreferNottoSay-employees').value = employee_Data.PreferNottoSay;
                document.getElementById('total-employees').value = employee_Data.TotalEmployees;
            }else{
                console.log("Employee Info does not exist.");
            }
        });
 
        // You can similarly populate the compliance data fields
        var complianceRef = businessData.compliance;

        // // Fetch compliance data using the reference
        await complianceRef.get().then((complianceDoc) => {
          if (complianceDoc.exists){
            var compliance_Data = complianceDoc.data();
            var cicp_registrationInput = document.getElementById("cicp-registration");
            var bbee_certificateInput = document.getElementById("bbbee-certificate");
            var tax_clearanceInput = document.getElementById("tax-clearance");
            var valid_bank_accountInput = document.getElementById("valid-bank-account");

            cicp_registrationInput.checked = compliance_Data.cicp_registration;
            bbee_certificateInput.checked = compliance_Data.bbee_certificate;
            tax_clearanceInput.checked = compliance_Data.tax_clearance_certificate;
            valid_bank_accountInput.checked = compliance_Data.valid_bank_account;
          }
          else {
            console.log("Compliance Info does not exist.");
          }
        });
        // You can similarly populate the managing director data fields

        var managingdRef = businessData.managingd;

        await managingdRef.get().then((managingdDoc) => {
          if(managingdDoc.exists){
            var managingdData = managingdDoc.data();
                    document.getElementById('name').value = managingdData.Name;
                    document.getElementById('race').value = managingdData.Race;
                    document.getElementById('gender').value = managingdData.Gender;
                    document.getElementById('surname').value = managingdData.Surname;
                    document.getElementById('citizenship').value = managingdData.Citizenship;   
            var ownermanagedInput =document.getElementById('ownermanaged');
                    ownermanagedInput.checked = managingdData.Ownermanaged;

          }
            else{
            console.log("ManagingD Info does not exist.");
            }
         });
        //Fetch subcontracting data using subcontracting data fields    
        var subcontractingRef = businessData.subcontracting;
        subcontractingRef.get().then((subcontractingDoc)=>{
            if(subcontractingDoc.exists){
                var subcontractingData=  subcontractingDoc.data() ;
                document.getElementById('manufactured').value = subcontractingData.manufactured;
                document.getElementById('subcontractedproducts').value = subcontractingData.subcontractedproducts;
                document.getElementById('period_of_subcontracting').value = subcontractingData.period_of_subcontracting;
                document.getElementById('materialprocessing').value = subcontractingData.materialprocessing;
            }
            else{
                console.log("Subcontracting info doesn't exists.")
            }
        });
         
    } catch (error) {
       //console.error("Error fetching business data:", error);
    }
}
const businessRef = db.collection('Business');

businessRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
 const municipality = doc.data().municipality;
    console.log(municipality);
    // You can process the municipality data here
  });
}).catch((error) => {
  console.log('Error fetching municipality: ', error);
});

async function updateBusinessData(userRef, updatedData) {
    try {
        await db.collection('Business').doc(userRef).update(updatedData);
        console.log("Business data updated successfully!");
    } catch (error) {
       // console.error("Error updating business data:", error);
    }
    
}


// Call the function to fetch and populate data when the page loads
fetchBusinessData();

// Add event listener to form submission
const editForm = document.getElementById('businessRegistration');
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
// await db.collection('Business').doc(documentId).update(updatedData);
    // Gather updated data from the form
    const updatedData = {
        //memberID: document.getElementById('memberID').value,
        registeredName: document.getElementById('registeredname').value,
        tradingName: document.getElementById('tradingname').value,
        category: document.getElementById('category').value, // changed from corebusiness
        subcategory: document.getElementById('subcategory').value,
        municipality:document.getElementById("municipality").value,
        yearsinbusiness: document.getElementById('yearsinbusiness').value,
        businessEmail: document.getElementById('businessEmail').value,
        natureofgoods : document.getElementById('natureofgoods').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        annualRevenue: document.getElementById('annualRevenue').value,
        website: document.getElementById('website').value,
        sapAribaRef: document.getElementById('sapAribaRef').value,
        cipcNo: document.getElementById("cipcNo").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        Province: document.getElementById("province").value,
        coupaID:document.getElementById("coupaID").value,
       // dateJoined:document.getElementById('dateJoined').value,
        address_line:document.getElementById('address-line').value,
        preferredcommunicationMethod:document.getElementById('preferredcommunicationMethod').value,
        

        // Update compliance data as needed
        
        compliance :{
            bbee_certificate: document.getElementById('bbbee-certificate').checked,
            cicp_registration: document.getElementById('cicp-registration').checked,
            tax_clearance_certificate: document.getElementById('tax-clearance').checked,
            valid_bank_account: document.getElementById('valid-bank-account').checked,
        }
    
     };
    //     managingdDocRef = await managingdCollection.add({
    //     Name: managingdName ,
    //     Race: managingdRace,
    //     Gender: managingdGender,
    //     Surname: managingdSurname,
    //     Citizenship: managingdCitizenship,
    //     Ownermanaged:managingdOwnermanaged
    // });
   


    if (userRef) {
        // Only call the update function if documentId is valid
        updateBusinessData(userRef, updatedData);
    } else {
        console.error("Invalid document ID.");
    }

    // Call the function to update data in the database
});
    
    }
    //alert("Memeber's details has been updated!!...");
})
