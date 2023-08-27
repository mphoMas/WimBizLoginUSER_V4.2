//Global Variables
var searchbarActive = false;

//Static Data
const users = [
    { id: 0, firstName: "Dumisinkosi", lastName: "Khumalo", admin: true },
    { id: 1, firstName: "Boitumelo", lastName: "Tlhapane", admin: true },
    { id: 2, firstName: "Matamela", lastName: "Manenzhe", admin: false },
    { id: 3, firstName: "Siziphiwe", lastName: "Ndzamela", admin: false },
    { id: 4, firstName: "Kelebogile", lastName: "Malatji", admin: false },
    { id: 5, firstName: "Oamogetswe", lastName: "Ditema", admin: false },
    { id: 6, firstName: "Mikara", lastName: "Pather", admin: false },
    { id: 7, firstName: "Mpho", lastName: "Mashile", admin: false },
    { id: 8, firstName: "Kiaran", lastName: "Reddy", admin: false },
]

//Dynamic elements to be turned into components

//Handles search bar visibility(show/hide)
function handleSearchbar() {
    const searchbar = document.getElementById("searchbar");
    const showBtn = document.getElementById("showBtn");
    

    if (searchbar.classList.contains("hide")) {
        searchbar.classList.remove("hide");
        searchbar.classList.add("searchbar");
        showBtn.innerText = "close";
        searchbarActive=true;
        filterAdmins();
        filterUsers();
    } else {
        searchbar.classList.remove("searchbar");
        searchbar.classList.add("hide");
        showBtn.classList.remove("hide");
        showBtn.innerText = "person_add"
        searchbarActive=false;
        filterAdmins();
        filterUsers();
    }

}

function handleSideBar(){
    
}

function filterUsers(elementId) {
    const container = document.getElementById("listContainer")
    const searchbar = document.getElementById(elementId);
    const filter = searchbar?searchbar.value:"";
    console.log(filter)
    container.innerHTML = ''
    users.forEach((user) => {
        console.log(user.id)
        //Filter parameters string is compared against when filtering. Can be 
        //made dynamic with conditional statements to filter against specific fields i.e. ID or Last Name
        var filterParameters = user.firstName.toLocaleLowerCase() + " " + user.lastName.toLocaleLowerCase()
        var userBox = document.createElement("div")
        if (searchbarActive == true && user.admin == false && filterParameters.toLocaleLowerCase() == '') {
            userBox.id = user.id
            userBox.classList.add("userBox")
            userBox.innerHTML = `
            <p class="medText">${user.firstName + " " + user.lastName}</p>
            <div id="admindropdown${user.id}" class="between centerVert">
                <p onclick="setAdmin(${user.id})" class="txtbtn">
                    Add Admin
                </p>
            </div>
            `
        } else if (searchbarActive == true && user.admin == false && filterParameters.includes(filter.toLocaleLowerCase())) {
            userBox.id = user.id
            userBox.classList.add("userBox")
            userBox.innerHTML = `
            <p class="medText">${user.firstName + " " + user.lastName}</p>
            <div id="admindropdown${user.id}" class="between centerVert">
                <p onclick="setAdmin(${user.id})" class="txtbtn">
                    Add Admin
                </p>
            </div>
        `}

        container.appendChild(userBox)
    })

}

function setAdmin(userId) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == userId) {
            users[i].admin = true
            break;
        }
    }
    filterUsers()
}

function removeAdmin(userId){
    for (let i = 0; i< users.length; i++) {
        if(users[i].id == userId){
            users[i].admin = false
            break;
        }
    }
    filterAdmins()
}

function filterAdmins() {
    const container = document.getElementById("adminListContainer")
    container.innerHTML = ''
    users.forEach((user) => {
        console.log(user.id)
        //Filter parameters string is compared against when filtering. Can be 
        //made dynamic with conditional statements to filter against specific fields i.e. ID or Last Name
        // var filterParameters = user.firstName.toLocaleLowerCase() + " " + user.lastName.toLocaleLowerCase()
        var adminBox = document.createElement("div")
        if (searchbarActive == false && user.admin == true) {
            adminBox.id = user.id
            adminBox.classList.add("userBox")
            adminBox.innerHTML = `
            <p class="medText">${user.firstName + " " + user.lastName}</p>
            <div id="admindropdown${user.id}" class="between centerVert">
                <p onclick="removeAdmin(${user.id})" class="txtbtn">
                    Remove Admin
                </p>
            </div>
            `
        }

        container.appendChild(adminBox)
    })


}

document.addEventListener("DOMContentLoaded", function () {
    filterAdmins()
    filterUsers()
});