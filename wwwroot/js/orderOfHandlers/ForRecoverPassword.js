async function main() {
    handlerDefaultEventsForButtons();
    await handlerRecoverPassword();
}

window.addEventListener("load", main);