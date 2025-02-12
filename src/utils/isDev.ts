export const isDev = () => {
    const url = new URL(window.location.href);
    return url.searchParams.get('debug') === 'dev';
}