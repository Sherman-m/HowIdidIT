async function loadCurrentTopic(topicId) {
    return await fetch("../api/topics/" + topicId);
}

async function loadTopics() {
    return await fetch("../api/topics");
}

async function handlerLoadCurrentTopic() {

    let topicId = window.location.pathname.split('/').at(2);
    
    let loadCurrentTopicResponse = await loadCurrentTopic(topicId);
    if (loadCurrentTopicResponse.ok) {
        let dataCurrentTopic = await loadCurrentTopicResponse.json();

        window.sessionStorage.setItem("prevPageTitle", dataCurrentTopic.name);
        window.sessionStorage.setItem("prevPageLink", "../topics/" + dataCurrentTopic.topicId);
        
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

                if (Number(topicId) === topic.topicId) {
                    opt.selected = true;
                }
                topicSelectionList.appendChild(opt);
            }
        }
    }
}