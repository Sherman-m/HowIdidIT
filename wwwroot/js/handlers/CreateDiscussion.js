async function createDiscussion(form, userId) {
    return await fetch("../api/discussions", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({
            name: form.nameOfNewDiscussion.value,
            description: form.descriptionOfNewDiscussion.value,
            topicId: form.selectTopic.value,
            userId: userId
        })
    });
}

function addModalForCreatingDiscussion() {
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForCreatingDiscussion";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForCreatingDiscussionTitle">Создание обсуждения</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <form id="create-discussion" class="d-flex flex-column">\n' +
        '                    <div class="name-of-new-discussion">\n' +
        '                        <label for="nameOfNewDiscussion">Напишите название:</label>\n' +
        '                        <input type="text" id="nameOfNewDiscussion" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="description-of-new-discussion">' + 
        '                       <label for="descriptionOfNewDiscussion">Добавьте описание:</label>' +
        '                       <textarea id="descriptionOfNewDiscussion" class="form-control"></textarea>' +
        '                    </div> ' +
        '                    <div class="select-topic-for-new-discussion">\n' +
        '                        <label for="chooseTopic">Выберете раздел:</label>\n' +
        '                        <select class="form-select" id="selectTopic">\n' +
        '                        </select>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Закрыть</button>\n' +
        '                <button type="submit" class="btn btn-dark" id="submit-create-discussion" form="create-discussion">Создать</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

async function handlerCreateDisc(userId, btnCreatingDiscussion) {
    btnCreatingDiscussion.removeEventListener("click", redirectOnLoginPage);

    btnCreatingDiscussion.setAttribute("data-bs-toggle", "modal");
    btnCreatingDiscussion.setAttribute("data-bs-target", "#ModalForCreatingDiscussion");
    
    addModalForCreatingDiscussion();
    
    let loadTopicsResponse = await loadTopics();
    if (loadTopicsResponse.ok) {
        let dataTopics = await loadTopicsResponse.json();
        
        let topicSelectionList = document.getElementById("selectTopic");
        if (topicSelectionList) {
            if (dataTopics.length === 0) {
                document.getElementById("submit-create-discussion").setAttribute("disabled", true);
            }
            for (let topic of dataTopics) {
                let opt = document.createElement("option");
                opt.setAttribute("value", topic.topicId);
                opt.innerText = topic.name;
                topicSelectionList.appendChild(opt);
            }
        }
    }

    let formCreateDiscussion = document.getElementById("create-discussion");
    formCreateDiscussion.addEventListener("submit", async function (event) {
        event.preventDefault();

        let createDiscResponse = await createDiscussion(event.target, userId);
        if (createDiscResponse.ok) {
            let dataCreateDisc = await createDiscResponse.json();
            window.location.href = "/discussions/" + dataCreateDisc.discussionId;
        }
    });
}
