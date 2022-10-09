function editingSelectedTopics(userId, selectedTopics, favoritesBlock) {
    let blockForEditingTopics = document.querySelector("#block-for-editing-topics > ul");
    blockForEditingTopics.innerHTML = "";
    for (let selectedTopic of selectedTopics) {

        let divForLink = document.createElement("div");
        divForLink.className = "d-flex justify-content-between align-items-center";

        let linkOnTopic = document.createElement("a");
        linkOnTopic.href = "/topics/" + selectedTopic.topicId;
        linkOnTopic.innerText = selectedTopic.name;

        let row = document.createElement("li");
        row.appendChild(linkOnTopic);

        let buttonRemove = document.createElement("button");
        buttonRemove.className = "btn-remove";
        buttonRemove.type = "button";
        buttonRemove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aliceblue" class="bi bi-trash-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>\n' +
            '</svg>'

        buttonRemove.addEventListener("click", async function(event) {
            let removingResponse = await removeTopicFromFavorite(userId, selectedTopic.topicId);
            if (removingResponse.ok) {
                let updateSelectedTopics = await removingResponse.json();
                editingSelectedTopics(userId, updateSelectedTopics.selectedTopics, favoritesBlock);

                if (favoritesBlock)
                    setSelectedTopicsInFavorites(updateSelectedTopics.selectedTopics);

                let topicId = window.location.pathname.split("/").at(2);
                if (selectedTopic.topicId === Number(topicId)) {
                    let checkbox = document.querySelector("#isFavorite");
                    if (checkbox) {
                        checkbox.checked = false;
                        document.querySelector("label[for='isFavorite']").className = "btn shadow-none checkbox-unchecked";
                    }
                }
            }
        });

        divForLink.append(row, buttonRemove);
        blockForEditingTopics.appendChild(divForLink);
    }
}

function editingSelectedDiscussions(userId, selectedDiscussions, favoritesBlock) {
    let blockForEditingDiscussions = document.querySelector("#block-for-editing-discussions > ul");
    blockForEditingDiscussions.innerHTML = "";

    for (let selectedDiscussion of selectedDiscussions) {

        let divForLink = document.createElement("div");
        divForLink.className = "d-flex justify-content-between align-items-center";

        let linkOnDiscussion = document.createElement("a");
        linkOnDiscussion.href = "/discussions/" + selectedDiscussion.discussionId;
        linkOnDiscussion.innerText = selectedDiscussion.name;

        let row = document.createElement("li");
        row.appendChild(linkOnDiscussion);

        let buttonRemove = document.createElement("button");
        buttonRemove.className = "btn-remove";
        buttonRemove.type = "button";
        buttonRemove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aliceblue" class="bi bi-trash-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>\n' +
            '</svg>'

        buttonRemove.addEventListener("click", async function() {
            let removingResponse = await removeDiscussionFromFavorite(userId, selectedDiscussion.discussionId);
            if (removingResponse.ok) {
                let updateSelectedDiscussion = await removingResponse.json();
                editingSelectedDiscussions(userId, updateSelectedDiscussion.selectedDiscussions, favoritesBlock);
                
                if (favoritesBlock) {
                    setSelectedDiscussionsInFavorites(updateSelectedDiscussion.selectedDiscussions);
                }
                
                let discussionId = window.location.pathname.split("/").at(2);
                if (selectedDiscussion.discussionId === Number(discussionId)) {
                    let checkbox = document.querySelector("#isFavorite");
                    if (checkbox) {
                        checkbox.checked = false;
                        document.querySelector("label[for='isFavorite']").className = "btn shadow-none checkbox-unchecked";
                    }
                }
            }
        });

        divForLink.append(row, buttonRemove);
        blockForEditingDiscussions.appendChild(divForLink);
    }
}

function addModalForEditingFavorites() {
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "EditFavoritesModal";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title">Избранное\n' +
        '                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 16 16">\n' +
        '                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>\n' +
        '                    </svg>\n' +
        '                </h5>\n' +
        '                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>\n' +
        '            </div>\n' +
        '            <div id="edit-favorites" class="modal-body">\n' +
        '                <div id="links-for-editing-favorites">\n' +
        '                    <div id="block-for-editing-topics">\n' +
        '                        <i>\n' +
        '                            <U>Разделы</U>\n' +
        '                        </i>\n' +
        '                        <ul></ul>\n' +
        '                    </div>\n' +
        '                    <div id="block-for-editing-discussions">\n' +
        '                        <i>\n' +
        '                            <U>Обсуждения</U>\n' +
        '                        </i>\n' +
        '                        <ul></ul>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Закрыть</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.appendChild(modal);
    new bootstrap.Modal(modal);
}

function handlerEditingFavorites(userId, selectedTopics, selectedDiscussions, favoritesBlock) {
    if (favoritesBlock) {
        let favoritesHeader = favoritesBlock.firstChild;
        addModalForEditingFavorites();
        favoritesHeader.setAttribute("data-bs-toggle", "modal");
        favoritesHeader.setAttribute("data-bs-target", "#EditFavoritesModal");
    }
    editingSelectedTopics(userId, selectedTopics, favoritesBlock);
    editingSelectedDiscussions(userId, selectedDiscussions, favoritesBlock);
}