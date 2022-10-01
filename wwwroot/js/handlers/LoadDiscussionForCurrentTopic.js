async function loadDiscussionsForCurrentTopic(topicId) {
    return await fetch("../api/Discussion/for_topic/" + topicId);
}


async function handlerLoadDiscussionsForCurrentTopic() {
    let params = getUrlSearchParams();
    
    let discussionsForTopicResponse = await loadDiscussionsForCurrentTopic(params.id);
    if (discussionsForTopicResponse.ok) {
        let dataAllDiscussions = await discussionsForTopicResponse.json();
        console.log(dataAllDiscussions)
        let tableBody = document.querySelector("tbody");

        for (let discussion of dataAllDiscussions.sort(byField("dateOfCreating"))) {
            let row = document.createElement("tr");
            row.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = "/discussion?id=" + discussion.discussionId;
            });
            row.innerHTML = '<th scope="row">' + discussion.discussionId + '</th>\n' +
                '                        <td>' + discussion.name + '</td>\n' +
                '                        <td>' + discussion.topic.name+ '</td>\n' +
                '                        <td>' + discussion.user.login + '</td>\n' +
                '                        <td>' + Date(discussion.dateOfCreating) + '</td>';
            tableBody.appendChild(row);
        }
    }
}