async function updateSelectDiscussions(authUserId, discussionId) {
    return await fetch("../api/users/" + authUserId + "/selected-discussions/" + discussionId, {
        method: "PUT"
    });
}

function handlerAddDiscussionToFavorites(checkbox, authUserId, discussionId, selectedDiscussions, favoritesBlock) {
    if (selectedDiscussions.some(d => d.discussionId === discussionId)) {
        checkbox.checked = true;
        document.querySelector("label[for='isFavorite']").className = "btn shadow-none checkbox-checked";
    }

    checkbox.addEventListener("click", async function(event) {
        addToFavorites(event.target);
        let updateSelectedDiscussionsResponse = await updateSelectDiscussions(authUserId, discussionId);
        if (updateSelectedDiscussionsResponse.ok) {
            let updateSelectedDiscussions = await updateSelectedDiscussionsResponse.json();
            setSelectedDiscussionsInFavorites(updateSelectedDiscussions.selectedDiscussions);
            editingSelectedDiscussions(authUserId, updateSelectedDiscussions.selectedDiscussions, favoritesBlock);
        }
    });
}
