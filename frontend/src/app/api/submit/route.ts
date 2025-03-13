import { NextRequest } from "next/server";

export async function GET(request : NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    return new Response('Hello, Next.js!', {
        status : 200
    });
}