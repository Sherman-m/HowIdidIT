async function removeTopicFromFavorite(userId, topicId) {
    return await fetch("../api/users/" + userId + "/selected-topics/" + topicId, {
        method: "PUT"
    });
}

async function removeDiscussionFromFavorite(userId, discussionId) {
    return await fetch("../api/users/" + userId + "/selected-discussions/" + discussionId, {
        method: "PUT"
    });
}