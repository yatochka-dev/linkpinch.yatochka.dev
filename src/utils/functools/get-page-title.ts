export default async function getPageTitle(
    url: string,
): Promise<string | undefined> {
    const u = new URL(url)

    const response = await fetch(u, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.3',
        },
    })

    if (!response.ok) {
        return undefined
    }

    const text = await response.text()

    if (!text) {
        return undefined
    }

    const title = text.match(/<title>([^<]+)<\/title>/i)

    if (!title) {
        return undefined
    }

    return title[1] ?? title[0] ?? undefined // The first match is the full title, the second match is the title without the tags
}
