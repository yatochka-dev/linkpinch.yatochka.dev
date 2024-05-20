async function GET(req: Request) {
    console.log(JSON.stringify(req.headers.get('x-forwarded-for')))
    return new Response(JSON.stringify(req.headers.get('x-forwarded-for')))
}

export { GET }
