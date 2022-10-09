async function updateTopic(topicId, form) {
    return await fetch("../api/topics/" + topicId + "/edit", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: form.editNameOfTopic.value,
            description: form.editDescriptionOfTopic.value
        })
    });
}

async function deleteTopic(topicId) {
    return await fetch("../api/topics/" + topicId, {
        method: "DELETE"
    });
}

async function handlerUpdateTopic(event, topicId) {
    event.preventDefault();
    
    let updateTopicResponse = await updateTopic(topicId, event.target);
    if (updateTopicResponse.ok) {
        window.location.reload();
    }
}

async function handlerDeleteTopic(event, topicId) {
    event.preventDefault();
    
    let deleteTopicResponse = await deleteTopic(topicId);
    if (deleteTopicResponse.ok) {
        window.location.href = "/topics";
    }
}

function addModalForUpdatingTopic() {
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForEditingTopic";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForEditingTopicTitle">Изменение раздела</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <form id="edit-topic" class="d-flex flex-column">\n' +
        '                    <div class="edit-topic-name">\n' +
        '                        <label for="editNameOfTopic">Название:</label>\n' +
        '                        <input type="text" id="editNameOfTopic" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="edit-description-for-topic">\n' +
        '                        <label for="editDescriptionOfTopic">Описание:</label>\n' +
        '                        <textarea class="form-control" id="editDescriptionOfTopic"></textarea>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Закрыть</button>\n' +
        '                <button type="submit" class="btn btn-dark" id="save-update-topic" form="edit-topic" disabled>Cохранить изменения</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

function addModalForDeletingTopic() {
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForDeletingTopic";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForDeletingTopicTitle">Удаление раздела</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '               <p>Вы уверены что хотите удалить данный раздел?</p>' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Нет</button>\n' +
        '                <button type="button" class="btn btn-dark" id="delete-topic">Удалить</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

function enableEditTopic(dataTopic, form) {
    clearWarnings();
    if (form.editNameOfTopic !== dataTopic.name || form.editDescriptionOfTopic !== dataTopic.description) {
        document.getElementById("save-update-topic").removeAttribute("disabled");
    }
    else {
        document.getElementById("save-update-topic").setAttribute("disabled", true);
    }
}

async function handlerEditTopic(userId, topicId) {
    let loadTopicResponse = await loadCurrentTopic(topicId);
    if (loadTopicResponse.ok) {
        let dataTopic = await loadTopicResponse.json();
        if (dataTopic.user.userId === userId) {
            document.getElementById("buttons-for-topic-discussion-header").innerHTML += '<button type="button" class="btn-edit">\n' +
                '                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aliceblue" class="bi bi-pencil-fill" viewBox="0 0 16 16">\n' +
                '                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>\n' +
                '                        </svg>\n' +
                '                    </button> ';

            document.getElementById("buttons-for-topic-discussion-header").innerHTML += '<button type="button" class="btn-delete">\n' +
                '                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aliceblue" class="bi bi-trash-fill" viewBox="0 0 16 16">\n' +
                '                           <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>\n' +
                '                       </svg>\n' +
                '                    </button> ';
            
            let buttonEditTopic = document.querySelector("#buttons-for-topic-discussion-header > .btn-edit");
            let buttonDeleteTopic = document.querySelector("#buttons-for-topic-discussion-header > .btn-delete");

            buttonEditTopic.setAttribute("data-bs-toggle", "modal");
            buttonEditTopic.setAttribute("data-bs-target", "#ModalForEditingTopic");

            buttonDeleteTopic.setAttribute("data-bs-toggle", "modal");
            buttonDeleteTopic.setAttribute("data-bs-target", "#ModalForDeletingTopic");
            
            addModalForUpdatingTopic();
            addModalForDeletingTopic();
            
            document.getElementById("delete-topic").addEventListener("click", async (event) =>
                await handlerDeleteTopic(event, dataTopic.topicId));
            
            let formEditTopic = document.forms["edit-topic"];
            formEditTopic["editNameOfTopic"].value = dataTopic.name;
            formEditTopic["editDescriptionOfTopic"].value = dataTopic.description;
            
            formEditTopic.addEventListener("input", () => enableEditTopic(dataTopic, formEditTopic));
            
            formEditTopic.addEventListener("submit", async (event) =>
                await handlerUpdateTopic(event, dataTopic.topicId)
            );
        }
    }
}