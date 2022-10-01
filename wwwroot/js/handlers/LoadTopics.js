async function loadTopics() {
    return await fetch("../api/Topic");
}

async function handlerLoadTopics() {
    let loadTopicsResponse = await loadTopics(); 
    if (loadTopicsResponse.ok) {
        let dataTopics = await loadTopicsResponse.json();
        
        let listOfTopics = document.getElementById("list-of-topics");
        for (let topic of dataTopics) {
            let topicLink = document.createElement("a");
            topicLink.href = "/topic/?id=" + topic.topicId;
            topicLink.className = "link-on-topics";
            topicLink.innerText = topic.name;

            listOfTopics.appendChild(topicLink);
        }
    }
}