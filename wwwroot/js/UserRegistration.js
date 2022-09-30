function checkPasswords(form) {
    return form.floatingPassword.value === form.floatingConfirmPassword.value;
    
}

async function register(form) {
    return await fetch("api/user/register", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.floatingLogin.value,
            password: form.floatingConfirmPassword.value
        })
    });
}

async function login(form) {
    console.log(form);
    return await fetch("api/user/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.floatingLogin.value,
            password: form.floatingPassword.value
        })
    });
}

async function handlerRegistration(event) {
    await event.preventDefault();
    
    let matchingPasswords = checkPasswords(event.currentTarget);
    if (matchingPasswords) {
 
        let registrationResponse = await register(event.currentTarget);
        if (registrationResponse.ok) {
            
            let loginResponse = await login(event.target);
            if (loginResponse.ok) {
                
                window.location.href = "/";
            }
        } else {
            let warningFail = document.createElement("p");
            warningFail.className = "warning";
            warningFail.innerText = "Что-то пошло не так";
            document.getElementById("register-form").append(warningFail);
        }
    }
    else {
        let warningPasswd = document.createElement("p");
        warningPasswd.className = "warning";
        warningPasswd.innerText = "Пароли не совпадают";
        document.getElementById("registration-block").append(warningPasswd);
    }
}

function main() {
    let form = document.getElementById("registration-block");
    form.addEventListener("submit", handlerRegistration);
}

window.addEventListener("load", main);






