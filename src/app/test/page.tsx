import { db } from '@/server/db'
// import { type ClickEvent } from '@/utils/types/cron'
// import { type ShortenedURL } from '@prisma/client'
// import _ from 'lodash'
// import {
//     type BrowserType,
//     type DeviceGroupType,
//     type OSType,
// } from '@/utils/functools/get-device-from-headers'

// function getRandomMeta(url: ShortenedURL): ClickEvent {
//     return {
//         timestamp: new Date().toISOString(),
//         id: url.id,
//         device: {
//             browser: _.sample([
//                 'no-data',
//                 'chrome',
//                 'firefox',
//                 'safari',
//                 'edge',
//                 'opera',
//             ]) as BrowserType,
//             os: _.sample([
//                 'no-data',
//                 'windows',
//                 'macos',
//                 'linux',
//                 'android',
//                 'ios',
//             ]) as OSType,
//             type: _.sample([
//                 'no-data',
//                 'desktop',
//                 'mobile',
//                 'tablet',
//             ]) as DeviceGroupType,
//         },
//         ip: '::1',
//         geo: {
//             city: 'City',
//             country: 'Country',
//             flag: 'Flag',
//             region: 'Region',
//             countryRegion: 'CountryRegion',
//             latitude: 'Latitude',
//             longitude: 'Longitude',
//         },
//     }
// }

export default async function TestPage() {
    const url = await db.shortenedURL.findFirst({})

    // await db.click.createMany({
    //     data: Array.from({ length: 1000 })
    //         .fill(true)
    //         .map(() => {
    //             return {
    //                 urlId: url.id,
    //             }
    //         }),
    // })

    return <h1>TEST PAGE</h1>
}
