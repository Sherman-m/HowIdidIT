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

async function handlerAuthUser() {
    let authResponse = await authUser();
    if (authResponse.ok) {
        
        let dataUser = await authResponse.json();

        setLoginInHeader(dataUser);
        
        let favoritesBlock = document.getElementById("favorites-block");
        if (favoritesBlock) {
            handlerSettingFavoriteBlock(favoritesBlock, dataUser.selectedTopics, dataUser.selectedDiscussions);
            handlerEditingFavorites(dataUser.userId, dataUser.selectedTopics, dataUser.selectedDiscussions, favoritesBlock);
        }
        
        let topicId = window.location.href.split("/").at(4);
        if (topicId !== undefined && window.location.href.split("/").at(3) === "topics") {
            let headerOfTopic = document.getElementById("header-of-topic");
            let checkbox = addButtonAddToFavorites(headerOfTopic);
            handlerAddTopicToFavorites(checkbox, dataUser.userId, Number(topicId), dataUser.selectedTopics, favoritesBlock);
        }

        let discussionId = window.location.href.split("/").at(4);
        if (discussionId !== undefined && window.location.href.split("/").at(3) === "discussions") {
            let headerOfDiscussion = document.getElementById("header-of-discussion");
            let checkbox = addButtonAddToFavorites(headerOfDiscussion);
            handlerAddDiscussionToFavorites(checkbox, dataUser.userId, Number(topicId), dataUser.selectedDiscussions, favoritesBlock);
        }
        
        let btnCreatingDisc = document.getElementById("btn-create-discussion");
        if (btnCreatingDisc) {
            await handlerCreateDisc(dataUser.userId, btnCreatingDisc);
        }
        
        let formSendMessage = document.getElementById("send-message");
        if (formSendMessage) {
            await handlerAddMessage(dataUser.userId, formSendMessage)
        }
        
        if (window.location.href.split("/").at(3) === "profile") {
            handlerEditingFavorites(dataUser.userId, dataUser.selectedTopics, dataUser.selectedDiscussions);
        }
        
        return dataUser.userId;
    }
    return null;
}