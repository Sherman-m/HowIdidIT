async function loadAllDiscussions() {
    return await fetch("../api/discussions");
}


async function handlerLoadAllDiscussions(selectSort) {
    let allDiscussionsResponse = await loadAllDiscussions();
    if (allDiscussionsResponse.ok) {
        let dataAllDiscussions = await allDiscussionsResponse.json();
        
        let tableBody = document.querySelector("tbody");

        switch (selectSort.value) {
            case "1":
                dataAllDiscussions.sort(byField("dateOfCreating")).reverse();
                break;
            case "2":
                dataAllDiscussions.sort(byField("dateOfCreating"));
                break;
            case "3":
                dataAllDiscussions.sort(byField("countOfMessages")).reverse();
                break;
            case "4":
                dataAllDiscussions.sort(byField("countOfMessages"), false);
                break;
        }
        
        for (let discussion of dataAllDiscussions) {
            let row = document.createElement("tr");
            row.className = "d-flex";
            
            row.addEventListener("click", function (event) {
                event.preventDefault();
                window.location.href = "/discussions/" + discussion.discussionId;
            });
            
            row.innerHTML = '<th class="col-1" scope="row">' + discussion.discussionId + '</th>\n' +
                '                        <td class="col-3">' + discussion.name + '</td>\n' +
                '                        <td class="col-3">' + discussion.topic.name+ '</td>\n' +
                '                        <td class="col-3">' + discussion.user.login + '</td>\n' +
                '                        <td class="col-2">' + discussion.dateOfCreating.slice(0, 10) + '</td>';
            tableBody.appendChild(row);
        }
    }
}