async function addNewTopic(userId, form) {
    return await fetch("../api/topics", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({
            name: form.nameOfNewTopic.value,
            description: form.descriptionOfNewTopic.value,
            userId: userId
        })
    });
}

function addModalForCreatingTopic() {
    let modal = document.createElement("div");
    modal.className = "modal fade";
    modal.id = "ModalForCreatingTopic";
    modal.innerHTML = '<div class="modal-dialog modal-dialog-centered">\n' +
        '        <div class="modal-content">\n' +
        '            <div class="modal-header">\n' +
        '                <h5 class="modal-title" id="ModalForCreatingTopicTitle">Создание раздела</h5>\n' +
        '                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '            </div>\n' +
        '            <div class="modal-body">\n' +
        '                <form id="create-topic" class="d-flex flex-column">\n' +
        '                    <div class="name-of-new-topic">\n' +
        '                        <label for="nameOfNewTopic">Напишите название:</label>\n' +
        '                        <input type="text" id="nameOfNewTopic" class="form-control">\n' +
        '                    </div>\n' +
        '                    <div class="description-for-new-topic">\n' +
        '                        <label for="descriptionOfNewTopic">Добавьте описание:</label>\n' +
        '                        <textarea class="form-control" id="descriptionOfNewTopic"></textarea>\n' +
        '                    </div>\n' +
        '                </form>\n' +
        '            </div>\n' +
        '            <div class="modal-footer">\n' +
        '                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Закрыть</button>\n' +
        '                <button type="submit" class="btn btn-dark" form="create-topic">Создать</button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>';

    document.body.append(modal);
    new bootstrap.Modal(modal);
}

async function handlerCreateTopic(userId, btnAddNewTopic) {
    btnAddNewTopic.removeEventListener("click", redirectOnLoginPage);

    btnAddNewTopic.setAttribute("data-bs-toggle", "modal");
    btnAddNewTopic.setAttribute("data-bs-target", "#ModalForCreatingTopic");
    
    addModalForCreatingTopic();
    
    let formAddTopic = document.forms["create-topic"];
    formAddTopic.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        let addNewTopicResponse = await addNewTopic(userId, event.target);
        if (addNewTopicResponse.ok) {
            let newTopic = await addNewTopicResponse.json();
            window.location.href = "/topics/" + newTopic.topicId;
        }
    });
    
}