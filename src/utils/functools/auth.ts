import {type Session} from "next-auth";
import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";

export default async function auth(): Promise<Session> {

    const session = await getServerAuthSession()

    if (!session) {
        redirect("/login")
    }

    return session

}