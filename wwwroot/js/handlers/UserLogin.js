async function login(form) {
    return await fetch("../api/users/login", {
        method: "POST", 
        headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
        body: JSON.stringify({
            login: form.login.value,
            password: form.password.value
        }) 
    });
}

async function handlerLogin(event) {
    event.preventDefault();
    
    let loginResponse = await login(event.target);

    if (loginResponse.ok) {
        window.location.href = "/";
    }
    else {
        let warning = document.createElement("p");
        warning.className = "warning";
        warning.innerText = "Неправильный логин или пароль";
        document.getElementById("login-block").appendChild(warning);
    }
}

function handlerUserLogin() {
    let form = document.forms["login-block"];
    form.addEventListener("input", clearWarnings)
    form.addEventListener("submit", handlerLogin);
}




