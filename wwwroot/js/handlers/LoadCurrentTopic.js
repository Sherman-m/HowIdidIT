async function loadCurrentTopic(topicId) {
    return await fetch("../api/Topic/GetTopicById?id=" + topicId);
}

async function loadTopics() {
    return await fetch("../api/Topic/GetAllTopics");
}

async function handlerLoadCurrentTopic() {

    let params = getUrlSearchParams();
    
    let loadCurrentTopicResponse = await loadCurrentTopic(params.id);
    if (loadCurrentTopicResponse.ok) {
        let dataCurrentTopic = await loadCurrentTopicResponse.json();
        document.getElementById("name-of-topic").innerText = dataCurrentTopic.name;
        document.getElementById("topic-description").innerText = dataCurrentTopic.description;
        
        document.querySelector("title").innerText = dataCurrentTopic.name;
    }

    let loadTopicsResponse = await loadTopics();
    if (loadTopicsResponse.ok) {
        let dataTopic = await loadTopicsResponse.json();

        let topicSelectionList = document.getElementById("selectTopic");
        if (topicSelectionList) {
            for (let topic of dataTopic) {
                let opt = document.createElement("option");
                opt.setAttribute("value", topic.topicId);
                opt.innerText = topic.name;

                if (Number(params.id) === topic.topicId) {
                    opt.selected = true;
                }
                topicSelectionList.appendChild(opt);
            }
        }
    }
}