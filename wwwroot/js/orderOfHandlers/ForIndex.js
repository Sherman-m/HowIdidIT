async function main() {
    window.sessionStorage.clear();
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
}

window.addEventListener("load", main);