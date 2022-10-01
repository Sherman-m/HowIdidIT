async function createDisc(form, userId) {
    console.log(userId);
   return await fetch("api/Discussion", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: form.nameOfNewDisc.value,
            question: form.questionOfNewDisc.value,
            topicId: form.selectTopic.value,
            userId: userId
        })
    });
}

async function creatingDisc(event, userId) {
    event.preventDefault();

    let createDiscResponse = await createDisc(event.target, userId);
    if (createDiscResponse.ok) {
        let dataDisc = await createDiscResponse.json();
        window.location.href = "/discussion?id=" + dataDisc.discussionId;
    }
}


async function handlerCreateDisc(form, userId) {
    
    form.addEventListener("submit", (event) => creatingDisc(event, userId));
}
