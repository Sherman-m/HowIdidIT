async function authUser() {
    return await fetch("../api/users/auth");
}

function setLoginInHeader(data) {
    document.getElementById("btn-auth").remove();
    document.getElementById("btn-reg").remove();

    let loginMenu = document.createElement("div");
    loginMenu.className = "dropdown";
    loginMenu.innerHTML = '<div class="dropdown">' +
        '            <button class="btn btn-dark dropdown-toggle" type="button" id="loginMenu" data-bs-toggle="dropdown" aria-expanded="false">' +
        '                ' + data.login +
        '            </button>' +
        '            <ul class="dropdown-menu login-menu" aria-labelledby="dropdownLoginMenuButton">' +
        '                <li><a class="dropdown-item" href="/profile">Профиль</a></li>' +
        '                <li><a class="dropdown-item" href="/logout">Выйти</a></li>' +
        '            </ul>' +
        '        </div>'
    
    document.getElementById("my-nav-bar2").appendChild(loginMenu);
}

function setFavoritesBlock(favoritesBlock) {
    favoritesBlock.className = "content-block";
    favoritesBlock.innerHTML = '<h3 class=\"text-center\">Избранное</h3><hr>\n' +
        '            <div id=\"links-for-favorites\">\n' +
        '               <div id="block-for-topics">' +
        '                   <i>' +
        '                       <U>Разделы</U>' +
        '                   </i>' +
        '                   <ul></ul>' +
        '               </div> ' +
        '               <div id="block-for-discussions">' +
        '                   <i>' +
        '                       <U>Обсуждения</U>' +
        '                   </i>' +
        '                   <ul></ul>' +
        '                </div>' +
        '            </div>';
}

function setSelectedTopicsInFavorites(selectedTopics) {
    let blockForTopics = document.querySelector("#block-for-topics > ul");
    blockForTopics.innerHTML = "";
    
    for (let favoriteTopic of selectedTopics) {
        let linkOnTopic = document.createElement("a");
        linkOnTopic.href = "/topics/" + favoriteTopic.topicId;
        linkOnTopic.innerText = favoriteTopic.name;

        let row = document.createElement("li");
        row.appendChild(linkOnTopic);
        blockForTopics.appendChild(row);
    }
}

function setSelectedDiscussionsInFavorites(selectedDiscussions) {
    let blockForDiscussions = document.querySelector("#block-for-discussions > ul");
    blockForDiscussions.innerHTML = "";
    
    for (let selectedDiscussion of selectedDiscussions) {
        let linkOnDiscussion = document.createElement("a");
        linkOnDiscussion.href = "/discussions/" + selectedDiscussion.discussionId;
        linkOnDiscussion.innerText = selectedDiscussion.name;

        let row = document.createElement("li");
        row.appendChild(linkOnDiscussion);
        blockForDiscussions.appendChild(row);
    }
}

function addButtonAddToFavorites(headerOfTopicOrDiscussion) {
    headerOfTopicOrDiscussion.innerHTML += '<input type="checkbox" class="btn-check" id="isFavorite">\n' +
        '                    <label class="btn shadow-none checkbox-unchecked" for="isFavorite">\n' +
        '                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">\n' +
        '                            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>\n' +
        '                        </svg>\n' +
        '                    </label>'
    return document.getElementById("isFavorite")
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
        '                <form id="create-disc" class="d-flex flex-column">\n' +
        '                    <div class="name-of-new-disc">\n' +
        '                        <label for="nameOfNewDisc">Напишите название:</label>\n' +
        '                        <input type="text" id="nameOfNewDisc" class="form-control">\n' +
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
            setFavoritesBlock(favorites);
            setSelectedTopicsInFavorites(dataUser.selectedTopics);
            setSelectedDiscussionsInFavorites(dataUser.selectedDiscussions);
        }
        
        let topicId = window.location.href.split("/").at(4);
        if (topicId !== undefined && window.location.href.split("/").at(3) === "topics") {
            let headerOfTopic = document.getElementById("header-of-topic");
            let checkbox = addButtonAddToFavorites(headerOfTopic);
            handlerAddTopicToFavorites(checkbox, dataUser.userId, Number(topicId), dataUser.selectedTopics);
        }

        let discussionId = window.location.href.split("/").at(4);
        if (discussionId !== undefined && window.location.href.split("/").at(3) === "discussions") {
            let headerOfDiscussion = document.getElementById("header-of-discussion");
            let checkbox = addButtonAddToFavorites(headerOfDiscussion);
            
            handlerAddDiscussionToFavorites(checkbox, dataUser.userId, Number(topicId), dataUser.selectedDiscussions);

        }
        
        let btnCreatingDisc = document.getElementById("btn-create-disc");
        if (btnCreatingDisc) {
            enableCreateDisc(btnCreatingDisc);
        }
        
        let formCreateDisc = document.getElementById("create-disc");
        if (formCreateDisc) {
            await handlerCreateDisc(formCreateDisc, dataUser.userId);
        }
        
        let formSendMessage = document.getElementById("send-message");
        if (formSendMessage) {
            formSendMessage.removeEventListener("submit", redirectOnLoginPage);
            formSendMessage.addEventListener("submit", async function (event) {
                event.preventDefault();

                let discussionId = window.location.pathname.split('/').at(2);
                
                let messageText = formSendMessage.messageContent.value;
                formSendMessage.messageContent.value = "";
                await handlerAddMessage(dataUser.userId, discussionId, messageText);
            });
        }
        
        return dataUser.userId;
    }
    return null;
}