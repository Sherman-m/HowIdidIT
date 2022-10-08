function checkPasswords(form) {
    return form.newPassword.value === form.confirmNewPassword.value;
}


async function updateUserFrontSide(form, userId) {
    return await fetch("../api/users/" + userId + "/update-user-front-side", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            login: form.userLogin.value,
            description: form.userDescription.value
        })
    });
}

async function changeUserPassword(form, userId) {
    return await fetch("../api/users/" + userId + "/update-password", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            oldPassword: form.oldPassword.value,
            newPassword: form.confirmNewPassword.value
        })
    });
}

async function deleteUser(userId) {
    return await fetch("../api/users/" + userId, {
        method: "DELETE"
    });
}

async function handlerUpdateUserFrontSide(event, userId) {
    event.preventDefault();
    
    let updateUserFrontSideResponse = await updateUserFrontSide(event.target, userId);
    if (updateUserFrontSideResponse.ok) {
        let updateUserFrontSide = await updateUserFrontSideResponse.json();
        handlerLoadDataForProfile(
            updateUserFrontSide.login, 
            updateUserFrontSide.dateOfRegistration.slice(0, 10),
            updateUserFrontSide.description
        );
        enableUpdateUser(event.target, updateUserFrontSide);
        
        let notification = document.createElement("p");
        notification.className = "notification";
        notification.innerText = "Данные были успешно изменены"
        event.target.appendChild(notification);
    }
}

async function handlerChangeUserPassword(event, userId) {
    event.preventDefault();
    
    let checkPasswordsResult = checkPasswords(event.target);
    if (checkPasswordsResult) {
        let changeUserPasswordResponse = await changeUserPassword(event.target, userId)
        if (changeUserPasswordResponse.ok) {
            let notification = document.createElement("p");
            notification.className = "notification";
            notification.innerText = "Данные были успешно изменены"
            document.getElementById("profile-block").appendChild(notification);
            document.getElementById("btn-close-change-password").click();
            event.target.reset();
        }
        else {
            let warning = document.createElement("p");
            warning.className = "warning";
            warning.innerText = "Что-то пошло не так";
            document.getElementById("profile-block").appendChild(warning);
        }
    }
    else {
        let warning = document.createElement("p");
        warning.className = "warning";
        warning.innerText = "Пароли не совпадают";
        event.target.appendChild(warning);
    }
}

async function handlerDeleteUser(event, userId) {
    event.preventDefault();
    
    let deleteUserResponse = await deleteUser(userId);
    if (deleteUserResponse.ok) {
        window.location.href = "/";
    }
}

function enableUpdateUser(form, dataUser) {
    clearForm();
    if (form.userLogin.value !== dataUser.login || form.userDescription.value !== dataUser.description) {
        form.saveUpdates.removeAttribute("disabled");
    }
    else {
        form.saveUpdates.setAttribute("disabled", true);
    }
}

async function handlerEditProfile(dataUser) {
    let formEditProfile = document.forms["profile-block"];
    formEditProfile.addEventListener("submit", async (event) => 
        await handlerUpdateUserFrontSide(event, dataUser.userId));
    
    formEditProfile.addEventListener("input", () => enableUpdateUser(formEditProfile, dataUser));
    
    let formChangePassword = document.forms["change-password-block"];
    formChangePassword.addEventListener("input", clearForm);
    formChangePassword.addEventListener("submit", async (event) =>
        await handlerChangeUserPassword(event, dataUser.userId)
    );
    
    document.getElementById("delete-user").addEventListener("click", async (event) => 
        await handlerDeleteUser(event, dataUser.userId));
}
