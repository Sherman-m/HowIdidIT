async function updateSelectTopic(authUserId, topicId) {
    return await fetch("../api/users/" + authUserId + "/selected-topics/" + topicId, {
        method: "PUT"
    });
}

function handlerAddTopicToFavorites(checkbox, authUserId, topicId, selectedTopics, favoritesBlock) {
    if (selectedTopics.some(t => t.topicId === topicId)) {
        checkbox.checked = true;
        document.querySelector("label[for='isFavorite']").className = "btn shadow-none checkbox-checked";
    }
    
    checkbox.addEventListener("click", async function(event) {
        addToFavorites(event.target);
        let updateSelectTopicsResponse = await updateSelectTopic(authUserId, topicId);
        if (updateSelectTopicsResponse.ok) {
            let updateSelectedTopics = await updateSelectTopicsResponse.json();
            setSelectedTopicsInFavorites(updateSelectedTopics.selectedTopics);
            editingSelectedTopics(authUserId, updateSelectedTopics.selectedTopics, favoritesBlock);
        }
    });
}
