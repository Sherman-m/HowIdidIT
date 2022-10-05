async function loadDataForDiscussion(discussionId) {
    return await fetch("../api/discussions/" + discussionId); 
}

async function loadMessagesForDiscussion(discussionId) {
    return await fetch("../api/discussions/" + discussionId + "/messages");
}

function addMessageForDiscussionContent(message, userId, authorDiscussion) {
    let discContent = document.getElementById("disc-content");
    
    let messageBlock = document.createElement("div");
    if (userId === message.userId) {
        messageBlock.className = "d-flex your-message justify-content-end";

        let messageUserAvatar = document.createElement("a");
        messageUserAvatar.href = "/profile";
        messageUserAvatar.innerHTML = '<img src="../pictures/avatar.png" width="50" height="50" alt="' + message.user.login + '">';

        let answerText = document.createElement("div")
        answerText.className = "message-block";
        answerText.innerText = message.text;
        if (userId === authorDiscussion) {
            answerText.style.borderColor = "red";
        }

        messageBlock.append(answerText, messageUserAvatar);
        discContent.appendChild(messageBlock);
    } else {
        messageBlock.className = "d-flex another-user-message";

        let messageUserAvatar = document.createElement("a");
        messageUserAvatar.href = "/users/" + message.userId;
        messageUserAvatar.innerHTML = '<img src="../pictures/avatar.png" width="50" height="50" alt="' + message.user.login + '">';

        let answerText = document.createElement("div")
        answerText.className = "message-block";
        answerText.innerText = message.text;
        if (message.userId === authorDiscussion) {
            answerText.style.borderColor = "red";
        }

        messageBlock.append(messageUserAvatar, answerText);
        discContent.appendChild(messageBlock);
    }
    
    discContent.scrollTop = discContent.scrollHeight;
}


async function handlerLoadDataForDiscussion(userId) {
    let discussionId = window.location.pathname.split('/').at(2);

    let loadForDiscussionResponse = await loadDataForDiscussion(discussionId);
    if (loadForDiscussionResponse.ok) {
        let dataDiscussion = await loadForDiscussionResponse.json();

        window.sessionStorage.setItem("prevPageTitle", dataDiscussion.topic.name);
        window.sessionStorage.setItem("prevPageLink", "../topics/" + dataDiscussion.topicId);

        document.querySelector("#header-of-disc > h2").innerText = dataDiscussion.name;

        let loadMessagesResponse = await loadMessagesForDiscussion(dataDiscussion.discussionId);

        if (loadMessagesResponse.ok) {
            let dataMessages = await loadMessagesResponse.json();

            for (let message of dataMessages.sort(byField("dateOfPublication"))) {
                addMessageForDiscussionContent(message, userId, dataDiscussion.discussionId);
            }
        }
    }
}