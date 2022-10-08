function checkPasswords(form) {
    return form.password.value === form.confirmPassword.value;
}

async function register(form) {
    return await fetch("../api/users/registration", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.login.value,
            password: form.confirmPassword.value
        })
    });
}

async function login(form) {

    return await fetch("../api/users/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.login.value,
            password: form.confirmPassword.value
        })
    });
}

async function handlerRegistration(event) {
    await event.preventDefault();
    
    let matchingPasswords = checkPasswords(event.target);
    if (matchingPasswords) {
 
        let registrationResponse = await register(event.target);
        if (registrationResponse.ok) {
            
            let loginResponse = await login(event.target);
            if (loginResponse.ok) {
                
                window.location.href = "/";
            }
        } else {
            let warningFail = document.createElement("p");
            warningFail.className = "warning";
            warningFail.innerText = "Что-то пошло не так";
            document.getElementById("registration-block").append(warningFail);
        }
    }
    else {
        let warningPasswd = document.createElement("p");
        warningPasswd.className = "warning";
        warningPasswd.innerText = "Пароли не совпадают";
        document.getElementById("registration-block").append(warningPasswd);
    }
}

function handlerUserRegistration() {
    let form = document.getElementById("registration-block");
    form.addEventListener("input", clearWarnings);
    form.addEventListener("submit", handlerRegistration);
}






