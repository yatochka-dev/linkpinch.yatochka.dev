import { z } from 'zod'

const NotSpecifiedOrNotFound = 'no-data'
const DeviceGroup = z.enum([
    'mobile',
    'tablet',
    'desktop',
    NotSpecifiedOrNotFound,
])

const OS = z.enum([
    'ios',
    'android',
    'windows',
    'macos',
    'linux',
    NotSpecifiedOrNotFound,
])

const Browser = z.enum([
    'chrome',
    'firefox',
    'safari',
    'edge',
    'opera',
    NotSpecifiedOrNotFound,
])

const DeviceSchema = z.object({
    type: DeviceGroup,
    os: OS,
    browser: Browser,
})

type DeviceGroupType = z.infer<typeof DeviceGroup>
type OSType = z.infer<typeof OS>
type BrowserType = z.infer<typeof Browser>
type DeviceType = z.infer<typeof DeviceSchema>
type NotSpecifiedOrNotFoundType = typeof NotSpecifiedOrNotFound

function getOS(userAgent: string): OSType {
    const ua = userAgent.toLowerCase()
    if (ua.includes('android')) {
        return 'android'
    }
    if (ua.includes('iphone') || ua.includes('ipad')) {
        return 'ios'
    }
    if (ua.includes('windows')) {
        return 'windows'
    }
    if (ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad')) {
        return 'macos'
    }
    if (ua.includes('linux')) {
        return 'linux'
    }
    return 'no-data'
}

function getBrowser(userAgent: string): BrowserType {
    const ua = userAgent.toLowerCase()
    if (ua.includes('chrome') && !ua.includes('chromium')) {
        return 'chrome'
    }
    if (ua.includes('firefox')) {
        return 'firefox'
    }
    if (ua.includes('safari') && !ua.includes('chrome')) {
        return 'safari'
    }
    if (ua.includes('edge')) {
        return 'edge'
    }
    if (ua.includes('opera') || ua.includes('opr')) {
        return 'opera'
    }
    return 'no-data'
}

function getDeviceType(userAgent: string): DeviceGroupType {
    const ua = userAgent.toLowerCase()
    if (ua.includes('mobi')) {
        return 'mobile'
    }
    if (ua.includes('tablet')) {
        return 'tablet'
    }
    if (ua.includes('win') || ua.includes('mac') || ua.includes('linux')) {
        return 'desktop'
    }
    return 'no-data'
}

function getDeviceFromHeaders(headers: Headers): DeviceType {
    const userAgent = headers.get('user-agent') ?? ''
    const os = getOS(userAgent)
    const browser = getBrowser(userAgent)
    const type = getDeviceType(userAgent)
    const device: DeviceType = {
        type,
        os,
        browser,
    }
    DeviceSchema.parse(device) // Validate the device against the schema
    return device
}

export default getDeviceFromHeaders
export {
    type DeviceGroupType,
    type BrowserType,
    type OSType,
    type DeviceType,
    type NotSpecifiedOrNotFoundType,
    DeviceGroup,
    OS,
    Browser,
    NotSpecifiedOrNotFound,
}
