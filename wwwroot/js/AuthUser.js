async function authUser() {
    return await fetch("api/user/info");
}

function setLoginInHeader(data) {
    document.getElementById("btn-auth").remove();
    document.getElementById("btn-reg").remove();

    let login = document.createElement("div");
    login.className = "login-name";
    login.innerText = data.login;
    document.getElementById("my-nav-bar2").appendChild(login);
}

function setFavorites(data, favoritesBlock) {
    favoritesBlock.className = "content-block";
    favoritesBlock.innerHTML = '<h3 class=\"text-center\">Избранное</h3><hr>\n' +
        '            <ul id=\"links-for-favorites\">\n' +
        '            </ul>';
}

function enableCreateDesc(btnCreateDesc) {
    btnCreateDesc.removeEventListener("click", redirectOnLoginPage);
    
    btnCreateDesc.setAttribute("data-bs-toggle", "modal");
    btnCreateDesc.setAttribute("data-bs-target", "#ModalForCreatingDesc");
    
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForCreatingDesc";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForCreatingDescTitle">Создание обсуждения</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <form id="create-desc" class="d-flex flex-column">\n' +
        '                    <div class="name-of-new-desc">\n' +
        '                        <label for="nameOfNewDesc">Напишите название:</label>\n' +
        '                        <input type="text" id="nameOfNewDesc" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="your-question">\n' +
        '                        <label for="questionForDisc">Задайте ваш вопрос:</label>\n' +
        '                        <textarea id="questionForDisc" class="form-control"></textarea>\n' +
        '                    </div>\n' +
        '                    <div class="select-topic">\n' +
        '                        <label for="chooseTopic">Выберете раздел:</label>\n' +
        '                        <select class="form-select" id="chooseTopic">\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Закрыть</button>\n' +
        '                <button type="button" class="btn btn-dark">Создать</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

async function main() {
    let authResponse = await authUser();
    if (authResponse.ok) {
        
        let dataUser = await authResponse.json();
        
        setLoginInHeader(dataUser);
        
        let favorites = document.getElementById("favorites-block");
        if (favorites) {
            setFavorites(dataUser, favorites);
        }
        
        let btnCreateDesc = document.getElementById("btn-create-desc");
        if (btnCreateDesc) {
            enableCreateDesc(btnCreateDesc);
        }
    }
}

window.addEventListener("load", main);