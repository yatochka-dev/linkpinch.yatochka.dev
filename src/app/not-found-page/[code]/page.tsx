export default function ErrorRedirection({
    params,
}: {
    params: {
        code: string
    }
}) {
    return <h1>{params.code}</h1>
}
