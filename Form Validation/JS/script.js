//We need an addEvent listener
//we have lot of events
//use checkValidity()
//we need to check the password match

//DOM Elements
//Access the form element
let formEl = document.getElementById("form");
let messageEl = document.getElementById("message");
let messageContainerEl = document.querySelector(".message-container");
/*let password1 = document.getElementById("password1");
let password2 = document.getElementById("password2");*/
/*OR*/
let passwords = document.querySelectorAll(".password"); //nodelist-we can use foreach

/*********************************************************** */
/*Flags /Variables*/
let isValid = false; //we use false since we expect a booelan value in isValid variable
let passwordMatch = false; //false because when user comes the password is false
let storedData = {}; //expecting an object to collect user values
/************************************************************** */
/*FUNCTION to Validate the form before we store data*/
const validateForm = () => {
    isValid = formEl.checkValidity(); //Returns true if an input element contains valid data.
    //console.log(isValid)
    if (!isValid) {
        //if( is valid is false)
        messageEl.innerHTML = "Something is Wrong";
        messageContainerEl.classList.remove("pass");
        messageContainerEl.classList.add("fail");
        return false;
    } else {
        messageEl.innerHTML = "Registration Successful";
        messageContainerEl.classList.remove("fail");
        messageContainerEl.classList.add("pass");
        return true;
    }
};
/******************************************************** */

/*FUNCTION to check password*/
const checkPassword = () => {
    let password1Value = passwords[0].value;
    let password2Value = passwords[1].value;

    if (password1Value === password2Value) {
        messageContainerEl.classList.remove("fail");
        messageContainerEl.classList.add("pass");

        passwordMatch = true; //true when password is true run below

        passwords.forEach((password) => {
            //ternary operator
            passwordMatch === true ? password.classList.remove("fail") + password.classList.add("pass") : "";
        });
        return true;
    } else {
        messageEl.innerHTML = "Password Mismatch Found";
        messageContainerEl.classList.remove("pass");
        messageContainerEl.classList.add("fail");

        passwords.forEach((password) => {
            //ternary operator
            passwordMatch === true ? password.classList.remove("pass") + password.classList.add("fail") : "";
        });
        return false;
    }
};

/*-----------------------------------------------------*/
//FUNCTION to store data
const storeFormData = () => {
    //we have more than one value, we can store in an object
    //we need to execute this fn only if  validateForm(); and checkPassword()-->returns true
    storedData = {
        fullName: formEl.name.value,
        phNumber: formEl.phone.value,
        email: formEl.email.value,
        website: formEl.website.value,
        password: formEl.password1.value,
    };
    console.log(storedData);
};

/********************************************************** */
//FUNCTION- to process Form DataLets start processing the form data
const processFormData = (event) => {
    event.preventDefault(); 
    
    let check1=false;
    let check2=false;

    //to prevent refresh , data wont get send
    //Form validation
       check1 = validateForm();
    //Check password match
    if (check1 === true) {
      check2 = checkPassword();
    }
    //now data is ready, send it
    //store data only if validateForm() and checkPassword() returns true
    if (check1 === true && check2 === true) {
        storeFormData();
    } else {
        console.log("Something is wrong"); //test purpose
    }
};

//Event Listeners
//Check if user click or not , by adding add event listener
formEl.addEventListener("submit", processFormData);
