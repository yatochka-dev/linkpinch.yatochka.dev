import React from 'react'
import getShortenedUrl from '@/utils/functools/get-shortened-url'
import ClientModal from '@/components/dashboard/client-modal'
import { type ShortenedLinkWithClickCount } from '@/utils/types/db'
import { PageDialog } from '@/components/ui/page-dialog'

export default async function EditModal({
    params,
}: {
    params: {
        id: string
    }
}) {
    // simulate loading
    // await new Promise((resolve) => setTimeout(resolve, 5000))

    const data = (await getShortenedUrl(
        params.id,
        true,
    )) as ShortenedLinkWithClickCount

    if (!data) {
        return (
            <PageDialog>
                <h1>Not found</h1>
            </PageDialog>
        )
    }

    return (
        <>
            <ClientModal data={data} />
        </>
    )
}
