fetch("api/user/info").then(async function (response) {
    if (response.ok) {
        let data = await response.json();
        document.getElementById("btn-auth").style.display = "none";
        document.getElementById("btn-reg").style.display = "none";
        document.getElementById("favorites-block").style.display = "block";

        let login = document.createElement("div");
        login.className = "login-name";
        login.innerText = data.login;
        document.getElementById("my-nav-bar2").appendChild(login);
    }
    else {
        console.log(response.status);
    }
});