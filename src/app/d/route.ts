import { geolocation } from '@vercel/edge'

async function GET(req: Request) {
    const location = geolocation(req)

    console.log(JSON.stringify(req.headers.get('x-forwarded-for')))
    return new Response(JSON.stringify(req.headers.get('x-forwarded-for')))
}

export { GET }
