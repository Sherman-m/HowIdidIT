﻿function redirectOnLoginPage(event) {
    event.preventDefault();
    window.location.href = "/login";
}

function redirectOnRegistrationPage(event) {
    event.preventDefault();
    window.location.href = "/registration";
}

function handlerDefaultEventsForButtons() {
    let btnAuth = document.getElementById("btn-auth");
    if  (btnAuth) {
        btnAuth.addEventListener("click", redirectOnLoginPage);
    }
    
    let btnRegister = document.getElementById("btn-reg");
    if (btnRegister) {
        btnRegister.addEventListener("click", redirectOnRegistrationPage);
    }

    let btnCreateDisc = document.getElementById("btn-create-disc");
    if (btnCreateDisc) {
        btnCreateDisc.addEventListener("click", redirectOnLoginPage);
    }
}


