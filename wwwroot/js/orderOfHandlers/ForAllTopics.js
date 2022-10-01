async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    await handlerLoadTopics();
} 

window.addEventListener("load", main);