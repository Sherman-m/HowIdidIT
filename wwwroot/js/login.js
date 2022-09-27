async function sendData(form) {
    return await fetch("api/user/login", {
        method: "POST", 
        headers: { "Accept": "application/json", "Content-Type": "application/json" }, 
        body: JSON.stringify({
            login: form.floatingLogin.value,
            password: form.floatingPassword.value
        }) 
    });
}

async function authorize(event) {
    await event.preventDefault();
    let response = await sendData(form);
    if (response.ok) {
        return window.location.href = "/";
    }
    else {
        let warning = document.createElement("p");
        warning.className = "warning";
        warning.innerText = "Неправильный логин или пароль";
        document.getElementById("login-block").appendChild(warning);
    }
}

const form = document.getElementById("auth-form");
form.addEventListener("submit", authorize);



