import * as cheerio from 'cheerio'

export default async function getPageTitle(
    url: string,
): Promise<string | undefined> {
    try {
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

        const $ = cheerio.load(text)

        const titleElement = $('title').text()

        if (!titleElement) {
            return undefined
        }

        return titleElement.trim() || undefined
    } catch (e) {
        console.error('Error getting page title', e)
        return undefined
    }
}
