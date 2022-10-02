function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

function getUrlSearchParams() {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}