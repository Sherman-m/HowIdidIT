async function loadTopics() {
    return await fetch("../api/Topic");
}

async function handlerLoadTopicsForSelection() {
    let loadTopicsResponse = await loadTopics();
    if (loadTopicsResponse.ok) {
        let dataTopic = await loadTopicsResponse.json();

        let topicSelectionList = document.getElementById("selectTopic");
        for (let topic of dataTopic) {
            let opt = document.createElement("option");
            opt.setAttribute("value", topic.topicId);
            opt.innerText = topic.name;
            topicSelectionList.appendChild(opt);
        }
    }
}
