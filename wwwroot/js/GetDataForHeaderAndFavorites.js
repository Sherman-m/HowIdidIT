async function loadDataAboutUser() {
    return await fetch("api/user/info");
}

function setLoginInHeader(data) {
    document.getElementById("btn-auth").style.display = "none";
    document.getElementById("btn-reg").style.display = "none";

    let login = document.createElement("div");
    login.className = "login-name";
    login.innerText = data.login;
    document.getElementById("my-nav-bar2").appendChild(login);
}

function setFavorites(data, favoriteBlock) {
    favoriteBlock.style.display = "block";
}

async function main() {
    let dataUserResponse = await loadDataAboutUser();
    if (dataUserResponse.ok) {
        
        let dataUser = await dataUserResponse.json();
        
        setLoginInHeader(dataUser);
        
        let favorites = document.getElementById("favorites-block");
        if (favorites) {
            setFavorites(dataUser, favorites);
        }
    }
}

window.addEventListener("load", main);