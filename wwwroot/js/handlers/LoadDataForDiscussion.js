async function loadDataForDiscussion(discussionId) {
    return await fetch("../api/discussions/" + discussionId); 
}

async function loadMessagesForDiscussion(discussionId) {
    return await fetch("../api/discussions/" + discussionId + "/messages");
}

function addMessageForDiscussionContent(message, authUserId, authorDiscussion) {
    let discContent = document.getElementById("disc-content");
    
    let entireMessage = document.createElement("div");
    if (authUserId === message.userId) {
        entireMessage.className = "d-flex your-message justify-content-end";

        let messageUserAvatar = document.createElement("a");
        messageUserAvatar.href = "/profile";
        messageUserAvatar.innerHTML = '<img src="../pictures/avatar.png" width="50" height="50" alt="' + message.user.login + '">';
        messageUserAvatar.title = message.user.login;
        
        let messageBlock = document.createElement("div")
        messageBlock.className = "message-block";
        
        let authorMessage = document.createElement("p");
        authorMessage.className = "author-message";
        authorMessage.innerText = message.user.login + "\n";
        
        let messageText = document.createElement("p");
        messageText.className = "message-text"
        messageText.innerText = message.text;
        
        if (authUserId === authorDiscussion) {
            authorMessage.innerText += " (Автор)";
        }
        
        messageBlock.append(authorMessage, messageText);
        entireMessage.append(messageBlock, messageUserAvatar);
        discContent.appendChild(entireMessage);
    } else {
        entireMessage.className = "d-flex another-user-message";

        let messageUserAvatar = document.createElement("a");
        messageUserAvatar.href = "/users/" + message.userId;
        messageUserAvatar.innerHTML = '<img src="../pictures/avatar.png" width="50" height="50" alt="' + message.user.login + '">';
        messageUserAvatar.title = message.user.login;

        let messageBlock = document.createElement("div")
        messageBlock.className = "message-block";

        let authorMessage = document.createElement("p");
        authorMessage.className = "author-message";
        authorMessage.innerText = message.user.login + "\n";

        let messageText = document.createElement("p");
        messageText.className = "message-text"
        messageText.innerText = message.text;
        
        if (message.userId === authorDiscussion) {
            authorMessage.innerText += " (Автор)";
        }

        messageBlock.append(authorMessage, messageText);
        entireMessage.append(messageUserAvatar, messageBlock);
        discContent.appendChild(entireMessage);
    }
    
    discContent.scrollTop = discContent.scrollHeight;
}


async function handlerLoadDataForDiscussion(authUserId) {
    let discussionId = window.location.pathname.split('/').at(2);

    let loadForDiscussionResponse = await loadDataForDiscussion(discussionId);
    if (loadForDiscussionResponse.ok) {
        let dataDiscussion = await loadForDiscussionResponse.json();

        window.sessionStorage.setItem("discussionName", dataDiscussion.name);
        window.sessionStorage.setItem("discussionLink", "../discussions/" + dataDiscussion.discussionId);
        
        document.title = dataDiscussion.name;
        document.querySelector("#header-of-discussion > h2").innerText = dataDiscussion.name;
        document.querySelector("#disc-block > p").innerText = dataDiscussion.description;

        let loadMessagesResponse = await loadMessagesForDiscussion(dataDiscussion.discussionId);

        if (loadMessagesResponse.ok) {
            let dataMessages = await loadMessagesResponse.json();

            for (let message of dataMessages.sort(byField("dateOfPublication"))) {
                addMessageForDiscussionContent(message, authUserId, dataDiscussion.userId);
            }
        }
    }
}