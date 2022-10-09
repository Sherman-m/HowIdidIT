async function updateMessage(messageId, form) {
    return await fetch("../api/messages/" + messageId + "/edit", {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            text: form.messageContent.value
        })
    });
}

async function deleteMessage(messageId) {
    return await fetch("../api/messages/" + messageId, {
        method: "DELETE"
    });
}

async function handlerUpdateMessage(event, dataMessage, messageBlock) {
    event.preventDefault();
    
    let updateMessageResponse = await updateMessage(dataMessage.messageId, event.target);
    if (updateMessageResponse.ok) {
        let updateMessageData = await updateMessageResponse.json();
        messageBlock.children[1].innerText = updateMessageData.text; 
        return updateMessageData;
    }
}

async function handlerDeleteMessage(event, messageId, entireMessage) {
    event.preventDefault();
    
    let deleteMessageResponse = await deleteMessage(messageId);
    if (deleteMessageResponse.ok) {
        entireMessage.remove();
    }
}

async function handlerEditMessage(userId, messageId, entireMessage) {
    let getMessageResponse = await getMessageById(messageId);
    if (getMessageResponse.ok) {
        let dataMessage = await getMessageResponse.json();
        
        let divForEditMessage = document.createElement("div");
        divForEditMessage.id = "buttons-for-edit-message";
        divForEditMessage.className = "d-flex shadow-none";
        divForEditMessage.innerHTML = '<button type="button" class="btn">\n' +
            '                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-pencil-square" viewBox="0 0 16 16">\n' +
            '                                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\n' +
            '                                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>\n' +
            '                                </svg>\n' +
            '                            </button>\n' +
            '                            <button type="button" class="btn">\n' +
            '                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-trash" viewBox="0 0 16 16">\n' +
            '                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\n' +
            '                                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\n' +
            '                                </svg>\n' +
            '                            </button>';
        entireMessage.children[0].appendChild(divForEditMessage);
        
        let editMessageButton = divForEditMessage.firstChild;
        let deleteMessageButton = divForEditMessage.lastChild;
        
        editMessageButton.addEventListener("click", async function (event) {
            event.preventDefault();

            let formSendMessage = document.getElementById("send-message");
            let formEditMessage = formSendMessage.cloneNode(true);

            document.getElementById("disc-block").replaceChild(formEditMessage, formSendMessage);
            
            formEditMessage.messageContent.value = dataMessage.text;
            
            OnInputForElement(formEditMessage.messageContent);
            customTextarea();
            
            formEditMessage.addEventListener("submit", async function (event) {
                dataMessage = await handlerUpdateMessage(event, dataMessage, entireMessage.children[0]);
                document.getElementById("disc-block").replaceChild(formSendMessage, formEditMessage);
                formSendMessage.messageContent.value = "";
            });
        });
        
        deleteMessageButton.addEventListener("click", async function(event) {
            await handlerDeleteMessage(event, dataMessage.messageId, entireMessage)
            let formEditMessage = document.getElementById("send-message");
            formEditMessage.messageContent.value = "";

            let formSendMessage = formEditMessage.cloneNode(true);
            document.getElementById("disc-block").replaceChild(formSendMessage, formEditMessage);
            formSendMessage.addEventListener("submit", async (event) =>
                await handlerAddMessage(event, userId, formSendMessage)
            );
        });
    }
}