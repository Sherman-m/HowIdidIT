async function loadTopics() {
    return await fetch("../api/topics");
}

async function handlerLoadTopics() {
    let loadTopicsResponse = await loadTopics(); 
    if (loadTopicsResponse.ok) {
        let dataTopics = await loadTopicsResponse.json();

        let listOfTopics = document.getElementById("list-of-topics");
        for (let topic of dataTopics.sort(byField("name"))) {
            let topicLink = document.createElement("a");
            topicLink.href = "../topics/" + topic.topicId;
            topicLink.className = "link-on-topics";
            topicLink.innerText = topic.name;

            listOfTopics.appendChild(topicLink);
        }
        
        let buttonAddTopic = document.createElement("button");
        buttonAddTopic.id = "btn-add-new-topic";
        buttonAddTopic.type = "button";
        buttonAddTopic.className = "btn-add";
        buttonAddTopic.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="aliceblue" class="bi bi-plus-lg" viewBox="0 0 16 16">\n' +
            '  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>\n' +
            '</svg>'
        listOfTopics.appendChild(buttonAddTopic);
    }
}