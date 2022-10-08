function handlerLoadDataForProfile(login, dateOfRegistration, description) {
    let form = document.forms["profile-block"];
    form.userLogin.value = login;

    document.getElementById("date-of-registration").innerText = "Дата регистрации: " + dateOfRegistration
    form.userDescription.value = description;
}