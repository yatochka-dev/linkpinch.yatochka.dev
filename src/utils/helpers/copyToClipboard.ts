export default function copyToClipboard(_: string) {
    const navigator = window.navigator

    return navigator.clipboard.writeText(_)
}
