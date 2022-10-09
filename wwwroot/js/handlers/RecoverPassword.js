async function getUserByLogin(form) {
    return await fetch("../api/users/recover-password", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.login.value
        })
    });
}

async function checkLogin(event) {
    event.preventDefault();
    
    let getUserByLoginResponse = await getUserByLogin(event.target);
    if (getUserByLoginResponse.ok) {
        let userData = await getUserByLoginResponse.json();
        window.location.href = /users/ + userData.userId + "/change-password";
    }
}

async function handlerRecoverPassword() {
    let form = document.forms["login-block"];
    form.addEventListener("submit", checkLogin);
}