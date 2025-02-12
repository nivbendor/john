export function isDistributor(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get('a') === name;
}