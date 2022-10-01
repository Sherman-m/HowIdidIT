async function createDisc(form) {
    await fetch("api/Discussion", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: form.nameOfNewDisc.value,
            question: form.questionOfNewDisc.value,
            topicId: // закончил тут
        })
    });
}


async function creatingDisc(event) {
    event.preventDefault();
    
    let creatingDisc = await createDisc(event.target);
}
function handlerCreateDisc() {
    let formCreateDisc = document.getElementById("create-disc");
    formCreateDisc.addEventListener("submit", creatingDisc);    
}