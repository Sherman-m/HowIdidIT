function redirectOnLoginPage(event) {
    event.preventDefault();
    window.location.href = "/login";
}

function redirectOnRegistrationPage() {
    window.location.href = "/registration";
}

function main() {
    const btnAuth = document.getElementById("btn-auth");
    btnAuth.addEventListener("click", redirectOnLoginPage);

    const btnRegister = document.getElementById("btn-reg");
    btnRegister.addEventListener("click", redirectOnRegistrationPage);
}

window.addEventListener("load", main);



