export const isServerCalculations = () => {
    const url = new URL(window.location.href);
    return url.searchParams.has('server');
}