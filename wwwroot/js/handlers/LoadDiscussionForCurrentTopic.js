async function loadDiscussionsForCurrentTopic(topicId) {
    return await fetch("../api/topics/" + topicId + "/discussions");
}


async function handlerLoadDiscussionsForCurrentTopic() {
    let topicId = window.location.pathname.split('/').at(2);
    
    let discussionsForTopicResponse = await loadDiscussionsForCurrentTopic(topicId);
    if (discussionsForTopicResponse.ok) {
        let dataAllDiscussions = await discussionsForTopicResponse.json();

        let tableBody = document.querySelector("tbody");

        for (let discussion of dataAllDiscussions.sort(byField("dateOfCreating"))) {
            let row = document.createElement("tr");
            row.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = "/discussions/" + discussion.discussionId;
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