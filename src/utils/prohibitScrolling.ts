export function prohibitScrolling() {
    const url = new URL(window.location.href);
    return url.searchParams.has('noscroll');
}