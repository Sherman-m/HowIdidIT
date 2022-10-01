async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    await handlerLoadTopics();
    await handlerLoadAllDiscussions();
} 

window.addEventListener("load", main);