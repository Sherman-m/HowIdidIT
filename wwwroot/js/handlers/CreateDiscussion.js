﻿async function createDisc(form, userId) {
   return await fetch("../api/Discussion/AddDiscussion", {
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

async function getDisc(discId) {
    return await fetch("../api/GetDiscussionById?id=" + discId);
}

async function creatingDisc(event, userId) {
    event.preventDefault();

    let createDiscResponse = await createDisc(event.target, userId);
    if (createDiscResponse.ok) {
        let dataCreateDisc = await createDiscResponse.json();

        let getDiscResponse = await getDisc(dataCreateDisc.discussionId);
        if (getDiscResponse.ok) {
            let dataDisc = await getDiscResponse.json(); 
            console.log(dataDisc)

            window.sessionStorage.setItem("prevPageTitle", dataDisc.topic.name);
            window.sessionStorage.setItem("prevPageLink", "/topic?id=" + dataDisc.topicId);

            window.location.href = "/discussion?id=" + dataDisc.discussionId;
        }
    }
}


async function handlerCreateDisc(form, userId) {
    
    form.addEventListener("submit", (event) => creatingDisc(event, userId));
}
