async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    await handlerLoadCurrentTopic();

    let selectSort = document.getElementById("selectSort");
    selectSort.addEventListener("change", async function(event) {
        event.preventDefault();

        let discList = document.querySelectorAll("tbody > tr");
        for (let disc of discList) {
            disc.remove();
        }

        await handlerLoadDiscussionsForCurrentTopic(selectSort);
    });
    
    await handlerLoadDiscussionsForCurrentTopic(selectSort);
    handlerNavigation();
    customTextarea();
}

window.addEventListener("load", main);