import type { Geo } from '@vercel/edge'
import type { DeviceType } from '@/utils/functools/get-device-from-headers'

export interface ClickEvent {
    id: string
    geo: Geo | Object
    device: DeviceType
    timestamp: string
    ip: string
}
