export default async function ErrorRedirection({
    params,
}: {
    params: Promise<{
        code: string
    }>
}) {
    return <h1>{(await params).code}</h1>
}
