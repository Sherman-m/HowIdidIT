async function auth(form) {
    return await fetch("api/user/login", {
        method: "POST", 
        headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
        body: JSON.stringify({
            login: form.floatingLogin.value,
            password: form.floatingPassword.value
        }) 
    });
}

async function handlerLogin(event) {
    event.preventDefault();
    
    let authResponse = await auth(event.target);
    if (authResponse.ok) {
        window.location.href = "/";
    }
    else {
        let warning = document.createElement("p");
        warning.className = "warning";
        warning.innerText = "Неправильный логин или пароль";
        document.getElementById("login-block").appendChild(warning);
    }
}

function main() {
    let form = document.getElementById("auth-form");
    form.addEventListener("submit", handlerLogin);
}

window.addEventListener("load", main);




