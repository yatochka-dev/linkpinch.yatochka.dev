import type { Geo } from '@vercel/edge'
import type { DeviceType } from '@/utils/functools/get-device-from-headers'

export interface ClickEvent {
    id: string
    geo:
        | Geo
        | {
              city?: string
              country?: string
              flag?: string
              region?: string
              /** The region part of the ISO 3166-2 code of the client IP.*/
              countryRegion?: string
              latitude?: string
              longitude?: string
          }
    device: DeviceType
    timestamp: string
    ip: string
}
