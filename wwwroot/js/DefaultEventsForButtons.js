function redirectOnLoginPage(event) {
    event.preventDefault();
    window.location.href = "/login";
}

function redirectOnRegistrationPage(event) {
    event.preventDefault();
    window.location.href = "/registration";
}

function main() {
    let btnAuth = document.getElementById("btn-auth");
    if  (btnAuth) {
        btnAuth.addEventListener("click", redirectOnLoginPage);
    }
    
    let btnRegister = document.getElementById("btn-reg");
    if (btnRegister) {
        btnRegister.addEventListener("click", redirectOnRegistrationPage);
    }

    let btnCreateDesc = document.getElementById("btn-create-desc");
    if (btnCreateDesc) {
        btnCreateDesc.addEventListener("click", redirectOnLoginPage);
    }
}

window.addEventListener("load", main);



