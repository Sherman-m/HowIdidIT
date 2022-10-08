async function updateDiscussion(discussionId, form) {
    return await fetch("../api/discussions/" + discussionId + "/edit", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: form.editNameOfDiscussion.value,
            description: form.editDescriptionOfDiscussion.value
        })
    });
}

async function deleteDiscussion(discussionId) {
    return await fetch("../api/discussions/" + discussionId, {
        method: "DELETE"
    });
}

async function handlerUpdateDiscussion(event, discussionId) {
    event.preventDefault();

    let updateDiscussionResponse = await updateDiscussion(discussionId, event.target);
    if (updateDiscussionResponse.ok) {
        window.location.reload();
    }
}

async function handlerDeleteDiscussion(event, discussionId) {
    event.preventDefault();

    let deleteDiscussionResponse = await deleteDiscussion(discussionId);
    if (deleteDiscussionResponse.ok) {
        window.location.href = "/topics";
    }
}

function addModalForUpdatingDiscussion() {
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForEditingDiscussion";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForEditingDiscussionTitle">Изменение раздела</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <form id="edit-discussion" class="d-flex flex-column">\n' +
        '                    <div class="edit-discussion-name">\n' +
        '                        <label for="editNameOfDiscussion">Название:</label>\n' +
        '                        <input type="text" id="editNameOfDiscussion" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="edit-description-for-discussion">\n' +
        '                        <label for="editDescriptionOfDiscussion">Описание:</label>\n' +
        '                        <textarea class="form-control" id="editDescriptionOfDiscussion"></textarea>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Закрыть</button>\n' +
        '                <button type="submit" class="btn btn-dark" id="save-update-discussion" form="edit-discussion" disabled>Cохранить изменения</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

function addModalForDeletingDiscussion() {
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForDeletingDiscussion";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForDeletingDiscussionTitle">Удаление обсуждения</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '               <p>Вы уверены что хотите удалить данное обсуждение?</p>' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Нет</button>\n' +
        '                <button type="button" class="btn btn-dark" id="delete-discussion">Удалить</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

function enableEditDiscussion(dataDiscussion, form) {
    clearWarnings();
    if (form.editNameOfDiscussion !== dataDiscussion.name || form.editDescriptionOfDiscussion !== dataDiscussion.description) {
        document.getElementById("save-update-discussion").removeAttribute("disabled");
    }
    else {
        document.getElementById("save-update-discussion").setAttribute("disabled", true);
    }
}

async function handlerEditDiscussion(userId, discussionId) {
    let loadDiscussionResponse = await loadDataForDiscussion(discussionId);
    if (loadDiscussionResponse.ok) {
        let dataDiscussion = await loadDiscussionResponse.json();
        if (dataDiscussion.user.userId === userId) {
            document.getElementById("buttons-for-topic-discussion-header").innerHTML += '<button type="button" class="btn-edit">\n' +
                '                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aliceblue" class="bi bi-pencil-fill" viewBox="0 0 16 16">\n' +
                '                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>\n' +
                '                        </svg>\n' +
                '                    </button> ';

            document.getElementById("buttons-for-topic-discussion-header").innerHTML += '<button type="button" class="btn-delete">\n' +
                '                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aliceblue" class="bi bi-trash3" viewBox="0 0 16 16">\n' +
                '                           <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>\n' +
                '                       </svg>\n' +
                '                    </button> ';

            let buttonEditDiscussion = document.querySelector("#buttons-for-topic-discussion-header > .btn-edit");
            let buttonDeleteDiscussion = document.querySelector("#buttons-for-topic-discussion-header > .btn-delete");

            buttonEditDiscussion.setAttribute("data-bs-toggle", "modal");
            buttonEditDiscussion.setAttribute("data-bs-target", "#ModalForEditingDiscussion");

            buttonDeleteDiscussion.setAttribute("data-bs-toggle", "modal");
            buttonDeleteDiscussion.setAttribute("data-bs-target", "#ModalForDeletingDiscussion");

            addModalForUpdatingDiscussion();
            addModalForDeletingDiscussion();

            document.getElementById("delete-discussion").addEventListener("click", async (event) =>
                await handlerDeleteDiscussion(event, dataDiscussion.discussionId));

            let formEditDiscussion = document.forms["edit-discussion"];
            formEditDiscussion["editNameOfDiscussion"].value = dataDiscussion.name;
            formEditDiscussion["editDescriptionOfDiscussion"].value = dataDiscussion.description;

            formEditDiscussion.addEventListener("input", () => enableEditDiscussion(dataDiscussion, formEditDiscussion));

            formEditDiscussion.addEventListener("submit", async (event) =>
                await handlerUpdateDiscussion(event, dataDiscussion.discussionId)
            );
        }
    }
}