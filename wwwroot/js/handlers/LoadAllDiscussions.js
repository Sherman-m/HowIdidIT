async function loadAllDiscussions() {
    return await fetch("../api/Discussion");
}


async function handlerLoadAllDiscussions() {
    let allDiscussionsResponse = await loadAllDiscussions();
    if (allDiscussionsResponse.ok) {
        let dataAllDiscussions = await allDiscussionsResponse.json();
        
        let tableBody = document.querySelector("tbody");
        
        for (let discussion of dataAllDiscussions) {
            let row = document.createElement("tr");
            row.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = "/discussion?id=" + discussion.discussionId;
            });
            row.innerHTML = '<th scope="row">' + discussion.discussionId + '</th>\n' +
                '                        <td>' + discussion.name + '</td>\n' +
                '                        <td>' + discussion.topic.name+ '</td>\n' +
                '                        <td>' + discussion.user.login + '</td>\n' +
                '                        <td>' + discussion.dateOfCreating + '</td>';
            tableBody.appendChild(row);
        }
    }
}