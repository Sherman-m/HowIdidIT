async function loadDataUser(userId) {
    return await fetch("../api/users/" + userId);
}

async function handlerLoadDataForUser() {
    let userId = window.location.pathname.split("/").at(2);
    let loadDataUserResponse = await loadDataUser(userId);
    if (loadDataUserResponse.ok) {
        let dataUser = await loadDataUserResponse.json();
        document.title = dataUser.login;
        document.getElementById("user-login").innerText = dataUser.login;
        document.getElementById("date-of-registration").innerText = "Дата регистрации: " + dataUser.dateOfRegistration.slice(0, 10);
        document.getElementById("user-description").innerText = dataUser.description;
    }
}