async function sendData(form) {
    return await fetch("api/user/register", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.floatingLogin.value,
            password: form.floatingConfirmPassword.value
        })
    });
}

async function register(event) {
    await event.preventDefault();
    if (form.floatingPassword.value !== form.floatingConfirmPassword.value) {
        let warningPassw = document.createElement("p");
        warningPassw.className = "warning";
        warningPassw.innerText = "Пароли не совпадают";
        document.getElementById("floatingConfirmPassword").append(warningPassw);
        return false;
    }
    let response = await sendData(form);
    if (response.ok) {
        return await login(form);
    }
    else {
        let warningFail = document.createElement("p");
        warningFail.className = "warning";
        warningFail.innerText = "Что-то пошло не так";
        document.getElementById("register-form").append(warningFail);
        return false;
    }
}

async function login(form) {
    let response = await fetch("api/user/login", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.floatingLogin.value,
            password: form.floatingPassword.value
        })
    });
    if (response.ok) {
        return window.location.href = "/";
    }
    else {
        return alert(response.statusText);
    }
}

const form = document.getElementById("register-form");
form.addEventListener("submit", register);



