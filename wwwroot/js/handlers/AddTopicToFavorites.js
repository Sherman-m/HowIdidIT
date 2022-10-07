async function updateSelectTopic(authUserId, topicId) {
    return await fetch("../api/users/" + authUserId + "/selected-topics/" + topicId, {
        method: "PUT"
    });
}

function setUnchecked(event) {
    event.currentTarget.className = "btn shadow-none checkbox-unchecked";
}

function handlerAddTopicToFavorites(checkbox, authUserId, topicId, selectedTopics) {
    if (selectedTopics.some(t => t.topicId === topicId)) {
        checkbox.checked = true;
        document.querySelector("label[for='isFavorite']").className = "btn shadow-none checkbox-checked";
    }
    
    checkbox.addEventListener("click", async function(event) {
        addToFavorites(event);
        let updateSelectTopicResponse = await updateSelectTopic(authUserId, topicId);
        if (updateSelectTopicResponse.ok) {
            let updateSelectTopic = await updateSelectTopicResponse.json();
            setSelectedTopicsInFavorites(updateSelectTopic.selectedTopics);
        }
    });
}
