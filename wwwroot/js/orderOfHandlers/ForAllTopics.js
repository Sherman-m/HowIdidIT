async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    await handlerLoadTopics(); 
    await handlerLoadTopicsForSelection();
} 

window.addEventListener("load", main);