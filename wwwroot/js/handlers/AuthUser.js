async function authUser() {
    return await fetch("../api/user/info");
}

function setLoginInHeader(data) {
    document.getElementById("btn-auth").remove();
    document.getElementById("btn-reg").remove();

    let login = document.createElement("div");
    login.className = "login-name";
    login.innerText = data.login;
    document.getElementById("my-nav-bar2").appendChild(login);
}

function setFavorites(selectedDiscussions, selectedTopics, favoritesBlock) {
    favoritesBlock.className = "content-block";
    favoritesBlock.innerHTML = '<h3 class=\"text-center\">Избранное</h3><hr>\n' +
        '            <div id=\"links-for-favorites\">\n' +
        '            </div>';
    
    if (selectedDiscussions) {
        let listOfDisc = document.createElement("ul");
        listOfDisc.innerText = "Обсуждения";

        for (let favoriteDisc of selectedDiscussions) {
            let linkOnDisc = document.createElement("a");
            linkOnDisc.href = "/discussion/&id=" + favoriteDisc.discussionId;
            linkOnDisc.innerText = favoriteDisc.name;

            listOfDisc.appendChild(document.createElement("li").appendChild(linkOnDisc));
        }

        favoritesBlock.getElementById("links-for-favorites").appendChild(listOfDisc);
    }
    
    if (selectedTopics) {
        let listOfTopics = document.createElement("ul");
        listOfTopics.innerText = "Обсуждения";

        for (let favoriteTopic of selectedTopics) {
            let linkOnDisc = document.createElement("a");
            linkOnDisc.href = "/discussion/&id=" + favoriteTopic.topicId;
            linkOnDisc.innerText = favoriteTopic.name;

            listOfTopics.appendChild(document.createElement("li").appendChild(linkOnDisc));
        }

        favoritesBlock.getElementById("links-for-favorites").appendChild(listOfTopics);
    }
}

function enableCreateDisc(btnCreatingDisc) {
    btnCreatingDisc.removeEventListener("click", redirectOnLoginPage);

    btnCreatingDisc.setAttribute("data-bs-toggle", "modal");
    btnCreatingDisc.setAttribute("data-bs-target", "#ModalForCreatingDisc");
    
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForCreatingDisc";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForCreatingDiscTitle">Создание обсуждения</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <form id="create-desc" class="d-flex flex-column">\n' +
        '                    <div class="name-of-new-disc">\n' +
        '                        <label for="nameOfNewDisc">Напишите название:</label>\n' +
        '                        <input type="text" id="nameOfNewDesc" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="question-of-new-disc">\n' +
        '                        <label for="questionForDisc">Задайте ваш вопрос:</label>\n' +
        '                        <textarea id="questionOfNewDisc" class="form-control"></textarea>\n' +
        '                    </div>\n' +
        '                    <div class="select-topic-for-new-disc">\n' +
        '                        <label for="chooseTopic">Выберете раздел:</label>\n' +
        '                        <select class="form-select" id="selectTopic">\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Закрыть</button>\n' +
        '                <button type="submit" class="btn btn-dark" form="create-disc">Создать</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

async function handlerAuthUser() {
    let authResponse = await authUser();
    if (authResponse.ok) {
        
        let dataUser = await authResponse.json();

        setLoginInHeader(dataUser);
        
        let favorites = document.getElementById("favorites-block");
        if (favorites) {
            setFavorites(dataUser.selectedDiscussions, dataUser.selectedTopics, favorites);
        }
        
        let btnCreatingDisc = document.getElementById("btn-create-disc");
        if (btnCreatingDisc) {
            enableCreateDisc(btnCreatingDisc);
        }
    }
}