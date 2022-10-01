async function loadCurrentTopic(topicId) {
    return await fetch("../api/Topic/" + topicId);
}

async function loadTopics() {
    return await fetch("../api/Topic");
}

function getUrlSearchParams() {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

async function handlerLoadCurrentTopic() {

    let params = getUrlSearchParams();
    
    let loadCurrentTopicResponse = await loadCurrentTopic(params.id);
    if (loadCurrentTopicResponse.ok) {
        let dataCurrentTopic = await loadCurrentTopicResponse.json();
        document.getElementById("name-of-topic").innerText = dataCurrentTopic.name;
        document.getElementById("topic-description").innerText = dataCurrentTopic.description;
    }

    let loadTopicsResponse = await loadTopics();
    if (loadTopicsResponse.ok) {
        let dataTopic = await loadTopicsResponse.json();

        let topicSelectionList = document.getElementById("selectTopic");
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