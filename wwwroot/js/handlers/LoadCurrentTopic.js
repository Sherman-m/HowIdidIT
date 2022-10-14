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

        window.sessionStorage.setItem("topicName", dataCurrentTopic.name);
        window.sessionStorage.setItem("topicLink", "../topics/" + dataCurrentTopic.topicId);
        
        document.getElementById("name-of-topic").innerText = dataCurrentTopic.name;
        document.getElementById("topic-description").innerText = dataCurrentTopic.description;
        document.querySelector("title").innerText = dataCurrentTopic.name;
    }
}