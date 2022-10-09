function checkPasswords(form) {
    return form.password.value === form.confirmPassword.value;
}

async function changeUserPassword(userId, form) {
    return await fetch("/api/users/" + userId + "/recover-password", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            password: form.confirmPassword.value
        })
    });
}

async function changePassword(event) {
    event.preventDefault();
    clearWarnings();
    
    let checkPasswordsResult = checkPasswords(event.target);
    if (checkPasswordsResult) {
        let userId = window.location.pathname.split("/").at(2);
        let changePasswordResponse = await changeUserPassword(userId, event.target);
        if (changePasswordResponse.ok) {
            window.location.href = "/";
        }
    } else {
        let warning = document.createElement("p");
        warning.className = "warning";
        warning.innerText = "Пароли не совпадают";
        event.target.appendChild(warning);
    }
}

async function handlerChangePassword() {
    let form = document.forms["changes-block"];
    form.addEventListener("submit", changePassword);
}