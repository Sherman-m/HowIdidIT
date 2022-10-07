﻿async function addMessage(userId, discussionId, text) {
    return await fetch("../api/messages", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            text: text,
            userId: userId,
            discussionId: discussionId
        })
    });
}

async function getMessageById(messageId) {
    return await fetch("../api/messages/" + messageId);
}

async function handlerAddMessage(userId, formSendMessage) {
    formSendMessage.removeEventListener("submit", redirectOnLoginPage);
    formSendMessage.addEventListener("submit", async function (event) {
        event.preventDefault();

        let discussionId = window.location.pathname.split('/').at(2);

        let messageText = formSendMessage.messageContent.value;
        formSendMessage.messageContent.value = "";
        let addMessageResponse = await addMessage(userId, discussionId, messageText);
        if (addMessageResponse.ok) {
            let dataAddMessageResponse = await addMessageResponse.json();
            let getMessageResponse = await getMessageById(dataAddMessageResponse.messageId);
            if (getMessageResponse.ok) {
                let message = await getMessageResponse.json()
                await addMessageForDiscussionContent(message, userId, message.discussion.userId);
            }
        }
    });
}