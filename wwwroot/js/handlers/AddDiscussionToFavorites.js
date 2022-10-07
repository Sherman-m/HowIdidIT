async function updateSelectDiscussions(authUserId, discussionId) {
    return await fetch("../api/users/" + authUserId + "/selected-discussions/" + discussionId, {
        method: "PUT"
    });
}

function setUnchecked(event) {
    event.currentTarget.className = "btn shadow-none checkbox-unchecked";
}

function handlerAddDiscussionToFavorites(checkbox, authUserId, discussionId, selectedDiscussions) {
    if (selectedDiscussions.some(d => d.discussionId === discussionId)) {
        checkbox.checked = true;
        document.querySelector("label[for='isFavorite']").className = "btn shadow-none checkbox-checked";
    }

    checkbox.addEventListener("click", async function(event) {
        addToFavorites(event);
        let updateSelectDiscussionResponse = await updateSelectDiscussions(authUserId, discussionId);
        if (updateSelectDiscussionResponse.ok) {
            let updateSelectDiscussion = await updateSelectDiscussionResponse.json();
            setSelectedDiscussionsInFavorites(updateSelectDiscussion.selectedDiscussions);
        }
    });
}
