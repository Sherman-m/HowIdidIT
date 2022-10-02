async function main() {
    window.sessionStorage.clear();
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    await handlerLoadTopics();
    await handlerLoadAllDiscussions();
} 

window.addEventListener("load", main);