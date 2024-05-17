import React from 'react'
import getShortenedLinkByID from '@/utils/functools/getShortenedLinkByID'
import ClientModal from '@/app/dashboard/@modal/(..)dashboard/[id]/Client'
import { type ShortenedLinkWithClickCount } from '@/utils/types/dbHelper'

export default async function EditModal({
    params,
}: {
    params: {
        id: string
    }
}) {
    const data = (await getShortenedLinkByID(
        params.id,
        true,
    )) as ShortenedLinkWithClickCount

    if (!data) {
        throw new Error('Shortened URL not found')
    }

    return (
        <>
            <ClientModal data={data} />
        </>
    )
}
