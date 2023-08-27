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

function openEditForm(documentId) {
    // Replace this with your own code to handle the edit action
    window.location.href = `editBusinessRegis.html?documentId=${documentId}`;
}
const form = document.getElementById('businessRegistration');

    form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const businessMunicipality= document.getElementById('municipality').value;
            const businessRegisteredName = document.getElementById('registeredname').value;
            const businessTraddingName = document.getElementById('tradingname').value;
            const businessMemberID = document.getElementById('memberID').value;
            const businessCore = document.getElementById('corebusiness').value;
            const businessCategory = document.getElementById('subcategory').value;
            const businessYears = document.getElementById('yearsinbusiness').value;
            const businessEmail = document.getElementById('businessEmail').value;
            const businessPhone = document.getElementById('phoneNumber').value;
            const businessRevenue = document.getElementById('annualRevenue').value;
            const businessWebsite = document.getElementById('website').value;
            const businessCity = document.getElementById('city').value;
            const businessAddressLine = document.getElementById('address-line').value;
            const businessProvince = document.getElementById('province').value;
            const businessCIPCNo = document.getElementById('cipcNo').value;
            const businessSapAribaRef = document.getElementById('sapAribaRef').value;
            const businessCoupaID = document.getElementById('coupaID').value;
            const businessDateJoined= document.getElementById('dateJoined').value;
            const businessCountry = document.getElementById('country').value;
            const businessPreferredcommunicationMethod = document.getElementById('preferredcommunicationMethod').value;


            const subcontractingManufactured = document.getElementById('manufactured').value;
            const subcontractingMaterialProcessing = document.getElementById('materialprocessing').value;
            const subcontractingSubcontractedProducts = document.getElementById('subcontractedproducts').value;
            const subcontractingPeriodofsubcontracted = document.getElementById('period_of_subcontrating').value;
            

            const complianceRegistration = document.getElementById('cicp-registration').checked;
            const complianceCertification = document.getElementById('bbbee-certificate').checked;
            const complianceTax = document.getElementById('tax-clearance').checked;
            const complianceBank = document.getElementById('valid-bank-account').checked;

            const femaleEmployees = document.getElementById('female-employees').value;
            const maleEmployees = document.getElementById('male-employees').value;
            const PreferNottoSayEmployees = document.getElementById("PreferNottoSay-employees").value;


            const totalEmployees = parseInt(femaleEmployees) + parseInt(maleEmployees) +parseInt(PreferNottoSayEmployees);

            const businessCollection = db.collection('Business');
            const complianceCollection = db.collection('compliance');
            const employeeCollection = db.collection('Employees');
            const subcontractingCollection =db.collection('Subcontracting');
            const managingdCollection = db.collection('ManagingD');
         


            const managingdGender= document.getElementById('gender').value;
            const managingdCitizenship= document.getElementById('citizenship').value;
            const managingdRace= document.getElementById('race').value;
            const managingdSurname= document.getElementById('surname').value;
            const managingdName= document.getElementById('name').value;

            const managingdOwnermanaged = document.getElementById('ownermanaged').checked;


            // Add data to 'compliance' collection
            const complianceDocRef = await complianceCollection.add({
                bbee_certificate: complianceCertification,
                cicp_registration: complianceRegistration,
                tax_clearance_certificate: complianceTax,
                valid_bank_account: complianceBank,
            });

            const employeeDocRef = await employeeCollection.add({
                Male: maleEmployees,
                Female: femaleEmployees,
                PreferNottoSay: PreferNottoSayEmployees,
                TotalEmployees: totalEmployees,
            });

            const subcontractingDocRef = await subcontractingCollection.add({
                manufactured: subcontractingManufactured,
                materialprocessing: subcontractingMaterialProcessing,
                subcontractedproducts: subcontractingSubcontractedProducts,
                period_of_subcontrating: subcontractingPeriodofsubcontracted,
            });
           
            // if (managingdOwnermanaged === true){
             //const managingdCollection = db.collection('ManagingD')
            const managingdDocRef = await managingdCollection.add({
                Name: managingdName ,
                Race: managingdRace,
                Gender: managingdGender,
                Surname: managingdSurname,
                Citizenship: managingdCitizenship,
                Ownermanaged:managingdOwnermanaged
            });

            // Add data to 'business' collection with reference to compliance document
            const businessDocRef = await businessCollection.add({
                annualRevenue: businessRevenue,
                Province: businessProvince,
                memberID: businessMemberID,
                businessEmail: businessEmail,
                phoneNumber: businessPhone,
                website: businessWebsite,
                municipality:businessMunicipality,
                corebusiness: businessCore,
                city: businessCity, 
                address_line: businessAddressLine, 
                coupaID:businessCoupaID,
                cipcNo:businessCIPCNo,
                dateJoined:businessDateJoined,
                country: businessCountry,
                sapAribaRef:businessSapAribaRef, 
                preferredcommunicationMethod:businessPreferredcommunicationMethod,
                registeredName: businessRegisteredName,
                tradingName: businessTraddingName,
                yearsinbusiness: businessYears,
                subcategory: businessCategory,
                compliance: complianceDocRef,
                employees: employeeDocRef,
                managingd: managingdDocRef,
                subcontracting: subcontractingDocRef,

                
            });
            
            console.log(`Business document added with ID: ${businessDocRef.id}`);
            console.log(`Compliance document added with ID: ${complianceDocRef.id}`);
            console.log(`Employee document added with ID: ${employeeDocRef.id}`);
            console.log(`Subcontracting document added with ID: ${subcontractingDocRef.id}`);
            console.log(`ManagingD document added with ID: ${managingdDocRef.id}`);
            // Clear form inputs after submission
            alert("Business has been registed!..");
            openEditForm(businessDocRef.id);
        });
        //});

      
