async function loadCurrentTopic() {
    let params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    return await fetch("../api/Topic/" + params.id);
}

async function handlerLoadCurrentTopic() {
    let loadCurrentTopicResponse = await loadCurrentTopic();
    if (loadCurrentTopicResponse.ok) {
        let dataCurrentTopic = await loadCurrentTopicResponse.json();
        document.getElementById("name-of-topic").innerText = dataCurrentTopic.name;
        document.getElementById("topic-description").innerText = dataCurrentTopic.description;
    }
}