function handlerNavigation() {
    let prevPageTitle = window.sessionStorage.getItem("prevPageTitle");
    let prevPageLink = window.sessionStorage.getItem("prevPageLink");
    let curPage = document.createElement("a");
    curPage.href = document.URL;
    curPage.innerText = document.title;
    
    if (prevPageTitle && prevPageTitle!== curPage.text) {
        let prevPage = document.createElement("a");
        prevPage.href = prevPageLink;
        prevPage.innerText = prevPageTitle;
        document.getElementById("navigation").append(prevPage, " >> ");
    }
    document.getElementById("navigation").append(curPage);
}